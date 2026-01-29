---
title: "معاملات سطر الأوامر"
description: "الوصول إلى المعاملات الممرة للبرنامج عبر سطر الأوامر في لغة Go"
order: 73
---

[*معاملات سطر الأوامر*](https://en.wikipedia.org/wiki/Command-line_interface#Arguments) هي طريقة شائعة لتحديد معاملات تشغيل البرامج. على سبيل المثال، في `go run hello.go` يعتبر `hello.go` معامل لبرنامج `go`.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
```

`os.Args` توفر الوصول إلى معاملات سطر الأوامر الخام. لاحظ أن العنصر الأول في هذه الشريحة هو مسار البرنامج نفسه، و `os.Args[1:]` تحمل المعاملات الفعلية للبرنامج.

```go
    argsWithProg := os.Args
    argsWithoutProg := os.Args[1:]
```

يمكنك الحصول على المعاملات الفردية باستخدام الفهرسة العادية.

```go
    arg := os.Args[3]

    fmt.Println(argsWithProg)
    fmt.Println(argsWithoutProg)
    fmt.Println(arg)
}
```

لتجربة البرنامج:

```sh
$ go build command-line-arguments.go
$ ./command-line-arguments a b c d
[/tmp/command-line-arguments a b c d]
[a b c d]
c
```
