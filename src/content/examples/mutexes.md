---
title: "أقفال الاستبعاد المتبادل (Mutexes)"
description: "استخدام sync.Mutex للوصول الآمن إلى البيانات المشتركة بين الـ Goroutines في لغة Go"
order: 44
---

في المثال السابق رأينا كيفية إدارة حالة عداد بسيط باستخدام العمليات الذرية (atomic operations). بالنسبة للحالات الأكثر تعقيداً، يمكننا استخدام [*Mutex*](https://en.wikipedia.org/wiki/Mutual_exclusion) (قفل الاستبعاد المتبادل) للوصول الآمن إلى البيانات عبر عدة goroutines.

```go
package main

import (
    "fmt"
    "sync"
)
```

هيكل `Container` يحتوي على خريطة من العدادات؛ بما أننا نريد تحديثها بالتوازي من عدة goroutines، نضيف `Mutex` لتزامن الوصول. ملاحظة: يجب عدم نسخ الـ mutexes، لذا إذا تم تمرير هذا الهيكل، فيجب القيام بذلك عن طريق المؤشر.

```go
type Container struct {
    mu       sync.Mutex
    counters map[string]int
}
```

قم بقفل الـ mutex قبل الوصول لـ `counters`؛ وافتحه في نهاية الدالة باستخدام عبارة `defer`.

```go
func (c *Container) inc(name string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.counters[name]++
}

func main() {
    c := Container{
```

لاحظ أن القيمة الصفرية لـ mutex صالحة للاستخدام كما هي، لذا لا يلزم تهيئتها هنا.

```go
        counters: map[string]int{"a": 0, "b": 0},
    }

    var wg sync.WaitGroup
```

هذه دالة تزيد عداداً مسمى في حلقة.

```go
    doIncrement := func(name string, n int) {
        for i := 0; i < n; i++ {
            c.inc(name)
        }
        wg.Done()
    }
```

تشغيل عدة goroutines بالتوازي؛ لاحظ أنها جميعاً تصل لنفس الـ `Container` واثنان منها يصلان لنفس العداد.

```go
    wg.Add(3)
    go doIncrement("a", 10000)
    go doIncrement("a", 10000)
    go doIncrement("b", 10000)
```

انتظر انتهاء الـ goroutines.

```go
    wg.Wait()
    fmt.Println(c.counters)
}
```

تشغيل البرنامج يظهر أن العدادات تم تحديثها كما هو متوقع.

```go
```

تشغيل البرنامج:

```sh
$ go run mutexes.go
map[a:20000 b:10000]
```
