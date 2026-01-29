---
title: "الإشارات (Signals)"
description: "التعامل مع إشارات Unix (مثل SIGINT و SIGTERM) في لغة Go"
order: 83
---

أحياناً نريد أن تتعامل برامج Go الخاصة بنا بذكاء مع [إشارات Unix](https://en.wikipedia.org/wiki/Signal_(IPC)). على سبيل المثال، قد نرغب في إغلاق الخادم بلباقة عندما يستلم `SIGTERM` أو إيقاف أداة سطر الأوامر عندما تستلم `SIGINT`. إليك كيفية التعامل مع الإشارات في Go باستخدام القنوات.

```go
package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
```

تعمل إخطارات الإشارات في Go عن طريق إرسال قيم `os.Signal` على قناة. سنقوم بإنشاء قناة لاستلام هذه الإخطارات.

```go
    sigs := make(chan os.Signal, 1)
```

`signal.Notify` تسجل القناة المعطاة لاستلام إخطارات بالإشارات المحددة.

```go
    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
```

سيقوم هذا الـ goroutine بتنفيذ استقبال معيق للإشارات. عندما يستلم واحدة، سيقوم بطباعتها ثم يخبر البرنامج بأنه يمكنه الانتهاء.

```go
    done := make(chan bool, 1)

    go func() {
        sig := <-sigs
        fmt.Println()
        fmt.Println(sig)
        done <- true
    }()
```

سينتظر البرنامج هنا حتى يستلم الإشارة المتوقعة (كما أشرنا في الـ goroutine أعلاه في القناة 'done') ثم يخرج.

```go
    fmt.Println("awaiting signal")
    <-done
    fmt.Println("exiting")
}
```

عند تشغيل هذا البرنامج، سينتظر إشارة. باستخدام `Ctrl+C` (التي ترسل `SIGINT`) يمكننا إرسال إشارة للبرنامج ليخرج.

تشغيل البرنامج:

```sh
$ go run signals.go
awaiting signal
^C
interrupt
exiting
```
