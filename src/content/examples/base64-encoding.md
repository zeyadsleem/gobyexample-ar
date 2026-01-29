---
title: "ترميز Base64"
description: "استخدام ترميز Base64 في لغة Go"
order: 64
---

تقدم Go دعماً مدمجاً لـ [*ترميز Base64*](https://en.wikipedia.org/wiki/Base64).

```go
package main

import (
    "encoding/base64"
    "fmt"
)

func main() {

    data := "abc123!?$*&()'-=@~"
```

إليك كيفية الترميز باستخدام الترميز القياسي.

```go
    sEnc := base64.StdEncoding.EncodeToString([]byte(data))
    fmt.Println(sEnc)
```

فك الترميز قد يعيد خطأ، لذا يجب التحقق منه.

```go
    sDec, _ := base64.StdEncoding.DecodeString(sEnc)
    fmt.Println(string(sDec))
    fmt.Println()
```

إليك مثال للترميز المتوافق مع روابط الـ URL.

```go
    uEnc := base64.URLEncoding.EncodeToString([]byte(data))
    fmt.Println(uEnc)
    uDec, _ := base64.URLEncoding.DecodeString(uEnc)
    fmt.Println(string(uDec))
}
```

تشغيل البرنامج:

```sh
$ go run base64-encoding.go
YWJjMTIzIT8kKiYoKSctPUB+
abc123!?$*&()'-=@~

YWJjMTIzIT8kKiYoKSctPUB-
abc123!?$*&()'-=@~
```
