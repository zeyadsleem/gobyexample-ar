---
title: "القوالب النصية (Text Templates)"
description: "إنشاء محتوى ديناميكي باستخدام حزمة text/template في لغة Go"
order: 53
---

تقدم Go دعماً مدمجاً لإنشاء محتوى ديناميكي أو عرض مخرجات مخصصة للمستخدم باستخدام حزمة `text/template`. توفر حزمة شقيقة تسمى `html/template` نفس الواجهة البرمجية ولكنها تحتوي على ميزات أمان إضافية ويجب استخدامها لإنشاء HTML.

```go
package main

import (
    "os"
    "text/template"
)

func main() {
```

يمكننا إنشاء قالب جديد وتحليل متنه من نص. القوالب هي مزيج من نصوص ثابتة و "إجراءات" (actions) محاطة بـ `{{...}}` تُستخدم لإدراج المحتوى ديناميكياً.

```go
    t1 := template.New("t1")
    t1, err := t1.Parse("القيمة هي {{.}}\n")
    if err != nil {
        panic(err)
    }
```

بدلاً من ذلك، يمكننا استخدام دالة `template.Must` للذعر في حال أعادت `Parse` خطأً. هذا مفيد بشكل خاص للقوالب التي يتم تهيئتها في النطاق العام.

```go
    t1 = template.Must(t1.Parse("قيمة: {{.}}\n"))
```

من خلال "تنفيذ" القالب، نقوم بإنشاء النص الخاص به بقيم محددة لإجراءاته. يتم استبدال الإجراء `{{.}}` بالقيمة الممرة كمعامل لـ `Execute`.

```go
    t1.Execute(os.Stdout, "بعض النص")
    t1.Execute(os.Stdout, 5)
    t1.Execute(os.Stdout, []string{
        "Go",
        "Rust",
        "C++",
        "C#",
    })
```

دالة مساعدة سنستخدمها أدناه.

```go
    Create := func(name, t string) *template.Template {
        return template.Must(template.New(name).Parse(t))
    }
```

إذا كانت البيانات هيكلاً (struct)، يمكننا استخدام الإجراء `{{.FieldName}}` للوصول إلى حقوله. يجب أن تكون الحقول مصدرة (exported) ليكون من الممكن الوصول إليها عند تنفيذ القالب.

```go
    t2 := Create("t2", "الاسم: {{.Name}}\n")

    t2.Execute(os.Stdout, struct {
        Name string
    }{"Jane Doe"})
```

ينطبق الشيء نفسه على الخرائط (maps)؛ مع الخرائط لا توجد قيود على حالة أحرف أسماء المفاتيح.

```go
    t2.Execute(os.Stdout, map[string]string{
        "Name": "Mickey Mouse",
    })
```

توفر `if/else` تنفيذاً شرطياً للقوالب. تُعتبر القيمة خاطئة إذا كانت القيمة الافتراضية للنوع، مثل 0، نص فارغ، مؤشر nil، إلخ. يوضح هذا النموذج ميزة أخرى للقوالب: استخدام `-` في الإجراءات لقص المسافات البيضاء.

```go
    t3 := Create("t3",
        "{{if . -}} نعم {{else -}} لا {{end}}\n")
    t3.Execute(os.Stdout, "ليس فارغاً")
    t3.Execute(os.Stdout, "")
```

كتل `range` تسمح لنا بالتكرار عبر الشرائح، المصفوفات، الخرائط أو القنوات. داخل كتلة range، يتم تعيين `{{.}}` للعنصر الحالي في التكرار.

```go
    t4 := Create("t4",
        "النطاق: {{range .}}{{.}} {{end}}\n")
    t4.Execute(os.Stdout,
        []string{
            "Go",
            "Rust",
            "C++",
            "C#",
        })
}
```

تشغيل البرنامج:

```sh
$ go run templates.go 
قيمة: بعض النص
قيمة: 5
قيمة: [Go Rust C++ C#]
الاسم: Jane Doe
الاسم: Mickey Mouse
نعم 
لا 
النطاق: Go Rust C++ C# 
```
