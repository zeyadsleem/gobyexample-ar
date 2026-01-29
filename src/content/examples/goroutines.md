---
title: "الـ Goroutines"
description: "مقدمة إلى الـ Goroutines كخيوط تنفيذ خفيفة في لغة Go"
order: 28
---

الـ *goroutine* هو خيط تنفيذ خفيف الوزن (lightweight thread).

```go
package main

import (
    "fmt"
    "time"
)

func f(from string) {
    for i := range 3 {
        fmt.Println(from, ":", i)
    }
}

func main() {
```

لنفترض أن لدينا استدعاء دالة `f(s)`. هكذا سنستدعيها بالطريقة المعتادة، لتشغيلها بشكل متزامن (synchronously).

```go
    f("direct")
```

لاستدعاء هذه الدالة في goroutine، استخدم `go f(s)`. هذا الـ goroutine الجديد سينفذ بالتوازي مع الـ goroutine المستدعي.

```go
    go f("goroutine")
```

يمكنك أيضاً بدء goroutine لدالة مجهولة.

```go
    go func(msg string) {
        fmt.Println(msg)
    }("going")
```

الآن استدعاءات الدوال لدينا تعمل بشكل غير متزامن في goroutines منفصلة. سننتظر حتى ينتهوا (لنهج أكثر متانة، استخدم 'WaitGroup').

```go
    time.Sleep(time.Second)
    fmt.Println("done")
}
```

عند تشغيل هذا البرنامج، نرى مخرجات الاستدعاء المعيق أولاً، ثم مخرجات الـ goroutines الاثنين. قد تظهر مخرجات الـ goroutines متداخلة لأنها تدار بالتوازي من قبل بيئة تشغيل Go.

```go
```

تشغيل البرنامج:

```sh
$ go run goroutines.go
direct : 0
direct : 1
direct : 2
goroutine : 0
going
goroutine : 1
goroutine : 2
done
```
