---
title: "مهلات الوقت (Timeouts)"
description: "تنفيذ مهلات الوقت (Timeouts) باستخدام القنوات و select في لغة Go"
order: 34
---

*مهلات الوقت* (Timeouts) مهمة للبرامج التي تتصل بموارد خارجية أو التي تحتاج لتقييد وقت التنفيذ. تنفيذ المهلات في Go سهل وأنيق بفضل القنوات و `select`.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
```

لمثالنا، لنفترض أننا ننفذ استدعاءً خارجياً يعيد نتيجته على قناة `c1` بعد ثانيتين. لاحظ أن القناة مؤقتة، لذا فإن الإرسال في الـ goroutine غير معيق. هذا نمط شائع لمنع تسرب الـ goroutine في حالة عدم قراءة القناة أبداً.

```go
    c1 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c1 <- "result 1"
    }()
```

هنا `select` يطبق مهلة الوقت. `res := <-c1` ينتظر النتيجة و `<-time.After` ينتظر قيمة ترسل بعد مهلة ثانية واحدة. بما أن `select` يكمل مع أول استقبال جاهز، سنأخذ حالة المهلة إذا استغرقت العملية أكثر من الثانية المسموح بها.

```go
    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout 1")
    }
```

إذا سمحنا بمهلة أطول قدرها 3 ثوانٍ، فإن الاستقبال من `c2` سينجح وسنطبع النتيجة.

```go
    c2 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "result 2"
    }()
    select {
    case res := <-c2:
        fmt.Println(res)
    case <-time.After(3 * time.Second):
        fmt.Println("timeout 2")
    }
}
```

تشغيل البرنامج:

```sh
$ go run timeouts.go 
timeout 1
result 2
```
