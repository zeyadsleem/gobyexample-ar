---
title: "مجموعات الانتظار (WaitGroups)"
description: "استخدام sync.WaitGroup لانتظار انتهاء عدة Goroutines في لغة Go"
order: 41
---
لانتظار انتهاء عدة goroutines، يمكننا استخدام *مجموعة انتظار* (wait group).

```go
package main

import (
    "fmt"
    "sync"
    "time"
)
```

هذه هي الدالة التي سنشغلها في كل goroutine.

```go
func worker(id int) {
    fmt.Printf("العامل %d بدأ\n", id)

    // الانتظار لمحاكاة مهمة مكلفة.
    time.Sleep(time.Second)
    fmt.Printf("العامل %d انتهى\n", id)
}

func main() {
```

تُستخدم `WaitGroup` لانتظار انتهاء جميع الـ goroutines التي بدأت هنا. ملاحظة: إذا تم تمرير `WaitGroup` صراحة إلى الدوال، فيجب أن يتم ذلك عن طريق المؤشر (pointer).

```go
    var wg sync.WaitGroup
```

ابدأ عدة goroutines باستخدام `wg.Add` لتحديث العداد.

```go
    for i := 1; i <= 5; i++ {
        wg.Add(1)

        // تغليف استدعاء العامل في دالة مجهولة لضمان استدعاء 'Done'.
        go func(id int) {
            defer wg.Done()
            worker(id)
        }(i)
    }
```

الإعاقة حتى ينتهي عداد `wg` ويصل إلى الصفر، مما يعني أن جميع الـ goroutines قد انتهت.

```go
    wg.Wait()
}
```

لاحظ أن ترتيب بدء وانتهاء العمال قد يختلف في كل مرة يتم فيها تشغيل البرنامج.

```go
```

تشغيل البرنامج:

```sh
$ go run waitgroups.go
العامل 5 بدأ
العامل 3 بدأ
العامل 4 بدأ
العامل 1 بدأ
العامل 2 بدأ
العامل 4 انتهى
العامل 1 انتهى
العامل 2 انتهى
العامل 5 انتهى
العامل 3 انتهى
```
