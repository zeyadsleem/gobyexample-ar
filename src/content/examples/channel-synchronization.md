---
title: "تزامن القنوات (Channel Synchronization)"
description: "استخدام القنوات لتزامن التنفيذ بين الـ Goroutines في لغة Go"
order: 31
---

يمكننا استخدام القنوات لتزامن التنفيذ عبر الـ goroutines. إليك مثال على استخدام استقبال معيق (blocking receive) للانتظار حتى ينتهي goroutine معين. عند انتظار عدة goroutines للانتهاء، قد تفضل استخدام `WaitGroup`.

```go
package main

import (
    "fmt"
    "time"
)
```

هذه هي الدالة التي سنشغلها في goroutine. سيتم استخدام قناة `done` لإخطار goroutine آخر بأن عمل هذه الدالة قد اكتمل.

```go
func worker(done chan bool) {
    fmt.Print("جاري العمل...")
    time.Sleep(time.Second)
    fmt.Println("تم")
```

أرسل قيمة للإخطار بأننا انتهينا.

```go
    done <- true
}

func main() {
```

ابدأ goroutine للعامل، وأعطه القناة للإخطار عليها.

```go
    done := make(chan bool, 1)
    go worker(done)
```

الإعاقة حتى نستلم إخطاراً من العامل عبر القناة.

```go
    <-done
}
```

تشغيل البرنامج:

```sh
$ go run channel-synchronization.go      
جاري العمل...تم
```

إذا قمت بإزالة سطر `<- done` من هذا البرنامج، فقد ينتهي البرنامج قبل أن ينهي العامل عمله، أو في بعض الحالات حتى قبل أن يبدأ.