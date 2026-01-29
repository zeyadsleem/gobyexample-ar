---
title: "الأرقام العشوائية"
description: "توليد الأرقام العشوائية في لغة Go"
order: 60
---

تقدم حزمة `math/rand/v2` في Go مولدات أرقام عشوائية زائفة (pseudo-random).

```go
package main

import (
    "fmt"
    "math/rand/v2"
)

func main() {
```

`rand.IntN` يعيد عدداً صحيحاً عشوائياً n حيث `0 <= n < 100`.

```go
    fmt.Print(rand.IntN(100), ",")
    fmt.Print(rand.IntN(100))
    fmt.Println()
```

`rand.Float64` يعيد عدداً عشورياً عشوائياً f حيث `0.0 <= f < 1.0`.

```go
    fmt.Println(rand.Float64())
```

يمكن استخدام هذا لتوليد أرقام عشوائية في نطاق معين، مثلاً `5.0 <= f < 10.0`.

```go
    fmt.Print((rand.Float64() * 5) + 5, ",")
    fmt.Print((rand.Float64() * 5) + 5)
    fmt.Println()
```

إذا كنت تريد مولداً للأرقام العشوائية مع "بذرة" (seed) محددة لإنتاج تسلسل يمكن التنبؤ به، استخدم `rand.NewPCG`.

```go
    s1 := rand.NewPCG(42, 1024)
    r1 := rand.New(s1)
    fmt.Print(r1.IntN(100), ",")
    fmt.Print(r1.IntN(100))
    fmt.Println()
```

استخدام نفس البذرة سينتج نفس الأرقام.

```go
    s2 := rand.NewPCG(42, 1024)
    r2 := rand.New(s2)
    fmt.Print(r2.IntN(100), ",")
    fmt.Print(r2.IntN(100))
    fmt.Println()
}
```

تشغيل البرنامج:

```sh
$ go run random-numbers.go
81,87
0.664560053216159
7.123125646118147,8.434115364354557
94,49
94,49
```

راجع توثيق حزمة `math/rand/v2` لمزيد من الدوال العشوائية المتوفرة.
