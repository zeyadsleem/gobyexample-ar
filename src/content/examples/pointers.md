---
title: "المؤشرات (Pointers)"
description: "فهم واستخدام المؤشرات وتمرير المراجع في لغة Go"
order: 17
---

تدعم لغة Go [*المؤشرات*](https://en.wikipedia.org/wiki/Pointer_(computer_programming)) مما يسمح لك بتمرير مراجع للقيم والسجلات داخل برنامجك.

```go
package main

import "fmt"
```

سنوضح كيف تعمل المؤشرات مقارنة بالقيم باستخدام دالتين: `zeroval` و `zeroptr`. `zeroval` لها معامل من نوع `int` لذا سيتم تمرير المعاملات لها بالقيمة (by value). ستحصل `zeroval` على نسخة من `ival` مختلفة عن تلك الموجودة في الدالة المستدعية.

```go
func zeroval(ival int) {
    ival = 0
}
```

`zeroptr` في المقابل لها معامل من نوع `*int` مما يعني أنها تأخذ مؤشراً لـ `int`. كود `*iptr` داخل متن الدالة يقوم بـ "إلغاء المرجعية" (dereferences) للمؤشر من عنوان ذاكرته إلى القيمة الحالية الموجودة في ذلك العنوان. تعيين قيمة لمؤشر تم إلغاء مرجعيته يغير القيمة في العنوان المشار إليه.

```go
func zeroptr(iptr *int) {
    *iptr = 0
}

func main() {
    i := 1
    fmt.Println("initial:", i)

    zeroval(i)
    fmt.Println("zeroval:", i)
```

صيغة `&i` تعطي عنوان الذاكرة لـ `i` أي مؤشراً لـ `i`.

```go
    zeroptr(&i)
    fmt.Println("zeroptr:", i)
```

يمكن طباعة المؤشرات أيضاً.

```go
    fmt.Println("pointer:", &i)
}
```

دالة `zeroval` لا تغير قيمة `i` في `main` لأنها تعمل على نسخة، ولكن `zeroptr` تفعل ذلك لأنها تملك مرجعاً لعنوان الذاكرة لهذا المتغير.

تشغيل البرنامج:

```sh
$ go run pointers.go
initial: 1
zeroval: 1
zeroptr: 0
pointer: 0x42131100
```
