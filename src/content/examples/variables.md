---
title: "المتغيرات"
description: "تعريف واستخدام المتغيرات في Go"
order: 3
---

في لغة Go، يتم التصريح عن *المتغيرات* (Variables) صراحةً ويستخدمها المترجم للتحقق من صحة نوع القيم المستخدمة.

```go
package main

import "fmt"

func main() {
```

`var` تقوم بالتصريح عن متغير واحد أو أكثر.

```go
    var a = "initial"
    fmt.Println(a)
```

يمكنك التصريح عن عدة متغيرات في وقت واحد.

```go
    var b, c int = 1, 2
    fmt.Println(b, c)
```

لغة Go ستستنتج نوع المتغيرات المصرح عنها بدون نوع صريح.

```go
    var d = true
    fmt.Println(d)
```

المتغيرات المصرح عنها بدون قيمة ابتدائية تكون 'صفرية' (zero-valued). القيمة الصفرية لـ `int` هي `0`.

```go
    var e int
    fmt.Println(e)
```

الصيغة `:=` هي اختصار للتصريح عن متغير وإعطائه قيمة ابتدائية. هذه الصيغة متاحة فقط داخل الدوال.

```go
    f := "apple"
    fmt.Println(f)
}
```

تشغيل البرنامج:

```sh
$ go run variables.go
initial
1 2
true
0
apple
```
