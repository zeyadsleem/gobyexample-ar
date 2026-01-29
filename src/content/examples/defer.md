---
title: "التأجيل (Defer)"
description: "استخدام defer لضمان تنفيذ استدعاءات الدوال لاحقاً (للتنظيف مثلاً) في لغة Go"
order: 49
---

يُستخدم *التأجيل* (Defer) لضمان إجراء استدعاء دالة لاحقاً في تنفيذ البرنامج، عادةً لأغراض التنظيف. غالباً ما يُستخدم `defer` حيث يتم استخدام `ensure` و `finally` في لغات أخرى.

```go
package main

import (
    "fmt"
    "os"
    "path/filepath"
)
```

لنفترض أننا أردنا إنشاء ملف، والكتابة فيه، ثم إغلاقه عند الانتهاء. إليك كيف يمكننا فعل ذلك باستخدام `defer`.

```go
func main() {
```

مباشرة بعد الحصول على كائن الملف باستخدام `createFile` نقوم بتأجيل إغلاق ذلك الملف باستخدام `closeFile`. سيتم تنفيذ ذلك في نهاية الدالة المحيطة (main)، بعد انتهاء `writeFile`.

```go
    path := filepath.Join(os.TempDir(), "defer.txt")
    f := createFile(path)
    defer closeFile(f)
    writeFile(f)
}

func createFile(p string) *os.File {
    fmt.Println("جاري الإنشاء")
    f, err := os.Create(p)
    if err != nil {
        panic(err)
    }
    return f
}

func writeFile(f *os.File) {
    fmt.Println("جاري الكتابة")
    fmt.Fprintln(f, "بيانات")
}
```

من المهم التحقق من الأخطاء عند إغلاق الملف، حتى في دالة مؤجلة.

```go
func closeFile(f *os.File) {
    fmt.Println("جاري الإغلاق")
    err := f.Close()

    if err != nil {
        panic(err)
    }
}
```

تشغيل البرنامج يؤكد أن الملف يتم إغلاقه بعد كتابته.

```go
```

تشغيل البرنامج:

```sh
$ go run defer.go
جاري الإنشاء
جاري الكتابة
جاري الإغلاق
```
