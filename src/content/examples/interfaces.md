---
title: "الواجهات (Interfaces)"
description: "تعريف واستخدام الواجهات (Interfaces) في لغة Go"
order: 21
---

*الواجهات* (Interfaces) هي مجموعات مسمى من تواقيع الدوال (method signatures).

```go
package main

import (
    "fmt"
    "math"
)
```

إليك واجهة أساسية للأشكال الهندسية.

```go
type geometry interface {
    area() float64
    perim() float64
}
```

لمثالنا سنقوم بتطبيق هذه الواجهة على نوعي `rect` و `circle`.

```go
type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}
```

لتطبيق واجهة في Go، نحتاج فقط لتطبيق جميع الدوال الموجودة في تلك الواجهة. هنا نطبق واجهة `geometry` على المستطيلات `rect`.

```go
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}
```

التطبيق الخاص بالدوائر `circle`.

```go
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}
```

إذا كان المتغير له نوع واجهة، فيمكننا استدعاء الدوال الموجودة في تلك الواجهة. إليك دالة `measure` عامة تستفيد من هذا للعمل على أي `geometry`.

```go
func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}
```

أحياناً يكون من المفيد معرفة النوع الفعلي لقيمة الواجهة في وقت التشغيل. أحد الخيارات هو استخدام 'إثبات النوع' (type assertion) كما هو موضح هنا؛ خيار آخر هو استخدام `switch` النوع.

```go
func detectCircle(g geometry) {
    if c, ok := g.(circle); ok {
        fmt.Println("دائرة بنصف قطر", c.radius)
    }
}

func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}
```

نوعي الهياكل `circle` و `rect` كلاهما يطبقان واجهة `geometry` لذا يمكننا استخدام مثيلات من هذه الهياكل كمعاملات لـ `measure`.

```go
    measure(r)
    measure(c)

    detectCircle(r)
    detectCircle(c)
}
```

تشغيل البرنامج:

```sh
$ go run interfaces.go
{3 4}
12
14
{5}
78.53981633974483
31.41592653589793
دائرة بنصف قطر 5
```
