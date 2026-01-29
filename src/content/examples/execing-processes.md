---
title: "استبدال العملية (Exec'ing Processes)"
description: "استخدام syscall.Exec لاستبدال عملية Go الحالية بعملية أخرى"
order: 82
---

في المثال السابق نظرنا في بدء العمليات الخارجية. في بعض الأحيان نريد استبدال عملية Go الحالية بعملية أخرى تماماً (ربما غير مكتوبة بـ Go). للقيام بذلك، سنستخدم تطبيق Go لدالة `exec` الكلاسيكية.

```go
package main

import (
    "os"
    "os/exec"
    "syscall"
)

func main() {
```

لمثالنا سنقوم بتنفيذ الأمر `ls`. تتطلب Go مساراً مطلقاً للبرنامج الذي نريد تنفيذه، لذا سنستخدم `exec.LookPath` للعثور عليه (عادةً `/bin/ls`).

```go
    binary, lookErr := exec.LookPath("ls")
    if lookErr != nil {
        panic(lookErr)
    }
```

يتطلب `Exec` المعاملات في شكل شريحة (slice). لاحظ أن المعامل الأول يجب أن يكون اسم البرنامج نفسه.

```go
    args := []string{"ls", "-a", "-l", "-h"}
```

يحتاج `Exec` أيضاً إلى مجموعة من متغيرات البيئة لاستخدامها. هنا سنمرر فقط البيئة الحالية لعمليتنا.

```go
    env := os.Environ()
```

هنا استدعاء `syscall.Exec` الفعلي. إذا نجح هذا الاستدعاء، فإن تنفيذ برنامجنا سينتهي هنا وسيتم استبداله بعملية `/bin/ls`. إذا حدث خطأ، فسنحصل على قيمة مرجعة.

```go
    execErr := syscall.Exec(binary, args, env)
    if execErr != nil {
        panic(execErr)
    }
}
```

عند تشغيل برنامجنا، سيتم استبداله بـ `ls`. لاحظ أن Go لا توفر دالة `fork` كلاسيكية كما في Unix؛ عادةً ما يكون بدء الـ goroutines وبدء العمليات الخارجية كافياً لمعظم حالات الاستخدام.

تشغيل البرنامج:

```sh
$ go run execing-processes.go
total 16
drwxr-xr-x  4 user group 4096 Aug 23 11:01 .
drwxr-xr-x 10 user group 4096 Aug 23 11:01 ..
-rw-r--r--  1 user group  400 Aug 23 11:01 execing-processes.go
```
