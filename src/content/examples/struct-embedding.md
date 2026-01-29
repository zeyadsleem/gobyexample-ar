---
title: "تضمين الهياكل (Struct Embedding)"
description: "استخدام تضمين الهياكل (Embedding) لتحقيق تركيب الأنواع في لغة Go"
order: 23
---

تدعم لغة Go *تضمين* (embedding) الهياكل والواجهات للتعبير عن *تركيب* (composition) الأنواع بشكل أكثر سلاسة. لا ينبغي الخلط بين هذا وبين توجيه `//go:embed` الذي تم تقديمه في الإصدار 1.16+ لتضمين الملفات والمجلدات في الملف الثنائي للتطبيق.

```go
package main

import "fmt"

type base struct {
    num int
}

func (b base) describe() string {
    return fmt.Sprintf("base with num=%v", b.num)
}
```

هيكل `container` يضمن `base`. التضمين يبدو كحقل بدون اسم.

```go
type container struct {
    base
    str string
}

func main() {
```

عند إنشاء الهياكل باستخدام القيم المباشرة، يجب علينا تهيئة التضمين صراحة؛ هنا يعمل النوع المضمن كاسم للحقل.

```go
    co := container{
        base: base{
            num: 1,
        },
        str: "some name",
    }
```

يمكننا الوصول إلى حقول `base` مباشرة على `co` مثلاً `co.num`.

```go
    fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)
```

بدلاً من ذلك، يمكننا كتابة المسار الكامل باستخدام اسم النوع المضمن.

```go
    fmt.Println("also num:", co.base.num)
```

بما أن `container` يضمن `base` فإن دوال `base` التابعة تصبح أيضاً دوالاً تابعة لـ `container`. هنا نستدعي دالة تم تضمينها من `base` مباشرة على `co`.

```go
    fmt.Println("describe:", co.describe())

    type describer interface {
        describe() string
    }
```

يمكن استخدام تضمين الهياكل مع الدوال التابعة لمنح تطبيق الواجهات لهياكل أخرى. هنا نرى أن `container` يطبق الآن واجهة `describer` لأنه يضمن `base`.

```go
    var d describer = co
    fmt.Println("describer:", d.describe())
}
```

تشغيل البرنامج:

```sh
$ go run struct-embedding.go
co={num: 1, str: some name}
also num: 1
describe: base with num=1
describer: base with num=1
```
