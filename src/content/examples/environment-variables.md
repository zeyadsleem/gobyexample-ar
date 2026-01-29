---
title: "متغيرات البيئة"
description: "قراءة وضبط متغيرات البيئة (Environment Variables) في لغة Go"
order: 76
---

[*متغيرات البيئة*](https://en.wikipedia.org/wiki/Environment_variable) هي طريقة عالمية لتمرير معلومات التكوين لبرامج Unix.

```go
package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {
```

لتعيين زوج مفتاح/قيمة، استخدم `os.Setenv`. للحصول على قيمة مفتاح، استخدم `os.Getenv`. سيعيد نصاً فارغاً إذا لم يكن المفتاح موجوداً في البيئة.

```go
    os.Setenv("FOO", "1")
    fmt.Println("FOO:", os.Getenv("FOO"))
    fmt.Println("BAR:", os.Getenv("BAR"))
```

استخدم `os.Environ` لسرد جميع أزواج المفتاح/القيمة في البيئة. تعيد شريحة من النصوص بالصيغة `KEY=VALUE`. يمكنك استخدام `strings.SplitN` لتقسيمها.

```go
    fmt.Println()
    for _, e := range os.Environ() {
        pair := strings.SplitN(e, "=", 2)
        fmt.Println(pair[0])
    }
}
```

تشغيل البرنامج سيظهر قائمة بجميع متغيرات البيئة المتوفرة في نظامك.

```sh
$ go run environment-variables.go
FOO: 1
BAR: 

...
TERM_PROGRAM
PATH
SHELL
...
```
