---
title: "الأنواع العامة (Generics)"
description: "استخدام الأنواع العامة (Generics) ومعاملات الأنواع في لغة Go"
order: 24
---
بدءاً من الإصدار 1.18، أضافت لغة Go دعماً لـ *الأنواع العامة* (generics)، والمعروفة أيضاً باسم *معاملات الأنواع* (type parameters).

```go
package main

import "fmt"
```

كمثال على دالة عامة، تأخذ `SlicesIndex` شريحة من أي نوع `comparable` وعنصراً من ذلك النوع وتعيد فهرس أول ظهور لـ v في s، أو -1 إذا لم يكن موجوداً. قيد `comparable` يعني أنه يمكننا مقارنة قيم هذا النوع باستخدام العاملين `==` و `!=`. لاحظ أن هذه الدالة موجودة في المكتبة القياسية كـ `slices.Index`.

```go
func SlicesIndex[S ~[]E, E comparable](s S, v E) int {
    for i := range s {
        if v == s[i] {
            return i
        }
    }
    return -1
}
```

كمثال على نوع عام، `List` هي قائمة مرتبطة بشكل فردي (singly-linked list) مع قيم من أي نوع.

```go
type List[T any] struct {
    head, tail *element[T]
}

type element[T any] struct {
    next *element[T]
    val  T
}
```

يمكننا تعريف دوال تابعة على الأنواع العامة تماماً كما نفعل مع الأنواع العادية، ولكن يجب علينا الحفاظ على معاملات الأنواع في مكانها. النوع هو `List[T]` وليس `List`.

```go
func (lst *List[T]) Push(v T) {
    if lst.tail == nil {
        lst.head = &element[T]{val: v}
        lst.tail = lst.head
    } else {
        lst.tail.next = &element[T]{val: v}
        lst.tail = lst.tail.next
    }
}
```

`AllElements` تعيد جميع عناصر القائمة كشريحة. في المثال القادم سنرى طريقة أكثر مثالية للتكرار عبر جميع عناصر الأنواع المخصصة.

```go
func (lst *List[T]) AllElements() []T {
    var elems []T
    for e := lst.head; e != nil; e = e.next {
        elems = append(elems, e.val)
    }
    return elems
}

func main() {
    var s = []string{"foo", "bar", "zoo"}
```

عند استدعاء الدوال العامة، يمكننا غالباً الاعتماد على 'استنتاج النوع' (type inference). لاحظ أننا لا نحتاج لتحديد الأنواع لـ `S` و `E` عند استدعاء `SlicesIndex` فالمترجم يستنتجها تلقائياً.

```go
    fmt.Println("index of zoo:", SlicesIndex(s, "zoo"))
```

... على الرغم من أنه يمكننا أيضاً تحديدها صراحة.

```go
    _ = SlicesIndex[[]string, string](s, "zoo")

    lst := List[int]{}
    lst.Push(10)
    lst.Push(13)
    lst.Push(23)
    fmt.Println("list:", lst.AllElements())
}
```

تشغيل البرنامج:

```sh
$ go run generics.go
index of zoo: 2
list: [10 13 23]
```
