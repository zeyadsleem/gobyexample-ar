---
title: "المجلدات"
description: "العمل مع المجلدات في لغة Go"
order: 69
---

تحتوي Go على العديد من الدوال المفيدة للعمل مع المجلدات في نظام الملفات.

```go
package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
```

إنشاء مجلد جديد في المسار الحالي.

```go
    err := os.Mkdir("subdir", 0755)
    check(err)
```

عند إنشاء مجلدات مؤقتة، من الجيد استخدام `defer` لحذفها.

```go
    defer os.RemoveAll("subdir")
```

دالة مساعدة لإنشاء ملفات فارغة.

```go
    createEmptyFile := func(name string) {
        d := []byte("")
        check(os.WriteFile(name, d, 0644))
    }

    createEmptyFile("subdir/file1")
```

يمكننا إنشاء تسلسل من المجلدات المتداخلة.

```go
    err = os.MkdirAll("subdir/parent/child", 0755)
    check(err)

    createEmptyFile("subdir/parent/file2")
    createEmptyFile("subdir/parent/file3")
    createEmptyFile("subdir/parent/child/file4")
```

`ReadDir` تسرد محتويات مجلد ما، وتعيد شريحة من كائنات `os.DirEntry`.

```go
    c, err := os.ReadDir("subdir")
    check(err)

    fmt.Println("Listing subdir")
    for _, entry := range c {
        fmt.Println(" ", entry.Name(), entry.IsDir())
    }
```

`Chdir` تسمح لنا بتغيير مجلد العمل الحالي.

```go
    err = os.Chdir("subdir/parent/child")
    check(err)
```

الآن نرى محتويات المجلد الحالي.

```go
    c, err = os.ReadDir(".")
    check(err)

    fmt.Println("Listing subdir/parent/child")
    for _, entry := range c {
        fmt.Println(" ", entry.Name(), entry.IsDir())
    }
```

العودة إلى المجلد الأصلي.

```go
    err = os.Chdir("../../..")
    check(err)
```

يمكننا أيضاً "زيارة" (walk) المجلد وجميع مجلداته الفرعية بشكل تكراري.

```go
    fmt.Println("Walking subdir")
    err = filepath.Walk("subdir", visit)
}
```

يتم استدعاء هذه الدالة لكل ملف أو مجلد يتم العثور عليه أثناء `Walk`.

```go
func visit(p string, info os.FileInfo, err error) error {
    if err != nil {
        return err
    }
    fmt.Println(" ", p, info.IsDir())
    return nil
}
```

تشغيل البرنامج:

```sh
$ go run directories.go
Listing subdir
  file1 false
  parent true
Listing subdir/parent/child
  file4 false
Walking subdir
  subdir true
  subdir/file1 false
  subdir/parent true
  subdir/parent/child true
  subdir/parent/child/file4 false
  subdir/parent/file2 false
  subdir/parent/file3 false
```
