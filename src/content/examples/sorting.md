---
title: "الفرز (Sorting)"
description: "استخدام حزمة slices لفرز الأنواع المدمجة في لغة Go"
order: 46
---
تطبق حزمة `slices` في Go عملية الفرز للأنواع المدمجة والأنواع المعرفة من قبل المستخدم. سننظر في فرز الأنواع المدمجة أولاً.

```go
package main

import (
    "fmt"
    "slices"
)

func main() {
```

دوال الفرز هي دوال عامة (generic)، وتعمل مع أي نوع مدمج مرتب (ordered). للاطلاع على قائمة بالأنواع المرتبة، انظر `cmp.Ordered`.

```go
    strs := []string{"c", "a", "b"}
    slices.Sort(strs)
    fmt.Println("Strings:", strs)
```

مثال على فرز الأعداد الصحيحة (ints).

```go
    ints := []int{7, 2, 4}
    slices.Sort(ints)
    fmt.Println("Ints:   ", ints)
```

يمكننا أيضاً استخدام حزمة `slices` للتحقق مما إذا كانت الشريحة مفروزة بالفعل.

```go
    s := slices.IsSorted(ints)
    fmt.Println("Sorted: ", s)
}
```

تشغيل البرنامج:

```sh
$ go run sorting.go
Strings: [a b c]
Ints:    [2 4 7]
Sorted:  true
```
