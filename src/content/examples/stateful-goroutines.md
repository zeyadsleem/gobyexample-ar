---
title: "الـ Goroutines ذات الحالة (Stateful Goroutines)"
description: "إدارة الحالة المشتركة في Go باستخدام الـ Goroutines والقنوات بدلاً من الأقفال"
order: 45
---
في المثال السابق استخدمنا القفل الصريح مع الـ mutexes لتزامن الوصول إلى الحالة المشتركة عبر عدة goroutines. خيار آخر هو استخدام ميزات التزامن المدمجة في الـ goroutines والقنوات لتحقيق نفس النتيجة. يتماشى هذا النهج القائم على القنوات مع أفكار Go في مشاركة الذاكرة عن طريق التواصل وجعل كل قطعة من البيانات مملوكة لـ goroutine واحد بالضبط.

```go
package main

import (
    "fmt"
    "math/rand"
    "sync/atomic"
    "time"
)
```

في هذا المثال ستكون حالتنا مملوكة لـ goroutine واحد. سيضمن هذا أن البيانات لن تتعرض للتلف أبداً بسبب الوصول المتوازي. لكي تقرأ أو تكتب في تلك الحالة، ستقوم الـ goroutines الأخرى بإرسال رسائل إلى الـ goroutine المالك واستقبال الردود المقابلة. هياكل `readOp` و `writeOp` تغلف تلك الطلبات وطريقة للرد من الـ goroutine المالك.

```go
type readOp struct {
    key  int
    resp chan int
}
type writeOp struct {
    key  int
    val  int
    resp chan bool
}

func main() {
```

كما فعلنا سابقاً، سنعد كم عدد العمليات التي ننفذها.

```go
    var readOps uint64
    var writeOps uint64
```

سيتم استخدام قناتي `reads` و `writes` بواسطة الـ goroutines الأخرى لإصدار طلبات القراءة والكتابة، على التوالي.

```go
    reads := make(chan readOp)
    writes := make(chan writeOp)
```

إليك الـ goroutine الذي يملك الـ `state` (الحالة)، وهي خريطة خاصة به. يقوم هذا الـ goroutine مراراً وتكراراً بالاختيار عبر قناتي `reads` و `writes` والرد على الطلبات فور وصولها.

```go
    go func() {
        var state = make(map[int]int)
        for {
            select {
            case read := <-reads:
                read.resp <- state[read.key]
            case write := <-writes:
                state[write.key] = write.val
                write.resp <- true
            }
        }
    }()
```

هذا يبدأ 100 goroutines لإصدار طلبات قراءة للـ goroutine المالك للحالة. تتطلب كل قراءة بناء `readOp` وإرساله عبر قناة `reads` ثم استلام النتيجة عبر قناة `resp` الموفرة.

```go
    for r := 0; r < 100; r++ {
        go func() {
            for {
                read := readOp{
                    key:  rand.Intn(5),
                    resp: make(chan int)}
                reads <- read
                <-read.resp
                atomic.AddUint64(&readOps, 1)
                time.Sleep(time.Millisecond)
            }
        }()
    }
```

نبدأ 10 عمليات كتابة أيضاً، باستخدام نهج مماثل.

```go
    for w := 0; w < 10; w++ {
        go func() {
            for {
                write := writeOp{
                    key:  rand.Intn(5),
                    val:  rand.Intn(100),
                    resp: make(chan bool)}
                writes <- write
                <-write.resp
                atomic.AddUint64(&writeOps, 1)
                time.Sleep(time.Millisecond)
            }
        }()
    }
```

دع الـ goroutines تعمل لمدة ثانية واحدة.

```go
    time.Sleep(time.Second)
```

أخيراً، التقط وابلغ عن أعداد العمليات.

```go
    readOpsFinal := atomic.LoadUint64(&readOps)
    fmt.Println("readOps:", readOpsFinal)
    writeOpsFinal := atomic.LoadUint64(&writeOps)
    fmt.Println("writeOps:", writeOpsFinal)
}
```

تشغيل البرنامج:

```sh
$ go run stateful-goroutines.go
readOps: 71708
writeOps: 7177
```
