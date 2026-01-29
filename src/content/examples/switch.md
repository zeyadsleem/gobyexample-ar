---
title: "جمل الاختيار (Switch)"
description: "استخدام جمل switch للتعبير عن الشروط المتعددة في لغة Go"
order: 7
---

تعبّر *جمل الاختيار* (Switch statements) عن الشروط عبر فروع متعددة.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
```

إليك جملة `switch` أساسية.

```go
    i := 2
    fmt.Print("اكتب ", i, " كـ ")
    switch i {
    case 1:
        fmt.Println("واحد")
    case 2:
        fmt.Println("اثنان")
    case 3:
        fmt.Println("ثلاثة")
    }
```

يمكنك استخدام الفواصل للفصل بين تعبيرات متعددة في نفس عبارة `case`. نستخدم أيضاً حالة `default` الاختيارية في هذا المثال.

```go
    switch time.Now().Weekday() {
    case time.Saturday, time.Sunday:
        fmt.Println("إنه عطلة نهاية الأسبوع")
    default:
        fmt.Println("إنه يوم عمل")
    }
```

`switch` بدون تعبير هي طريقة بديلة للتعبير عن منطق if/else. هنا نوضح أيضاً كيف يمكن أن تكون تعبيرات `case` غير ثابتة.

```go
    t := time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println("إنه قبل الظهر")
    default:
        fmt.Println("إنه بعد الظهر")
    }
```

الـ `switch` حسب النوع (Type switch) يقارن الأنواع بدلاً من القيم. يمكنك استخدامه لاكتشاف نوع قيمة الـ `interface`. في هذا المثال، المتغير `t` سيكون له النوع المقابل لحالته.

```go
    whatAmI := func(i interface{}) {
        switch t := i.(type) {
        case bool:
            fmt.Println("أنا قيمة منطقية (bool)")
        case int:
            fmt.Println("أنا عدد صحيح (int)")
        default:
            fmt.Printf("لا أعرف النوع %T\n", t)
        }
    }
    whatAmI(true)
    whatAmI(1)
    whatAmI("hey")
}
```

تشغيل البرنامج:

```sh
$ go run switch.go 
Write 2 as اثنان
It's a weekday
It's after noon
أنا قيمة منطقية (bool)
أنا عدد صحيح (int)
لا أعرف النوع string
```
