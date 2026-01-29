---
title: "بدء العمليات (Spawning Processes)"
description: "كيفية تشغيل برامج خارجية من داخل برنامج Go"
order: 81
---

أحياناً يحتاج برنامج Go الخاص بنا إلى تشغيل برامج أخرى ليست مكتوبة بـ Go.

```go
package main

import (
    "fmt"
    "io"
    "os/exec"
)

func main() {
```

سنبدأ بأمر بسيط لا يأخذ أي معاملات أو مدخلات ويطبع فقط في المخرجات القياسية. الأداة المساعدة `exec.Command` تنشئ كائناً يمثل هذه العملية الخارجية.

```go
    dateCmd := exec.Command("date")
```

`Output` هي دالة مساعدة أخرى تتعامل مع تشغيل الأمر، والانتظار حتى ينتهي، وجمع مخرجاته.

```go
    dateOut, err := dateCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> date")
    fmt.Println(string(dateOut))
```

إذا حدث خطأ أثناء تشغيل الأمر (مثلاً إذا خرج بحالة غير صفرية)، فسيتم إرجاع خطأ يحتوي على تفاصيل الخروج.

```go
    _, err = exec.Command("date", "-x").Output()
    if err != nil {
        fmt.Println("> date -x failed:", err)
    }
```

الآن سننظر في حالة أكثر تعقيداً حيث نقوم بضخ البيانات إلى العملية الخارجية عبر `stdin` وجمع النتائج من `stdout`.

```go
    grepCmd := exec.Command("grep", "hello")
```

هنا نستخرج صراحة أنابيب المدخلات والمخرجات.

```go
    grepIn, _ := grepCmd.StdinPipe()
    grepOut, _ := grepCmd.StdoutPipe()
    grepCmd.Start()
    grepIn.Write([]byte("hello grep\ngoodbye grep"))
    grepIn.Close()
    grepBytes, _ := io.ReadAll(grepOut)
    grepCmd.Wait()

    fmt.Println("> grep hello")
    fmt.Println(string(grepBytes))
```

لاحظ أننا عند تشغيل الأوامر نحتاج إلى تقديم الأمر والمعاملات بشكل منفصل. إذا كنت تريد تشغيل أمر كامل كنص، يمكنك استخدام خيار `-c` في `bash`.

```go
    lsCmd := exec.Command("bash", "-c", "ls -a -l -h")
    lsOut, err := lsCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> ls -a -l -h")
    fmt.Println(string(lsOut))
}
```

تشغيل البرنامج:

```sh
$ go run spawning-processes.go 
> date
Wed Aug 23 10:52:11 PDT 2023
...
```
