---
title: "الملفات والمجلدات المؤقتة"
description: "إنشاء واستخدام الملفات والمجلدات المؤقتة في لغة Go"
order: 70
---

طوال دورة حياة البرنامج، قد نحتاج إلى إنشاء بيانات ليست بحاجة للاستمرار بعد انتهاء البرنامج. الملفات والمجلدات المؤقتة مفيدة لهذا الغرض.

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

أسهل طريقة لإنشاء ملف مؤقت هي باستخدام `os.CreateTemp`. ستقوم بإنشاء ملف وتفتحه للقراءة والكتابة. المعامل الأول هو المجلد (الفارغ يعني استخدام المجلد المؤقت الافتراضي للنظام).

```go
    f, err := os.CreateTemp("", "sample")
    check(err)
```

اطبع اسم الملف المؤقت.

```go
    fmt.Println("Temp file name:", f.Name())
```

احذف الملف عند الانتهاء.

```go
    defer os.Remove(f.Name())
```

يمكننا كتابة البيانات في الملف.

```go
    _, err = f.Write([]byte{1, 2, 3})
    check(err)
```

إذا كنا بحاجة لإنشاء العديد من الملفات المؤقتة، فقد نفضل إنشاء مجلد مؤقت كامل.

```go
    dname, err := os.MkdirTemp("", "sampledir")
    check(err)
    fmt.Println("Temp dir name:", dname)

    defer os.RemoveAll(dname)
```

الآن يمكننا إنشاء ملفات داخل المجلد المؤقت.

```go
    fname := filepath.Join(dname, "file1")
    err = os.WriteFile(fname, []byte{1, 2}, 0644)
    check(err)
}
```

تشغيل البرنامج:

```sh
$ go run temporary-files-and-directories.go
Temp file name: /tmp/sample31231
Temp dir name: /tmp/sampledir89342
```
