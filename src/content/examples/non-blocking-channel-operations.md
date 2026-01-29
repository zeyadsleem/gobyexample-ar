---
title: "عمليات القنوات غير المعيقة (Non-Blocking Channel Operations)"
description: "استخدام select مع default لتنفيذ عمليات إرسال واستقبال غير معيقة في لغة Go"
order: 35
---

عمليات الإرسال والاستقبال الأساسية على القنوات تكون معيقة (blocking). ومع ذلك، يمكننا استخدام `select` مع حالة `default` لتنفيذ عمليات إرسال واستقبال *غير معيقة*، وحتى عمليات 'select' متعددة الاتجاهات غير معيقة.

```go
package main

import "fmt"

func main() {
    messages := make(chan string)
    signals := make(chan bool)
```

إليك استقبال غير معيق. إذا كانت هناك قيمة متاحة في `messages` فسيأخذ `select` حالة الاستقبال بتلك القيمة. إذا لم تكن متاحة، سيأخذ فوراً حالة `default`.

```go
    select {
    case msg := <-messages:
        fmt.Println("تم استلام رسالة", msg)
    default:
        fmt.Println("لم يتم استلام أي رسالة")
    }
```

الإرسال غير المعيق يعمل بشكل مماثل. هنا لا يمكن إرسال `msg` إلى قناة `messages` لأن القناة ليس لها مخزن مؤقت ولا يوجد مستلم. لذلك يتم اختيار حالة `default`.

```go
    msg := "hi"
    select {
    case messages <- msg:
        fmt.Println("تم إرسال الرسالة", msg)
    default:
        fmt.Println("لم يتم إرسال الرسالة")
    }
```

يمكننا استخدام عدة حالات `case` فوق عبارة `default` لتنفيذ `select` متعدد الاتجاهات غير معيق. هنا نحاول إجراء استقبال غير معيق من كل من `messages` و `signals`.

```go
    select {
    case msg := <-messages:
        fmt.Println("تم استلام رسالة", msg)
    case sig := <-signals:
        fmt.Println("تم استلام إشارة", sig)
    default:
        fmt.Println("لا يوجد نشاط")
    }
}
```

تشغيل البرنامج:

```sh
$ go run non-blocking-channel-operations.go 
لم يتم استلام أي رسالة
لم يتم إرسال الرسالة
لا يوجد نشاط
```
