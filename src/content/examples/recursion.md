---
title: "التكرار (Recursion)"
description: "تعريف واستخدام الدوال التكرارية في لغة Go"
order: 16
---

تدعم لغة Go [*الدوال التكرارية*](https://en.wikipedia.org/wiki/Recursion_(computer_science)). إليك مثال كلاسيكي لحساب المضروب (factorial).

```go
package main

import "fmt"
```

هذه دالة `fact` تستدعي نفسها حتى تصل إلى الحالة الأساسية (base case) وهي `fact(0)`.

```go
func fact(n int) int {
    if n == 0 {
        return 1
    }
    return n * fact(n-1)
}

func main() {
    fmt.Println(fact(7))
```

يمكن للدوال المجهولة أيضاً أن تكون تكرارية، ولكن هذا يتطلب التصريح صراحة عن متغير باستخدام `var` لتخزين الدالة قبل تعريفها.

```go
    var fib func(n int) int

    fib = func(n int) int {
        if n < 2 {
            return n
        }
```

بما أن `fib` تم التصريح عنها مسبقاً في `main` تعرف Go أي دالة يجب استدعاؤها باستخدام `fib` هنا.

```go
        return fib(n-1) + fib(n-2)
    }

    fmt.Println(fib(7))
}
```

تشغيل البرنامج:

```sh
$ go run recursion.go 
5040
13
```
