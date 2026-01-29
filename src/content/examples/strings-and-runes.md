---
title: "النصوص والرموز (Strings and Runes)"
description: "التعامل مع النصوص، البايتات، والرموز (Unicode) في لغة Go"
order: 18
---

نص Go (string) هو شريحة للقراءة فقط من البايتات. تعامل اللغة والمكتبة القياسية النصوص بشكل خاص - كحاويات لنصوص مشفرة بـ [UTF-8](https://en.wikipedia.org/wiki/UTF-8). في لغات أخرى، تتكون النصوص من "شخصيات" (characters). في Go، يسمى مفهوم الشخصية `rune` - وهو عدد صحيح يمثل نقطة كود Unicode.

```go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
```

`s` هو نص تم تعيين قيمة له تمثل كلمة "hello" باللغة التايلاندية. نصوص Go المباشرة (literals) هي نصوص مشفرة بـ UTF-8.

```go
    const s = "สวัสดี"
```

بما أن النصوص تكافئ `[]byte` فإن هذا سينتج طول البايتات الخام المخزنة بداخلها.

```go
    fmt.Println("Len:", len(s))
```

الوصول للفهرس في نص ينتج قيم البايتات الخام عند كل فهرس. هذه الحلقة تولد قيم الـ hex لجميع البايتات التي تشكل نقاط الكود في `s`.

```go
    for i := 0; i < len(s); i++ {
        fmt.Printf("%x ", s[i])
    }
    fmt.Println()
```

لعد كم عدد الرموز (runes) الموجودة في نص، يمكننا استخدام حزمة `utf8`. لاحظ أن وقت تشغيل `RuneCountInString` يعتمد على حجم النص، لأنه يجب عليه فك تشفير كل رمز UTF-8 بالتتابع. بعض الشخصيات التايلاندية يتم تمثيلها بنقاط كود UTF-8 يمكن أن تمتد عبر عدة بايتات، لذا قد تكون نتيجة هذا العد مفاجئة.

```go
    fmt.Println("Rune count:", utf8.RuneCountInString(s))
```

حلقة `range` تتعامل مع النصوص بشكل خاص وتفك تشفير كل `rune` جنباً إلى جنب مع إزاحتها (offset) في النص.

```go
    for idx, runeValue := range s {
        fmt.Printf("%#U starts at %d\n", runeValue, idx)
    }
```

يمكننا تحقيق نفس التكرار باستخدام دالة `utf8.DecodeRuneInString` صراحة.

```go
    fmt.Println("\nUsing DecodeRuneInString")
    for i, w := 0, 0; i < len(s); i += w {
        runeValue, width := utf8.DecodeRuneInString(s[i:])
        fmt.Printf("%#U starts at %d\n", runeValue, i)
        w = width
        examineRune(runeValue)
    }
}

func examineRune(r rune) {
```

القيم المحاطة بعلامات اقتباس مفردة هي `rune literals`. يمكننا مقارنة قيمة `rune` بـ `rune literal` مباشرة.

```go
    if r == 't' {
        fmt.Println("found tee")
    } else if r == 'ส' {
        fmt.Println("found so sua")
    }
}
```

تشغيل البرنامج:

```sh
$ go run strings-and-runes.go
Len: 18
e0 b8 aa e0 b8 a7 e0 b8 b1 e0 b8 aa e0 b8 94 e0 b8 b5 
Rune count: 6
U+0E2A 'ส' starts at 0
U+0E27 'ว' starts at 3
U+0E31 'ั' starts at 6
U+0E2A 'ส' starts at 9
U+0E14 'د' starts at 12
U+0E35 'ี' starts at 15

Using DecodeRuneInString
U+0E2A 'ส' starts at 0
found so sua
U+0E27 'ว' starts at 3
U+0E31 'ั' starts at 6
U+0E2A 'ส' starts at 9
found so sua
U+0E14 'د' starts at 12
U+0E35 'ี' starts at 15
```
