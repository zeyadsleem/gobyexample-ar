---
title: "كتابة الملفات"
description: "طرق مختلفة لكتابة الملفات في لغة Go"
order: 66
---

تتبع كتابة الملفات في Go أنماطاً مشابهة لتلك التي رأيناها في القراءة.

```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
```

للبدء، إليك كيفية كتابة سلسلة بايتات (أو نص) في ملف بالكامل.

```go
    d1 := []byte("hello\ngo\n")
    err := os.WriteFile("/tmp/dat1", d1, 0644)
    check(err)
```

لمزيد من التحكم، افتح ملفاً للكتابة.

```go
    f, err := os.Create("/tmp/dat2")
    check(err)
```

من الاصطلاحات الجيدة استخدام `defer` لإغلاق الملف.

```go
    defer f.Close()
```

يمكنك كتابة شرائح من البايتات كما تتوقع.

```go
    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
    fmt.Printf("wrote %d bytes\n", n2)
```

تتوفر دالة `WriteString` أيضاً للنصوص.

```go
    n3, err := f.WriteString("writes\n")
    check(err)
    fmt.Printf("wrote %d bytes\n", n3)
```

استخدم `Sync` للتأكد من كتابة البيانات فعلياً على القرص.

```go
    f.Sync()
```

يوفر `bufio` كتابة مؤقتة (buffered writer) بالإضافة إلى القارئ.

```go
    w := bufio.NewWriter(f)
    n4, err := w.WriteString("buffered\n")
    check(err)
    fmt.Printf("wrote %d bytes\n", n4)
```

استخدم `Flush` لضمان إرسال جميع العمليات المؤقتة إلى الكاتب الأساسي.

```go
    w.Flush()
}
```

تشغيل البرنامج:

```sh
$ go run writing-files.go
wrote 5 bytes
wrote 7 bytes
wrote 9 bytes
$ cat /tmp/dat1
hello
go
$ cat /tmp/dat2
some
writes
buffered
```
