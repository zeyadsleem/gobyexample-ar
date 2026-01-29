---
title: "التكرار عبر المكررات (Range over Iterators)"
description: "استخدام المكررات (Iterators) الجديدة في Go للتكرار عبر أي نوع من البيانات"
order: 25
---

بدءاً من الإصدار 1.23، أضافت Go دعماً لـ [المكررات](https://go.dev/blog/range-functions) (iterators)، مما يسمح لنا باستخدام `range` للتكرار عبر أي شيء تقريباً!

```go
package main

import (
    "fmt"
    "iter"
    "slices"
)
```

لنلقِ نظرة على نوع `List` من المثال السابق مرة أخرى. في ذلك المثال كان لدينا دالة `AllElements` تعيد شريحة من جميع العناصر. مع مكررات Go، يمكننا فعل ذلك بشكل أفضل.

```go
type List[T any] struct {
    head, tail *element[T]
}

type element[T any] struct {
    next *element[T]
    val  T
}

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

الدالة `All` تعيد "مكرراً" (iterator)، وهو في Go دالة ذات توقيع خاص.

```go
func (lst *List[T]) All() iter.Seq[T] {
    return func(yield func(T) bool) {
```

تأخذ دالة المكرر دالة أخرى كمعامل، تسمى `yield` اصطلاحاً. ستقوم باستدعاء `yield` لكل عنصر نريد التكرار عبره، وتلاحظ قيمة الإرجاع لـ `yield` لإمكانية الإنهاء المبكر.

```go
        for e := lst.head; e != nil; e = e.next {
            if !yield(e.val) {
                return
            }
        }
    }
}
```

التكرار لا يتطلب هيكل بيانات أساسي، ولا يجب حتى أن يكون محدوداً! إليك دالة تعيد مكرراً عبر أرقام فيبوناتشي: تستمر في العمل طالما استمرت `yield` في إرجاع `true`.

```go
func genFib() iter.Seq[int] {
    return func(yield func(int) bool) {
        a, b := 1, 1
        for {
            if !yield(a) {
                return
            }
            a, b = b, a+b
        }
    }
}

func main() {
    lst := List[int]{}
    lst.Push(10)
    lst.Push(13)
    lst.Push(23)
```

بما أن `List.All` تعيد مكرراً، فيمكننا استخدامه في حلقة `range` عادية.

```go
    for e := range lst.All() {
        fmt.Println(e)
    }
```

الحزم مثل `slices` تحتوي على عدد من الدوال المفيدة للعمل مع المكررات. على سبيل المثال، `Collect` تأخذ أي مكرر وتجمع كل قيمه في شريحة.

```go
    all := slices.Collect(lst.All())
    fmt.Println("all:", all)

    for n := range genFib() {
```

بمجرد أن تصل الحلقة لـ `break` أو إرجاع مبكر، دالة `yield` الممرة للمكرر ستعيد `false`.

```go
        if n >= 10 {
            break
        }
        fmt.Println(n)
    }
}
```

تشغيل البرنامج:

```sh
$ go run range-over-iterators.go
10
13
23
all: [10 13 23]
1
1
2
3
5
8
```