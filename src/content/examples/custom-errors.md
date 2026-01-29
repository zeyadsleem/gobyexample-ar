---
title: "الأخطاء المخصصة (Custom Errors)"
description: "تعريف أنواع أخطاء مخصصة في لغة Go عن طريق تطبيق واجهة error"
order: 27
---

من الممكن تعريف أنواع أخطاء مخصصة عن طريق تطبيق دالة `Error()` عليها. إليك نسخة معدلة من المثال السابق تستخدم نوعاً مخصصاً لتمثيل خطأ في المعاملات بشكل صريح.

```go
package main

import (
    "errors"
    "fmt"
)
```

النوع المخصص للخطأ عادة ما ينتهي باللاحقة "Error".

```go
type argError struct {
    arg     int
    message string
}
```

إضافة دالة `Error` تجعل `argError` يطبق واجهة `error`.

```go
func (e *argError) Error() string {
    return fmt.Sprintf("%d - %s", e.arg, e.message)
}

func f(arg int) (int, error) {
    if arg == 42 {
```

إرجاع الخطأ المخصص الخاص بنا.

```go
        return -1, &argError{arg, "لا يمكن العمل معه"}
    }
    return arg + 3, nil
}

func main() {
```

`errors.As` هي نسخة أكثر تقدماً من `errors.Is`. تتحقق مما إذا كان خطأ معين يطابق نوع خطأ محدد وتقوم بتحويله إلى قيمة من ذلك النوع، مع إرجاع `true`.

```go
    _, err := f(42)
    var ae *argError
    if errors.As(err, &ae) {
        fmt.Println(ae.arg)
        fmt.Println(ae.message)
    } else {
        fmt.Println("err لا يطابق argError")
    }
}
```

تشغيل البرنامج:

```sh
$ go run custom-errors.go
42
لا يمكن العمل معه
```
