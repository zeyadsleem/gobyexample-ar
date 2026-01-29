---
title: "عميل HTTP"
description: "إرسال طلبات HTTP باستخدام حزمة net/http في لغة Go"
order: 78
---

تحتوي مكتبة Go القياسية على دعم ممتاز لعملاء وخوادم HTTP في حزمة `net/http`. في هذا المثال، سنستخدمها لإرسال طلب HTTP بسيط.

```go
package main

import (
    "bufio"
    "fmt"
    "net/http"
)

func main() {
```

إرسال طلب HTTP GET إلى خادم. `http.Get` هي وسيلة مريحة لإنشاء كائن `http.Client` واستدعاء دالة `Get` عليه.

```go
    resp, err := http.Get("https://gobyexample.com")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
```

اطبع حالة رد خادم الـ HTTP.

```go
    fmt.Println("Response status:", resp.Status)
```

اطبع أول 5 سطور من جسم الرد.

```go
    scanner := bufio.NewScanner(resp.Body)
    for i := 0; scanner.Scan() && i < 5; i++ {
        fmt.Println(scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        panic(err)
    }
}
```

تشغيل البرنامج:

```sh
$ go run http-client.go
Response status: 200 OK
<!DOCTYPE html>
<html>
...
```
