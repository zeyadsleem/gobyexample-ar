---
title: "تخزين القنوات المؤقت (Channel Buffering)"
description: "استخدام القنوات المؤقتة (Buffered Channels) في لغة Go"
order: 30
---

افتراضياً، القنوات *غير مؤقتة* (unbuffered)، مما يعني أنها ستقبل عمليات الإرسال (`chan <-`) فقط إذا كان هناك استقبال مطابق (`<- chan`) جاهز لاستلام القيمة المرسلة. أما *القنوات المؤقتة* (Buffered channels) فتقبل عدداً محدوداً من القيم دون وجود مستلم مطابق لتلك القيم فوراً.

```go
package main

import "fmt"

func main() {
```

هنا نقوم بإنشاء قناة من النصوص تخزن مؤقتاً حتى قيمتين.

```go
    messages := make(chan string, 2)
```

بما أن هذه القناة مؤقتة، يمكننا إرسال هذه القيم إلى القناة دون وجود استقبال متزامن مطابق.

```go
    messages <- "buffered"
    messages <- "channel"
```

لاحقاً يمكننا استقبال هاتين القيمتين كالمعتاد.

```go
    fmt.Println(<-messages)
    fmt.Println(<-messages)
}
```

تشغيل البرنامج:

```sh
$ go run channel-buffering.go 
buffered
channel
```
