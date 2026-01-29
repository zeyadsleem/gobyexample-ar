---
title: "الأخطاء (Errors)"
description: "التعامل مع الأخطاء في لغة Go باستخدام قيم الإرجاع الصريحة"
order: 26
---

في لغة Go، من المعتاد توصيل الأخطاء عبر قيمة إرجاع صريحة ومنفصلة. يتناقض هذا مع الاستثناءات (exceptions) المستخدمة في لغات مثل Java و Python و Ruby، أو القيمة الواحدة المثقلة بالنتيجة/الخطأ المستخدمة أحياناً في C. نهج Go يجعل من السهل رؤية أي الدوال تعيد أخطاء والتعامل معها باستخدام نفس أدوات اللغة المستخدمة للمهام الأخرى غير المتعلقة بالأخطاء.

```go
package main

import (
    "errors"
    "fmt"
)
```

اصطلاحاً، الأخطاء تكون هي آخر قيمة إرجاع ولها النوع `error` وهي واجهة مدمجة.

```go
func f(arg int) (int, error) {
    if arg == 42 {
```

`errors.New` تنشئ قيمة `error` أساسية برسالة الخطأ المعطاة.

```go
        return -1, errors.New("لا يمكن العمل مع 42")
    }
```

قيمة `nil` في موضع الخطأ تشير إلى عدم وجود خطأ.

```go
    return arg + 3, nil
}
```

`sentinel error` هو متغير تم التصريح عنه مسبقاً يستخدم للإشارة إلى حالة خطأ محددة.

```go
var ErrOutOfTea = errors.New("لم يعد هناك شاي متاح")
var ErrPower = errors.New("لا يمكن غلي الماء")

func makeTea(arg int) error {
    if arg == 2 {
        return ErrOutOfTea
    } else if arg == 4 {
```

يمكننا تغليف (wrap) الأخطاء بأخطاء ذات مستوى أعلى لإضافة سياق. أبسط طريقة لذلك هي استخدام الفعل `%w` في `fmt.Errorf`. الأخطاء المغلفة تنشئ سلسلة منطقية يمكن الاستعلام عنها بدوال مثل `errors.Is`.

```go
        return fmt.Errorf("أثناء تحضير الشاي: %w", ErrPower)
    }
    return nil
}

func main() {
    for _, i := range []int{7, 42} {
```

من الشائع استخدام فحص خطأ مضمن في سطر الـ `if`.

```go
        if r, e := f(i); e != nil {
            fmt.Println("f فشلت:", e)
        } else {
            fmt.Println("f عملت بنجاح:", r)
        }
    }

    for i := range 5 {
        if err := makeTea(i); err != nil {
```

`errors.Is` تتحقق مما إذا كان خطأ معين (أو أي خطأ في سلسلته) يطابق قيمة خطأ محددة. هذا مفيد جداً مع الأخطاء المغلفة.

```go
            if errors.Is(err, ErrOutOfTea) {
                fmt.Println("يجب أن نشتري شاياً جديداً!")
            } else if errors.Is(err, ErrPower) {
                fmt.Println("الآن الجو مظلم.")
            } else {
                fmt.Printf("خطأ غير معروف: %s\n", err)
            }
            continue
        }

        fmt.Println("الشاي جاهز!")
    }
}
```

تشغيل البرنامج:

```sh
$ go run errors.go
f عملت بنجاح: 10
f فشلت: لا يمكن العمل مع 42
الشاي جاهز!
الشاي جاهز!
يجب أن نشتري شاياً جديداً!
الشاي جاهز!
الآن الجو مظلم.
```
