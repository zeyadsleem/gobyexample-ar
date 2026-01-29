---
title: "الدوال التابعة (Methods)"
description: "تعريف واستخدام الدوال التابعة (Methods) للهياكل في لغة Go"
order: 20
---

تدعم لغة Go تعريف *الدوال التابعة* (Methods) على أنواع الهياكل (structs).

```go
package main

import "fmt"

type rect struct {
    width, height int
}
```

دالة `area` هذه لها "نوع مستقبِل" (receiver type) هو `*rect`.

```go
func (r *rect) area() int {
    return r.width * r.height
}
```

يمكن تعريف الدوال التابعة إما لمستقبل من نوع مؤشر (pointer) أو قيمة (value). هنا مثال لمستقبل من نوع القيمة.

```go
func (r rect) perim() int {
    return 2*r.width + 2*r.height
}

func main() {
    r := rect{width: 10, height: 5}
```

هنا نستدعي الدالتين المعرفتين لهيكل المستطيل الخاص بنا.

```go
    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())
```

تتعامل Go تلقائياً مع التحويل بين القيم والمؤشرات عند استدعاء الدوال التابعة. قد ترغب في استخدام مستقبل من نوع المؤشر لتجنب النسخ عند استدعاء الدالة أو للسماح للدالة بتعديل الهيكل المستقبِل.

```go
    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}
```

تشغيل البرنامج:

```sh
$ go run methods.go 
area:  50
perim: 30
area:  50
perim: 30
```