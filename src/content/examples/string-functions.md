---
title: "دوال النصوص (String Functions)"
description: "استعراض لبعض الدوال المفيدة في حزمة strings للتعامل مع النصوص في لغة Go"
order: 51
---

توفر حزمة `strings` في المكتبة القياسية العديد من الدوال المفيدة المتعلقة بالنصوص. إليك بعض الأمثلة لتعطيك فكرة عن الحزمة.

```go
package main

import (
    "fmt"
    s "strings"
)
```

نعطي اسماً مستعاراً لـ `fmt.Println` ليكون أقصر لأننا سنستخدمه كثيراً أدناه.

```go
var p = fmt.Println

func main() {
```

إليك عينة من الدوال المتوفرة في `strings`. بما أن هذه دوال من الحزمة، وليست دوال تابعة للكائن النصي نفسه، فنحن بحاجة لتمرير النص المعني كمعامل أول للدالة. يمكنك العثور على مزيد من الدوال في توثيق حزمة `strings`.

```go
    p("Contains:  ", s.Contains("test", "es"))
    p("Count:     ", s.Count("test", "t"))
    p("HasPrefix: ", s.HasPrefix("test", "te"))
    p("HasSuffix: ", s.HasSuffix("test", "st"))
    p("Index:     ", s.Index("test", "e"))
    p("Join:      ", s.Join([]string{"a", "b"}, "-"))
    p("Repeat:    ", s.Repeat("a", 5))
    p("Replace:   ", s.Replace("foo", "o", "0", -1))
    p("Replace:   ", s.Replace("foo", "o", "0", 1))
    p("Split:     ", s.Split("a-b-c-d-e", "-"))
    p("ToLower:   ", s.ToLower("TEST"))
    p("ToUpper:   ", s.ToUpper("test"))
}
```

تشغيل البرنامج:

```sh
$ go run string-functions.go
Contains:   true
Count:      2
HasPrefix:  true
HasSuffix:  true
Index:      1
Join:       a-b
Repeat:     aaaaa
Replace:    f00
Replace:    f0o
Split:      [a b c d e]
ToLower:    test
ToUpper:    TEST
```
