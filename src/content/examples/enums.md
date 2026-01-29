---
title: "الأنواع المعددة (Enums)"
description: "تمثيل الأنواع المعددة (Enums) في لغة Go باستخدام الثوابت و iota"
order: 22
---

[*الأنواع المعددة*](https://en.wikipedia.org/wiki/Algebraic_data_type) (Enums) هي حالة خاصة من أنواع المجموع. النوع المعدد هو نوع له عدد محدد من القيم الممكنة، ولكل منها اسم مميز. لا تمتلك Go نوع `enum` كخاصية لغوية منفصلة، ولكن من السهل تطبيقها باستخدام اصطلاحات اللغة الحالية.

```go
package main

import "fmt"
```

النوع المعدد `ServerState` الخاص بنا له نوع أساسي هو `int`.

```go
type ServerState int
```

القيم الممكنة لـ `ServerState` يتم تعريفها كثوابت. الكلمة المحجوزة الخاصة `iota` تولد قيم ثوابت متتالية تلقائياً؛ في هذه الحالة 0، 1، 2 وهكذا.

```go
const (
    StateIdle ServerState = iota
    StateConnected
    StateError
    StateRetrying
)
```

من خلال تطبيق واجهة `fmt.Stringer` يمكن طباعة قيم `ServerState` أو تحويلها إلى نصوص.

```go
var stateName = map[ServerState]string{
    StateIdle:      "idle",
    StateConnected: "connected",
    StateError:     "error",
    StateRetrying:  "retrying",
}

func (ss ServerState) String() string {
    return stateName[ss]
}

func main() {
    ns := transition(StateIdle)
    fmt.Println(ns)

    ns2 := transition(ns)
    fmt.Println(ns2)
}
```

دالة `transition` تحاكي انتقال الحالة للخادم؛ تأخذ الحالة الحالية وتعيد حالة جديدة.

```go
func transition(s ServerState) ServerState {
    switch s {
    case StateIdle:
        return StateConnected
    case StateConnected, StateRetrying:
```

نفترض أننا نتحقق من بعض الشروط هنا لتحديد الحالة التالية...

```go
        return StateIdle
    case StateError:
        return StateError
    default:
        panic(fmt.Errorf("حالة غير معروفة: %s", s))
    }
}
```

تشغيل البرنامج:

```sh
$ go run enums.go
connected
idle
```