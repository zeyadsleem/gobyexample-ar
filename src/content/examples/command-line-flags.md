---
title: "أعلام سطر الأوامر"
description: "استخدام حزمة flag لمعالجة الأعلام (Flags) في سطر الأوامر في لغة Go"
order: 74
---

[*أعلام سطر الأوامر*](https://en.wikipedia.org/wiki/Command-line_interface#Options) هي طريقة شائعة لتحديد خيارات لبرامج سطر الأوامر. مثلاً، في `wc -l` يعتبر `-l` علماً لبرنامج `wc`.

```go
package main

import (
    "flag"
    "fmt"
)

func main() {
```

تتوفر تصريحات الأعلام الأساسية للأنواع `string` و `boolean` و `integer`. هنا نصرح عن علم `word` بقيمة افتراضية "foo" ووصف قصير. تعيد الدالة `flag.String` مؤشراً لنص (وليس قيمة نصية).

```go
    wordPtr := flag.String("word", "foo", "a string")
```

هذا يصرح عن أعلام `numb` و `fork` باستخدام نهج مشابه.

```go
    numbPtr := flag.Int("numb", 42, "an int")
    forkPtr := flag.Bool("fork", false, "a bool")
```

من الممكن أيضاً التصريح عن خيار يستخدم متغيراً موجوداً بالفعل. لاحظ أننا نحتاج لتمرير مؤشر للمتغير.

```go
    var svar string
    flag.StringVar(&svar, "svar", "bar", "a string var")
```

بمجرد التصريح عن جميع الأعلام، استدعِ `flag.Parse()` لتنفيذ تحليل سطر الأوامر.

```go
    flag.Parse()
```

هنا سنطبع الخيارات المحللة وأي معاملات إضافية. لاحظ أننا نحتاج لإلغاء مرجعية المؤشرات للحصول على القيم الفعلية.

```go
    fmt.Println("word:", *wordPtr)
    fmt.Println("numb:", *numbPtr)
    fmt.Println("fork:", *forkPtr)
    fmt.Println("svar:", svar)
    fmt.Println("tail:", flag.Args())
}
```

لتجربة البرنامج:

```sh
$ go build command-line-flags.go
$ ./command-line-flags -word=opt -numb=7 -fork -svar=flag
word: opt
numb: 7
fork: true
svar: flag
tail: []
```
