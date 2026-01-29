---
title: "الإغلاقات (Closures)"
description: "استخدام الدوال المجهولة والإغلاقات في لغة Go"
order: 15
---

تدعم لغة Go [*الدوال المجهولة*](https://en.wikipedia.org/wiki/Anonymous_function) والتي يمكنها تكوين [*إغلاقات*](https://en.wikipedia.org/wiki/Closure_(computer_science)). الدوال المجهولة مفيدة عندما تريد تعريف دالة في سياق معين دون الحاجة إلى تسميتها.

```go
package main

import "fmt"
```

هذه دالة `intSeq` تعيد دالة أخرى نقوم بتعريفها بشكل مجهول في متن `intSeq`. الدالة المرتجعة "تغلق على" المتغير `i` لتكوين إغلاق (closure).

```go
func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {
```

نقوم باستدعاء `intSeq` وتعيين النتيجة (وهي دالة) لـ `nextInt`. قيمة هذه الدالة تلتقط قيمة `i` الخاصة بها، والتي سيتم تحديثها في كل مرة نستدعي فيها `nextInt`.

```go
    nextInt := intSeq()
```

شاهد تأثير الإغلاق عن طريق استدعاء `nextInt` عدة مرات.

```go
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())
```

للتأكد من أن الحالة فريدة لتلك الدالة المعينة، قم بإنشاء واختبار دالة جديدة.

```go
    newInts := intSeq()
    fmt.Println(newInts())
}
```

آخر ميزة للدوال سننظر فيها الآن هي التكرار (recursion).

تشغيل البرنامج:

```sh
$ go run closures.go
1
2
3
1
```
