---
title: "تنسيق النصوص (String Formatting)"
description: "استخدام Printf لتنسيق النصوص والقيم في لغة Go"
order: 52
---
تقدم Go دعماً ممتازاً لتنسيق النصوص على غرار `printf`. إليك بعض الأمثلة لمهام تنسيق النصوص الشائعة.

```go
package main

import (
    "fmt"
    "os"
)

type point struct {
    x, y int
}

func main() {

    p := point{1, 2}
```

تقدم Go عدة "أفعال" (verbs) طباعة مصممة لتنسيق قيم Go العامة. على سبيل المثال، هذا يطبع مثيلاً من هيكل `point` الخاص بنا.

```go
    fmt.Printf("struct1: %v\n", p)
```

إذا كانت القيمة هيكلاً، فإن الصيغة `%+v` ستتضمن أسماء حقول الهيكل.

```go
    fmt.Printf("struct2: %+v\n", p)
```

الصيغة `%#v` تطبع تمثيلاً لصيغة Go للقيمة، أي مقتطف الكود المصدري الذي سينتج تلك القيمة.

```go
    fmt.Printf("struct3: %#v\n", p)
```

لطباعة نوع القيمة، استخدم `%T`.

```go
    fmt.Printf("type: %T\n", p)
```

تنسيق القيم المنطقية (booleans) بسيط ومباشر.

```go
    fmt.Printf("bool: %t\n", true)
```

هناك العديد من الخيارات لتنسيق الأرقام الصحيحة. استخدم `%d` للتنسيق العشري القياسي.

```go
    fmt.Printf("int: %d\n", 123)
```

هذا يطبع تمثيلاً ثنائياً (binary).

```go
    fmt.Printf("bin: %b\n", 14)
```

هذا يطبع الحرف المقابل للرقم الصحيح المعطى.

```go
    fmt.Printf("char: %c\n", 33)
```

`%x` توفر تشفيراً سداسي عشري (hex).

```go
    fmt.Printf("hex: %x\n", 456)
```

هناك أيضاً عدة خيارات لتنسيق الأرقام العشرية (floats). للتنسيق العشري الأساسي استخدم `%f`.

```go
    fmt.Printf("float1: %f\n", 78.9)
```

`%e` و `%E` تنسقان الرقم العشري بالترميز العلمي.

```go
    fmt.Printf("float2: %e\n", 123400000.0)
    fmt.Printf("float3: %E\n", 123400000.0)
```

لطباعة النصوص الأساسية استخدم `%s`.

```go
    fmt.Printf("str1: %s\n", "\"string\"")
```

لإضافة علامات اقتباس مزدوجة للنصوص كما في كود Go، استخدم `%q`.

```go
    fmt.Printf("str2: %q\n", "\"string\"")
```

كما هو الحال مع الأرقام الصحيحة، `%x` تعرض النص بالأساس 16.

```go
    fmt.Printf("str3: %x\n", "hex this")
```

لطباعة تمثيل لمؤشر (pointer)، استخدم `%p`.

```go
    fmt.Printf("pointer: %p\n", &p)
```

عند تنسيق الأرقام، ستحتاج غالباً للتحكم في عرض ودقة الرقم الناتج. لتحديد عرض رقم صحيح، استخدم رقماً بعد `%` في الفعل. افتراضياً، ستكون النتيجة محاذية لليمين ومملوءة بالمسافات.

```go
    fmt.Printf("width1: |%6d|%6d|\n", 12, 345)
```

يمكنك أيضاً تحديد عرض الأرقام العشرية المطبوعة، وغالباً ما ستحتاج أيضاً لتقييد الدقة العشرية في نفس الوقت.

```go
    fmt.Printf("width2: |%6.2f|%6.2f|\n", 1.2, 3.45)
```

للمحاذاة لليسار، استخدم علم `-`.

```go
    fmt.Printf("width3: |%-6.2f|%-6.2f|\n", 1.2, 3.45)
```

قد ترغب أيضاً في التحكم في العرض عند تنسيق النصوص، خاصة لضمان محاذاتها في مخرجات تشبه الجداول.

```go
    fmt.Printf("width4: |%6s|%6s|\n", "foo", "b")
    fmt.Printf("width5: |%-6s|%-6s|\n", "foo", "b")
```

حتى الآن رأينا `Printf` التي تطبع النص المنسق إلى `os.Stdout`. `Sprintf` تنسق وتعيد نصاً دون طباعته في أي مكان.

```go
    s := fmt.Sprintf("sprintf: a %s", "string")
    fmt.Println(s)
```

يمكنك التنسيق والطباعة إلى `io.Writers` أخرى غير `os.Stdout` باستخدام `Fprintf`.

```go
    fmt.Fprintf(os.Stderr, "io: an %s\n", "error")
}
```

تشغيل البرنامج:

```sh
$ go run string-formatting.go
struct1: {1 2}
struct2: {x:1 y:2}
struct3: main.point{x:1, y:2}
type: main.point
bool: true
int: 123
bin: 1110
char: !
hex: 1c8
float1: 78.900000
float2: 1.234000e+08
float3: 1.234000E+08
str1: "string"
str2: "\"string\""
str3: 6865782074686973
pointer: 0xc0000ba000
width1: |    12|   345|
width2: |  1.20|  3.45|
width3: |1.20  |3.45  |
width4: |   foo|     b|
width5: |foo   |b     |
sprintf: a string
io: an error
```
