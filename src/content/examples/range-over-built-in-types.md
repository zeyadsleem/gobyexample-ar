---
title: "التكرار عبر الأنواع المدمجة (Range)"
description: "استخدام range للتكرار عبر المصفوفات، الشرائح، الخرائط، والنصوص في لغة Go"
order: 11
---

*range* يقوم بالتكرار عبر العناصر في مجموعة متنوعة من هياكل البيانات المدمجة. دعونا نرى كيفية استخدام `range` مع بعض هياكل البيانات التي تعلمناها بالفعل.

```go
package main

import "fmt"

func main() {
```

هنا نستخدم `range` لجمع الأرقام في شريحة. المصفوفات تعمل بنفس الطريقة أيضاً.

```go
    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum:", sum)
```

`range` على المصفوفات والشرائح يوفر كلاً من الفهرس والقيمة لكل عنصر. في المثال أعلاه، لم نحتج إلى الفهرس، لذا تجاهلناه باستخدام المعرف الفارغ `_`. ولكن في بعض الأحيان قد نحتاج إلى الفهارس.

```go
    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }
```

`range` على الخرائط يقوم بالتكرار عبر أزواج المفتاح/القيمة.

```go
    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }
```

يمكن لـ `range` أيضاً التكرار عبر مفاتيح الخريطة فقط.

```go
    for k := range kvs {
        fmt.Println("key:", k)
    }
```

`range` على النصوص يقوم بالتكرار عبر نقاط كود Unicode. القيمة الأولى هي فهرس البايت الذي تبدأ عنده الـ `rune` والقيمة الثانية هي الـ `rune` نفسها. انظر درس "النصوص والرموز" لمزيد من التفاصيل.

```go
    for i, c := range "go" {
        fmt.Println(i, c)
    }
}
```

تشغيل البرنامج:

```sh
$ go run range-over-built-in-types.go
sum: 9
index: 1
a -> apple
b -> banana
key: a
key: b
0 103
1 111
```
