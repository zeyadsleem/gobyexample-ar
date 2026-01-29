---
title: "مرشحات السطور"
description: "بناء أدوات سطر الأوامر التي تعالج النصوص سطراً بسطر في لغة Go"
order: 67
---

*مرشح السطور* (Line filter) هو نوع شائع من البرامج التي تقرأ المدخلات من `stdin` وتعالجها، ثم تطبع مخرجات مشتقة منها على `stdout`. `grep` و `sed` هما مرشحات سطور شائعة.

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
```

استخدام قارئ مؤقت لـ `os.Stdin` يسمح لنا بالوصول لدالة `Scanner` المريحة التي تقرأ المدخلات سطراً بسطر.

```go
    scanner := bufio.NewScanner(os.Stdin)

    for scanner.Scan() {
```

`Text` تعيد السطر الحالي من المدخلات.

```go
        ucl := strings.ToUpper(scanner.Text())
```

اطبع السطر المحول.

```go
        fmt.Println(ucl)
    }
```

تحقق من وجود أخطاء أثناء المسح. `EOF` لا يعتبر خطأ بواسطة `Scan`.

```go
    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "error:", err)
        os.Exit(1)
    }
}
```

تشغيل البرنامج:

```sh
$ echo 'hello' > /tmp/lines
$ echo 'filter' >> /tmp/lines
$ cat /tmp/lines | go run line-filters.go
HELLO
FILTER
```
