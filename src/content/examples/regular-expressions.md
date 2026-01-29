---
title: "التعبيرات النمطية (Regular Expressions)"
description: "استخدام حزمة regexp للتعامل مع التعبيرات النمطية في لغة Go"
order: 54
---
تقدم Go دعماً مدمجاً لـ [التعبيرات النمطية](https://en.wikipedia.org/wiki/Regular_expression). إليك بعض الأمثلة للمهام الشائعة المتعلقة بـ `regexp` في Go.

```go
package main

import (
    "bytes"
    "fmt"
    "regexp"
)

func main() {
```

هذا يختبر ما إذا كان النمط يطابق النص.

```go
    match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
    fmt.Println(match)
```

أعلاه استخدمنا نمطاً نصياً مباشرة، ولكن لمهام التعبيرات النمطية الأخرى ستحتاج إلى `Compile` هيكل `Regexp` محسن.

```go
    r, _ := regexp.Compile("p([a-z]+)ch")
```

تتوفر العديد من الدوال التابعة لهذه الهياكل. إليك اختبار مطابقة كما رأينا سابقاً.

```go
    fmt.Println(r.MatchString("peach"))
```

هذا يجد المطابقة للتعبير النمطي.

```go
    fmt.Println(r.FindString("peach punch"))
```

هذا أيضاً يجد أول مطابقة ولكنه يعيد فهارس البداية والنهاية للمطابقة بدلاً من النص المطابق.

```go
    fmt.Println("idx:", r.FindStringIndex("peach punch"))
```

متغيرات `Submatch` تتضمن معلومات حول كل من مطابقة النمط الكامل والمطابقات الفرعية داخل تلك المطابقات. على سبيل المثال، هذا سيعيد معلومات لكل من `p([a-z]+)ch` و `([a-z]+)`.

```go
    fmt.Println(r.FindStringSubmatch("peach punch"))
```

وبالمثل، هذا سيعيد معلومات حول فهارس المطابقات والمطابقات الفرعية.

```go
    fmt.Println(r.FindStringSubmatchIndex("peach punch"))
```

متغيرات `All` من هذه الدوال تنطبق على جميع المطابقات في المدخلات، وليس فقط الأولى. على سبيل المثال للعثور على جميع مطابقات تعبير نمطي.

```go
    fmt.Println(r.FindAllString("peach punch pinch", -1))
```

تتوفر متغيرات `All` هذه للدوال الأخرى التي رأيناها أعلاه أيضاً.

```go
    fmt.Println("all:", r.FindAllStringSubmatchIndex(
        "peach punch pinch", -1))
```

تقديم رقم صحيح غير سالب كمعامل ثانٍ لهذه الدوال سيحدد عدد المطابقات.

```go
    fmt.Println(r.FindAllString("peach punch pinch", 2))
```

كانت لأمثلتنا أعلاه معاملات نصية واستخدمت أسماء مثل `MatchString`. يمكننا أيضاً تقديم معاملات `[]byte` وإسقاط `String` من اسم الدالة.

```go
    fmt.Println(r.Match([]byte("peach")))
```

عند إنشاء متغيرات عالمية مع التعبيرات النمطية، يمكنك استخدام متغير `MustCompile` من `Compile`. `MustCompile` يذعر (panics) بدلاً من إرجاع خطأ، مما يجعله أكثر أماناً للاستخدام مع المتغيرات العالمية.

```go
    r = regexp.MustCompile("p([a-z]+)ch")
    fmt.Println("regexp:", r)
```

يمكن استخدام حزمة `regexp` أيضاً لاستبدال أجزاء من النصوص بقيم أخرى.

```go
    fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))
```

متغير `Func` يسمح لك بتحويل النص المطابق باستخدام دالة معطاة.

```go
    in := []byte("a peach")
    out := r.ReplaceAllFunc(in, bytes.ToUpper)
    fmt.Println(string(out))
}
```

تشغيل البرنامج:

```sh
$ go run regular-expressions.go
true
true
peach
idx: [0 5]
[peach ea]
[0 5 1 3]
[peach punch pinch]
all: [[0 5 1 3] [6 11 7 9] [12 17 13 15]]
[peach punch]
true
regexp: p([a-z]+)ch
a <fruit>
a PEACH
```
