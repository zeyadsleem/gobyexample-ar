---
title: "تحليل الأرقام"
description: "تحويل النصوص إلى أرقام في لغة Go"
order: 61
---

تحليل الأرقام من النصوص هو مهمة شائعة ولكنها أساسية في العديد من البرامج؛ إليك كيف يتم ذلك في Go.

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
```

باستخدام `ParseFloat` هذا الرقم `64` يحدد عدد بتات الدقة.

```go
    f, _ := strconv.ParseFloat("1.234", 64)
    fmt.Println(f)
```

بالنسبة لـ `ParseInt` الرقم `0` يعني استنتاج الأساس من النص. الرقم `64` يحدد أن النتيجة يجب أن تتناسب مع 64 بت.

```go
    i, _ := strconv.ParseInt("123", 0, 64)
    fmt.Println(i)
```

`ParseInt` سيتعرف على الأرقام المكتوبة بصيغة سداسية عشرية (hex).

```go
    d, _ := strconv.ParseInt("0x1c8", 0, 64)
    fmt.Println(d)
```

تتوفر دالة `ParseUint` أيضاً للأرقام غير الموقعة.

```go
    u, _ := strconv.ParseUint("789", 0, 64)
    fmt.Println(u)
```

`Atoi` هي دالة مساعدة للتحويل الأساسي للأعداد الصحيحة ذات الأساس 10.

```go
    k, _ := strconv.Atoi("135")
    fmt.Println(k)
```

دوال التحليل تعيد خطأ عند وجود مدخلات غير صالحة.

```go
    _, e := strconv.Atoi("wat")
    fmt.Println(e)
}
```

تشغيل البرنامج:

```sh
$ go run number-parsing.go
1.234
123
456
789
135
strconv.Atoi: parsing "wat": invalid syntax
```
