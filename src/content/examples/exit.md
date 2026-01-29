---
title: "الخروج (Exit)"
description: "إنهاء برنامج Go فوراً بحالة خروج (Exit status) محددة"
order: 84
---

استخدم `os.Exit` لإنهاء البرنامج فوراً بحالة خروج معينة.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
```

لن يتم تنفيذ عبارات `defer` عند استخدام `os.Exit` لذا فإن الـ `fmt.Println` هذه لن يتم استدعاؤها أبداً.

```go
    defer fmt.Println("!")
```

اخرج مع الحالة 3.

```go
    os.Exit(3)
}
```

لاحظ أنه على عكس لغات مثل C، لا تستخدم Go قيمة إرجاع عدد صحيح من `main` للإشارة إلى حالة الخروج. إذا كنت تريد الخروج بحالة غير صفرية، يجب عليك استدعاء `os.Exit`.

تشغيل البرنامج:

```sh
$ go run exit.go
exit status 3
```
