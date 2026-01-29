---
title: "مسارات الملفات"
description: "التعامل مع مسارات الملفات بطريقة متوافقة مع أنظمة التشغيل المختلفة في لغة Go"
order: 68
---

توفر حزمة `path/filepath` وظائف للتعامل مع مسارات الملفات بطريقة تعمل عبر جميع أنظمة التشغيل (مثلاً Windows و Linux).

```go
package main

import (
    "fmt"
    "path/filepath"
    "strings"
)

func main() {
```

يجب استخدام `Join` لتركيب المسارات بطريقة محمولة. تقوم الدالة بإضافة الفواصل اللازمة وتنظيف المسار.

```go
    p := filepath.Join("dir1", "dir2", "filename")
    fmt.Println("p:", p)
```

استخدم `Join` دائماً بدلاً من دمج النصوص يدوياً.

```go
    fmt.Println(filepath.Join("dir1//", "filename"))
    fmt.Println(filepath.Join("dir1/../dir1", "filename"))
```

يمكن استخدام `Dir` و `Base` لتقسيم المسار إلى المجلد واسم الملف.

```go
    fmt.Println("Dir(p):", filepath.Dir(p))
    fmt.Println("Base(p):", filepath.Base(p))
```

يمكننا التحقق مما إذا كان المسار مطلقاً.

```go
    fmt.Println(filepath.IsAbs("dir/file"))
    fmt.Println(filepath.IsAbs("/dir/file"))
```

اسم ملف للمثال.

```go
    filename := "config.json"
```

`Ext` تعيد الامتداد (بما في ذلك النقطة).

```go
    ext := filepath.Ext(filename)
    fmt.Println(ext)
```

للحصول على اسم الملف بدون الامتداد.

```go
    fmt.Println(strings.TrimSuffix(filename, ext))
```

`Rel` تجد مساراً نسبياً بين هدف وقاعدة (base).

```go
    rel, err := filepath.Rel("a/b", "a/b/t/file")
    if err != nil {
        panic(err)
    }
    fmt.Println(rel)

    rel, err = filepath.Rel("a/b", "a/c/t/file")
    if err != nil {
        panic(err)
    }
    fmt.Println(rel)
}
```

تشغيل البرنامج:

```sh
$ go run file-paths.go
p: dir1/dir2/filename
dir1/filename
dir1/filename
Dir(p): dir1/dir2
Base(p): filename
false
true
.json
config
t/file
../c/t/file
```
