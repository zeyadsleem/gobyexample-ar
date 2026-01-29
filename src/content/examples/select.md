---
title: "الاختيار (Select)"
description: "استخدام select للانتظار على عمليات قنوات متعددة في لغة Go"
order: 33
---

عبارة *select* في Go تسمح لك بالانتظار على عمليات قنوات متعددة. دمج الـ goroutines والقنوات مع 'select' هو ميزة قوية في Go.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
```

لمثالنا سنقوم بالاختيار عبر قناتين.

```go
    c1 := make(chan string)
    c2 := make(chan string)
```

كل قناة ستستلم قيمة بعد قدر معين من الوقت، لمحاكاة عمليات RPC المعيقة التي تنفذ في goroutines متوازية.

```go
    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "واحد"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "اثنان"
    }()
```

سنستخدم `select` لانتظار هاتين القيمتين في آن واحد، وطباعة كل واحدة فور وصولها.

```go
    for range 2 {
        select {
        case msg1 := <-c1:
            fmt.Println("تم استلام", msg1)
        case msg2 := <-c2:
            fmt.Println("تم استلام", msg2)
        }
    }
}
```

تشغيل البرنامج:

```sh
$ time go run select.go 
تم استلام واحد
تم استلام اثنان

real    0m2.245s
```

لاحظ أن إجمالي وقت التنفيذ هو حوالي ثانيتين فقط لأن كلا عمليتي الانتظار (Sleeps) لثانية وثانيتين تم تنفيذهما بالتوازي.
