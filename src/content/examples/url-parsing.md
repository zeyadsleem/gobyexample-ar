---
title: "تحليل روابط URL"
description: "استخراج المكونات المختلفة من روابط URL في لغة Go"
order: 62
---

توفر الروابط (URLs) طريقة موحدة لتحديد مواقع الموارد. إليك كيفية تحليل الروابط في Go.

```go
package main

import (
    "fmt"
    "net"
    "net/url"
)

func main() {
```

سنقوم بتحليل هذا الرابط المثال، والذي يتضمن البروتوكول، معلومات المصادقة، المضيف، المنفذ، المسار، معاملات البحث، والوسم.

```go
    s := "postgres://user:pass@host.com:5432/path?k=v#f"
```

قم بتحليل الرابط وتأكد من عدم وجود أخطاء.

```go
    u, err := url.Parse(s)
    if err != nil {
        panic(err)
    }
```

الوصول إلى البروتوكول سهل جداً.

```go
    fmt.Println(u.Scheme)
```

`User` يحتوي على جميع معلومات المصادقة؛ استدعِ `Username` و `Password` للحصول على القيم الفردية.

```go
    fmt.Println(u.User)
    fmt.Println(u.User.Username())
    p, _ := u.User.Password()
    fmt.Println(p)
```

الـ `Host` يحتوي على كل من اسم المضيف والمنفذ إذا كان موجوداً. استخدم `SplitHostPort` لاستخراجهم.

```go
    fmt.Println(u.Host)
    host, port, _ := net.SplitHostPort(u.Host)
    fmt.Println(host)
    fmt.Println(port)
```

هنا نستخرج المسار والوسم (fragment) بعد '#'.

```go
    fmt.Println(u.Path)
    fmt.Println(u.Fragment)
```

للحصول على معاملات البحث بصيغة `k=v` استخدم `RawQuery`. يمكنك أيضاً تحليل معاملات البحث إلى خريطة (map). الخرائط الناتجة تكون من النصوص إلى شرائح من النصوص.

```go
    fmt.Println(u.RawQuery)
    m, _ := url.ParseQuery(u.RawQuery)
    fmt.Println(m)
    fmt.Println(m["k"][0])
}
```

تشغيل البرنامج:

```sh
$ go run url-parsing.go
postgres
user:pass
user
pass
host.com:5432
host.com
5432
/path
f
k=v
map[k:[v]]
v
```
