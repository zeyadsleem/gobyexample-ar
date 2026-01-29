---
title: "الهياكل (Structs)"
description: "تعريف واستخدام الهياكل (Structs) لتجميع البيانات في لغة Go"
order: 19
---
*الهياكل* (Structs) في لغة Go هي مجموعات من الحقول ذات الأنواع المحددة. إنها مفيدة لتجميع البيانات معاً لتكوين سجلات.

```go
package main

import "fmt"
```

هيكل `person` هذا يحتوي على حقول `name` و `age`.

```go
type person struct {
    name string
    age  int
}
```

`newPerson` تنشئ هيكل person جديد بالاسم المعطى.

```go
func newPerson(name string) *person {
```

لغة Go هي لغة ذات تجميع تلقائي للقمامة (garbage collected)؛ يمكنك بأمان إرجاع مؤشر لمتغير محلي - سيتم تنظيفه بواسطة مجمع القمامة فقط عندما لا تكون هناك مراجع نشطة له.

```go
    p := person{name: name}
    p.age = 42
    return &p
}

func main() {
```

هذه صيغة تنشئ هيكلاً جديداً.

```go
    fmt.Println(person{"Bob", 20})
```

يمكنك تسمية الحقول عند تهيئة الهيكل.

```go
    fmt.Println(person{name: "Alice", age: 30})
```

الحقول المحذوفة ستكون ذات قيم صفرية.

```go
    fmt.Println(person{name: "Fred"})
```

بادئة `&` تنتج مؤشراً للهيكل.

```go
    fmt.Println(&person{name: "Ann", age: 40})
```

من الشائع في Go تغليف إنشاء الهياكل الجديدة في دوال بناء (constructors).

```go
    fmt.Println(newPerson("Jon"))
```

الوصول لحقول الهيكل باستخدام النقطة (dot).

```go
    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)
```

يمكنك أيضاً استخدام النقاط مع مؤشرات الهيكل - يتم إلغاء مرجعية المؤشرات تلقائياً.

```go
    sp := &s
    fmt.Println(sp.age)
```

الهياكل قابلة للتعديل (mutable).

```go
    sp.age = 51
    fmt.Println(sp.age)
```

إذا كان نوع الهيكل يستخدم فقط لقيمة واحدة، فلا داعي لتسميته. يمكن أن تكون القيمة ذات نوع هيكل مجهول (anonymous struct type). تُستخدم هذه التقنية بشكل شائع في الاختبارات المدفوعة بالجدول (table-driven tests).

```go
    dog := struct {
        name   string
        isGood bool
    }{
        "Rex",
        true,
    }
    fmt.Println(dog)
}
```

تشغيل البرنامج:

```sh
$ go run structs.go
{Bob 20}
{Alice 30}
{Fred 0}
&{Ann 40}
&{Jon 42}
Sean
50
51
{Rex true}
```
