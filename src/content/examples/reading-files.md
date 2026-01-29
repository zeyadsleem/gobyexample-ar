---
title: "قراءة الملفات"
description: "طرق مختلفة لقراءة الملفات في لغة Go"
order: 65
---

تعد قراءة الملفات من العمليات الأساسية في أي لغة برمجة. توفر Go عدة طرق للقيام بذلك، من قراءة الملف بالكامل إلى القراءة المجزأة للأداء العالي.

```go
package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
)
```

التحقق من الأخطاء هو نمط شائع في Go.

```go
func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
```

أبسط طريقة لقراءة ملف بالكامل في الذاكرة.

```go
    dat, err := os.ReadFile("/tmp/dat")
    check(err)
    fmt.Print(string(dat))
```

ستحتاج غالباً لمزيد من التحكم في كيفية قراءة أجزاء من الملف. ابدأ بفتح الملف للحصول على قيمة `*os.File`.

```go
    f, err := os.Open("/tmp/dat")
    check(err)
```

قراءة بعض البايتات من بداية الملف. يسمح لك بتحديد حد أقصى (هنا 5 بايتات).

```go
    b1 := make([]byte, 5)
    n1, err := f.Read(b1)
    check(err)
    fmt.Printf("%d bytes: %s\n", n1, string(b1[:n1]))
```

يمكنك أيضاً استخدام `Seek` للانتقال لموقع معروف والقراءة منه.

```go
    o2, err := f.Seek(6, io.SeekStart)
    check(err)
    b2 := make([]byte, 2)
    n2, err := f.Read(b2)
    check(err)
    fmt.Printf("%d bytes @ %d: ", n2, o2)
    fmt.Printf("%v\n", string(b2[:n2]))
```

توفر حزمة `io` بعض الدوال المفيدة للقراءة. مثلاً، `ReadAtLeast` لضمان قراءة عدد معين من البايتات.

```go
    o3, err := f.Seek(6, io.SeekStart)
    check(err)
    b3 := make([]byte, 2)
    n3, err := io.ReadAtLeast(f, b3, 2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))
```

لا يوجد دالة "ترجيع" (rewind) مدمجة، ولكن `Seek(0, io.SeekStart)` تقوم بذلك.

```go
    _, err = f.Seek(0, io.SeekStart)
    check(err)
```

حزمة `bufio` توفر قارئاً مؤقتاً (buffered reader)، وهو مفيد للكفاءة عند القراءات الصغيرة المتعددة.

```go
    r4 := bufio.NewReader(f)
    b4, err := r4.Peek(5)
    check(err)
    fmt.Printf("5 bytes: %s\n", string(b4))
```

أغلق الملف دائماً عند الانتهاء (عادةً ما يتم ذلك باستخدام `defer` بعد `Open`).

```go
    f.Close()
}
```

تشغيل البرنامج (بافتراض وجود ملف في `/tmp/dat`):

```sh
$ echo "hello go" > /tmp/dat
$ go run reading-files.go
hello go
5 bytes: hello
2 bytes @ 6: go
2 bytes @ 6: go
5 bytes: hello
```
