---
title: "حقبة يونكس"
description: "الحصول على الوقت المنقضي منذ حقبة يونكس (Unix Epoch) في لغة Go"
order: 58
---

أحد المتطلبات الشائعة في البرامج هو الحصول على عدد الثواني أو الملي ثانية أو النانو ثانية منذ [حقبة يونكس](https://en.wikipedia.org/wiki/Unix_time). إليك كيفية القيام بذلك في Go.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
```

استخدم `time.Now` مع `Unix` أو `UnixMilli` أو `UnixNano` للحصول على الوقت المنقضي منذ حقبة يونكس بالثواني أو الملي ثانية أو النانو ثانية، على التوالي.

```go
    now := time.Now()
    fmt.Println(now)

    fmt.Println(now.Unix())
    fmt.Println(now.UnixMilli())
    fmt.Println(now.UnixNano())
```

يمكنك أيضاً تحويل الأرقام الصحيحة للثواني أو النانو ثانية منذ الحقبة إلى الـ `time` المقابل.

```go
    fmt.Println(time.Unix(now.Unix(), 0))
    fmt.Println(time.Unix(0, now.UnixNano()))
}
```

تشغيل البرنامج:

```sh
$ go run epoch.go 
2012-10-31 16:13:58.292387 +0000 UTC
1351700038
1351700038292
1351700038292387000
2012-10-31 16:13:58 +0000 UTC
2012-10-31 16:13:58.292387 +0000 UTC
```
