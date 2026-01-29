---
title: "اتجاهات القنوات (Channel Directions)"
description: "تحديد اتجاه القنوات (إرسال فقط أو استقبال فقط) في معاملات الدوال في لغة Go"
order: 32
---

عند استخدام القنوات كمعاملات للدالة، يمكنك تحديد ما إذا كانت القناة مخصصة للإرسال فقط أو الاستقبال فقط. هذا التحديد يزيد من سلامة الأنواع (type-safety) في البرنامج.

```go
package main

import "fmt"
```

دالة `ping` هذه تقبل فقط قناة لإرسال القيم. سيكون من الخطأ (أثناء التصريف) محاولة الاستقبال من هذه القناة.

```go
func ping(pings chan<- string, msg string) {
    pings <- msg
}
```

دالة `pong` تقبل قناة واحدة للاستقبال (pings) والثانية للإرسال (pongs).

```go
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}

func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
}
```

تشغيل البرنامج:

```sh
$ go run channel-directions.go
passed message
```