---
title: "بيانات JSON"
description: "تشفير وفك تشفير بيانات JSON في لغة Go باستخدام حزمة encoding/json"
order: 55
---

تقدم Go دعماً مدمجاً لتشفير (encoding) وفك تشفير (decoding) بيانات JSON، بما في ذلك التحويل من وإلى أنواع البيانات المدمجة والمخصصة.

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
    "strings"
)
```

سنستخدم هذين الهيكلين لتوضيح تشفير وفك تشفير الأنواع المخصصة أدناه.

```go
type response1 struct {
    Page   int
    Fruits []string
}
```

سيتم تشفير/فك تشفير الحقول المصدرة (exported) فقط في JSON. يجب أن تبدأ الحقول بأحرف كبيرة لتكون مصدرة.

```go
type response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}

func main() {
```

أولاً سننظر في تشفير أنواع البيانات الأساسية إلى نصوص JSON. إليك بعض الأمثلة للقيم الذرية.

```go
    bolB, _ := json.Marshal(true)
    fmt.Println(string(bolB))

    intB, _ := json.Marshal(1)
    fmt.Println(string(intB))

    fltB, _ := json.Marshal(2.34)
    fmt.Println(string(fltB))

    strB, _ := json.Marshal("gopher")
    fmt.Println(string(strB))
```

وإليك بعض الأمثلة للشرائح (slices) والخرائط (maps)، والتي يتم تشفيرها إلى مصفوفات وكائنات JSON كما تتوقع.

```go
    slcD := []string{"apple", "peach", "pear"}
    slcB, _ := json.Marshal(slcD)
    fmt.Println(string(slcB))

    mapD := map[string]int{"apple": 5, "lettuce": 7}
    mapB, _ := json.Marshal(mapD)
    fmt.Println(string(mapB))
```

يمكن لحزمة JSON تشفير أنواع بياناتك المخصصة تلقائياً. ستتضمن فقط الحقول المصدرة في المخرجات المشفرة وستستخدم تلك الأسماء كمفاتيح JSON بشكل افتراضي.

```go
    res1D := &response1{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res1B, _ := json.Marshal(res1D)
    fmt.Println(string(res1B))
```

يمكنك استخدام "الوسوم" (tags) في تصريحات حقول الهيكل لتخصيص أسماء مفاتيح JSON المشفرة. تحقق من تعريف `response2` أعلاه لرؤية مثال على هذه الوسوم.

```go
    res2D := &response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))
```

الآن دعونا ننظر في فك تشفير بيانات JSON إلى قيم Go. إليك مثال لهيكل بيانات عام.

```go
    byt := []byte(`{"num":6.13,"strs":["a","b"]}`)
```

نحتاج لتقديم متغير حيث يمكن لحزمة JSON وضع البيانات المفكوكة. هذا الـ `map[string]interface{}` سيحمل خريطة من النصوص إلى أنواع بيانات عشوائية.

```go
    var dat map[string]interface{}
```

هنا فك التشفير الفعلي، وفحص للأخطاء المرتبطة.

```go
    if err := json.Unmarshal(byt, &dat); err != nil {
        panic(err)
    }
    fmt.Println(dat)
```

لكي نستخدم القيم في الخريطة المفكوكة، سنحتاج لتحويلها لنوعها المناسب. على سبيل المثال، هنا نحول القيمة في `num` لنوع `float64` المتوقع.

```go
    num := dat["num"].(float64)
    fmt.Println(num)
```

الوصول للبيانات المتداخلة يتطلب سلسلة من التحويلات.

```go
    strs := dat["strs"].([]interface{})
    str1 := strs[0].(string)
    fmt.Println(str1)
```

يمكننا أيضاً فك تشفير JSON إلى أنواع بيانات مخصصة. هذا له مزايا إضافة سلامة أنواع إضافية لبرامجنا وإلغاء الحاجة لإثباتات النوع عند الوصول للبيانات المفكوكة.

```go
    str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)
    fmt.Println(res.Fruits[0])
```

في الأمثلة أعلاه استخدمنا دائماً البايتات والنصوص كوسائط بين البيانات وتمثيل JSON على المخرجات القياسية. يمكننا أيضاً بث (stream) تشفيرات JSON مباشرة إلى `io.Writers` مثل `os.Stdout` أو حتى أجسام ردود HTTP.

```go
    enc := json.NewEncoder(os.Stdout)
    d := map[string]int{"apple": 5, "lettuce": 7}
    enc.Encode(d)
}
```

تشغيل البرنامج:

```sh
$ go run json.go
true
1
2.34
"gopher"
["apple","peach","pear"]
{"apple":5,"lettuce":7}
{"Page":1,"Fruits":["apple","peach","pear"]}
{"page":1,"fruits":["apple","peach","pear"]}
map[num:6.13 strs:[a b]]
6.13
a
{1 [apple peach]}
apple
{"apple":5,"lettuce":7}
```
