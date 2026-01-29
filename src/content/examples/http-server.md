---
title: "خادم HTTP"
description: "بناء خادم ويب بسيط باستخدام حزمة net/http في لغة Go"
order: 79
---

كتابة خادم HTTP أساسي سهلة للغاية باستخدام حزمة `net/http`.

```go
package main

import (
    "fmt"
    "net/http"
)
```

مفهوم مركزي في خوادم `net/http` هو "المعالجات" (handlers). المعالج هو كائن يطبق واجهة `http.Handler`. الطريقة الشائعة لكتابة معالج هي استخدام الدالة `http.HandlerFunc` مع توقيع الدالة المناسب.

```go
func hello(w http.ResponseWriter, req *http.Request) {
```

الدوال التي تعمل كمعالجات تأخذ `http.ResponseWriter` و `http.Request` كمعاملات. يستخدم كاتب الرد لإرسال بيانات رد الـ HTTP.

```go
    fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {
```

هذا المعالج يقرأ جميع ترويسات طلب الـ HTTP ويعيدها في جسم الرد.

```go
    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\n", name, h)
        }
    }
}

func main() {
```

نقوم بتسجيل معالجاتنا في مسارات الخادم باستخدام `http.HandleFunc`. يقوم بضبط "الموجه" (router) الافتراضي في حزمة `net/http`.

```go
    http.HandleFunc("/hello", hello)
    http.HandleFunc("/headers", headers)
```

أخيراً، نستدعي `ListenAndServe` مع المنفذ والمعالج (`nil` هنا يعني استخدام الموجه الافتراضي).

```go
    http.ListenAndServe(":8090", nil)
}
```

قم بتشغيل الخادم في الخلفية:

```sh
$ go run http-server.go &
```

ثم قم بطلب المسار `/hello`:

```sh
$ curl localhost:8090/hello
hello
```
