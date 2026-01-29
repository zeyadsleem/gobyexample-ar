---
title: "مرحبًا بالعالم"
description: "أول برنامج Go لك"
order: 1
---

أول برنامج سنكتبه سيقوم بطباعة الرسالة الكلاسيكية "hello world". إليك الكود المصدري الكامل.

```go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

لتشغيل البرنامج، ضع الكود في ملف `hello-world.go` واستخدم `go run`.

```sh
$ go run hello-world.go
hello world
```

أحيانًا سنرغب في بناء برامجنا لتصبح ملفات ثنائية (binaries). يمكننا فعل ذلك باستخدام `go build`.

```sh
$ go build hello-world.go
$ ls
hello-world    hello-world.go
```

يمكننا بعد ذلك تنفيذ الملف الثنائي المبني مباشرة.

```sh
$ ./hello-world
hello world
```

الآن بعد أن أصبحنا قادرين على تشغيل وبناء برامج Go الأساسية، دعونا نتعلم المزيد عن اللغة.
