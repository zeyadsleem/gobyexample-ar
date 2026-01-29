---
title: "الحلقات التكرارية (For)"
description: "استخدام حلقة for في لغة Go"
order: 5
---

`for` هي أداة التكرار الوحيدة في لغة Go. إليك بعض الأنواع الأساسية لحلقات `for`.

```go
package main

import "fmt"

func main() {
```

النوع الأكثر بساطة، مع شرط واحد.

```go
    i := 1
    for i <= 3 {
        fmt.Println(i)
        i = i + 1
    }
```

حلقة `for` كلاسيكية (بداية/شرط/بعد).

```go
    for j := 0; j < 3; j++ {
        fmt.Println(j)
    }
```

طريقة أخرى لإنجاز التكرار الأساسي "افعل هذا N مرات" هي باستخدام `range` مع رقم صحيح.

```go
    for i := range 3 {
        fmt.Println("range", i)
    }
```

حلقة `for` بدون شرط ستستمر في التكرار بشكل لا نهائي حتى تستخدم `break` للخروج أو `return` من الدالة.

```go
    for {
        fmt.Println("loop")
        break
    }
```

يمكنك أيضاً استخدام `continue` للانتقال إلى التكرار التالي في الحلقة.

```go
    for n := range 6 {
        if n%2 == 0 {
            continue
        }
        fmt.Println(n)
    }
}
```

تشغيل البرنامج:

```sh
$ go run for.go
1
2
3
0
1
2
range 0
range 1
range 2
loop
1
3
5
```

سنرى أشكالاً أخرى لـ `for` لاحقاً عندما ننظر في عبارات `range` والقنوات (channels) وهياكل البيانات الأخرى.
