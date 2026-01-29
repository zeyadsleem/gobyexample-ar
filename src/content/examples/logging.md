---
title: "التسجيل (Logging)"
description: "استخدام حزمة log لتسجيل المعلومات والأخطاء في لغة Go"
order: 77
---

توفر لغة Go حزم مدمجة للتسجيل (Logging). حزمة `log` مخصصة للتسجيل البسيط، وحزمة `log/slog` للتسجيل المهيكل (structured logging).

```go
package main

import (
    "bytes"
    "fmt"
    "log"
    "log/slog"
    "os"
)

func main() {
```

استدعاء `log.Println` يطبع في المسجل القياسي (standard logger).

```go
    log.Println("standard logger")
```

يمكن تخصيص المسجلات بالأعلام. بشكل افتراضي، المسجل يحتوي على التاريخ والوقت.

```go
    log.SetFlags(log.LstdFlags | log.Lshortfile)
    log.Println("with file and line number")
```

يدعم إنشاء مسجلات مخصصة وإرسالها لمخرجات مختلفة.

```go
    var buf bytes.Buffer
    mylog := log.New(&buf, "my: ", log.LstdFlags)
    mylog.Println("hello")
    fmt.Print("from mylog:", buf.String())
```

حزمة `slog` توفر تسجيلاً مهيكلاً بصيغة مفتاح=قيمة أو JSON.

```go
    slog.Info("hi there")
    slog.Info("hello", "count", 3)
```

للتسجيل بصيغة JSON.

```go
    jsonHandler := slog.NewJSONHandler(os.Stdout, nil)
    jsonLogger := slog.New(jsonHandler)
    jsonLogger.Info("hi in json", "user", "joe")
}
```

تشغيل البرنامج:

```sh
$ go run logging.go
2023/08/22 10:45:16 standard logger
logging.go:16: with file and line number
from mylog:my: 2023/08/22 10:45:16 hello
2023-08-22T10:45:16.892+02:00 INFO hi there
2023-08-22T10:45:16.892+02:00 INFO hello count=3
{"time":"2023-08-22T10:45:16.892+02:00","level":"INFO","msg":"hi in json","user":"joe"}
```
