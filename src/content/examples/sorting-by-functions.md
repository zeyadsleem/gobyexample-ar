---
title: "الفرز باستخدام الدوال (Sorting by Functions)"
description: "تخصيص عملية الفرز في لغة Go باستخدام دوال مقارنة مخصصة"
order: 47
---

أحياناً نريد فرز مجموعة حسب شيء آخر غير ترتيبها الطبيعي. على سبيل المثال، لنفترض أننا أردنا فرز النصوص حسب طولها بدلاً من الترتيب الأبجدي. إليك مثال على عمليات الفرز المخصصة في Go.

```go
package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"peach", "banana", "kiwi"}
```

نطبق دالة مقارنة لأطوال النصوص. دالة `cmp.Compare` مفيدة لهذا الغرض.

```go
    lenCmp := func(a, b string) int {
        return cmp.Compare(len(a), len(b))
    }
```

الآن يمكننا استدعاء `slices.SortFunc` مع دالة المقارنة المخصصة هذه لفرز `fruits` حسب طول الاسم.

```go
    slices.SortFunc(fruits, lenCmp)
    fmt.Println(fruits)
```

يمكننا استخدام نفس التقنية لفرز شريحة من القيم التي ليست أنواعاً مدمجة.

```go
    type Person struct {
        name string
        age  int
    }

    people := []Person{
        Person{name: "Jax", age: 37},
        Person{name: "TJ", age: 25},
        Person{name: "Alex", age: 72},
    }
```

فرز `people` حسب العمر باستخدام `slices.SortFunc`. ملاحظة: إذا كان هيكل `Person` كبيراً، فقد تفضل أن تحتوي الشريحة على `*Person` وتعدل دالة الفرز وفقاً لذلك.

```go
    slices.SortFunc(people,
        func(a, b Person) int {
            return cmp.Compare(a.age, b.age)
        })
    fmt.Println(people)
}
```

تشغيل البرنامج:

```sh
$ go run sorting-by-functions.go 
[kiwi peach banana]
[{TJ 25} {Jax 37} {Alex 72}]
```
