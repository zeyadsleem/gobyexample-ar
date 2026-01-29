---
title: "إرجاع قيم متعددة (Multiple Return Values)"
description: "كيفية إرجاع أكثر من قيمة من دالة واحدة في لغة Go"
order: 13
---

تدعم لغة Go بشكل مدمج *إرجاع قيم متعددة* (multiple return values). تُستخدم هذه الميزة غالباً في كود Go النموذجي، على سبيل المثال لإرجاع كل من النتيجة وقيمة الخطأ من الدالة.

```go
package main

import "fmt"
```

الـ `(int, int)` في توقيع هذه الدالة يوضح أنها تعيد عددين صحيحين.

```go
func vals() (int, int) {
    return 3, 7
}

func main() {
```

هنا نستخدم قيمتي الإرجاع المختلفتين من الاستدعاء باستخدام 'التعيين المتعدد' (multiple assignment).

```go
    a, b := vals()
    fmt.Println(a)
    fmt.Println(b)
```

إذا كنت تريد فقط جزءاً من القيم المرتجعة، استخدم المعرف الفارغ `_`.

```go
    _, c := vals()
    fmt.Println(c)
}
```

إن قبول عدد متغير من المعاملات ميزة أخرى لطيفة في دوال Go؛ سننظر في ذلك لاحقاً.

تشغيل البرنامج:

```sh
$ go run multiple-return-values.go
3
7
7
```
