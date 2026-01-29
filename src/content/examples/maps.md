---
title: "الخرائط (Maps)"
description: "تعريف واستخدام الخرائط (associative arrays) في لغة Go"
order: 10
---

*الخرائط* (Maps) هي النوع المدمج في Go للتعامل مع [البيانات المترابطة](https://en.wikipedia.org/wiki/Associative_array).

```go
package main

import (
    "fmt"
    "maps"
)

func main() {
```

لإنشاء خريطة فارغة، استخدم الدالة المدمجة `make`: `make(map[key-type]val-type)`.

```go
    m := make(map[string]int)
```

تعيين أزواج المفتاح/القيمة (key/value) باستخدام صيغة `name[key] = val` التقليدية.

```go
    m["k1"] = 7
    m["k2"] = 13
```

طباعة الخريطة باستخدام `fmt.Println` ستظهر جميع أزواج المفتاح/القيمة الموجودة بها.

```go
    fmt.Println("map:", m)
```

الحصول على قيمة لمفتاح معين باستخدام `name[key]`.

```go
    v1 := m["k1"]
    fmt.Println("v1:", v1)
```

إذا كان المفتاح غير موجود، يتم إرجاع القيمة الصفرية (zero value) لنوع القيمة.

```go
    v3 := m["k3"]
    fmt.Println("v3:", v3)
```

الدالة المدمجة `len` تعيد عدد أزواج المفتاح/القيمة عند استدعائها على خريطة.

```go
    fmt.Println("len:", len(m))
```

الدالة المدمجة `delete` تحذف أزواج المفتاح/القيمة من الخريطة.

```go
    delete(m, "k2")
    fmt.Println("map:", m)
```

لإزالة *جميع* أزواج المفتاح/القيمة من الخريطة، استخدم الدالة المدمجة `clear`.

```go
    clear(m)
    fmt.Println("map:", m)
```

القيمة الثانية الاختيارية التي يتم إرجاعها عند الحصول على قيمة من خريطة تشير إلى ما إذا كان المفتاح موجوداً في الخريطة أم لا. يمكن استخدام هذا للتمييز بين المفاتيح المفقودة والمفاتيح التي قيمتها صفرية مثل `0` أو `""`. هنا لم نحتج للقيمة نفسها، لذا تجاهلناها باستخدام المعرف الفارغ `_`.

```go
    _, prs := m["k2"]
    fmt.Println("prs:", prs)
```

يمكنك أيضاً التصريح عن خريطة جديدة وتهيئتها في نفس السطر بهذه الصيغة.

```go
    n := map[string]int{"foo": 1, "bar": 2}
    fmt.Println("map:", n)
```

تحتوي حزمة `maps` على عدد من الدوال المفيدة للخرائط.

```go
    n2 := map[string]int{"foo": 1, "bar": 2}
    if maps.Equal(n, n2) {
        fmt.Println("n == n2")
    }
}
```

لاحظ أن الخرائط تظهر بصيغة `map[k:v k:v]` عند طباعتها باستخدام `fmt.Println`.

تشغيل البرنامج:

```sh
$ go run maps.go 
map: map[k1:7 k2:13]
v1: 7
v3: 0
len: 2
map: map[k1:7]
map: map[]
prs: false
map: map[bar:2 foo:1]
n == n2
```
