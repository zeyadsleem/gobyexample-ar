---
title: "الاختبارات والمقاييس"
description: "كتابة اختبارات الوحدة ومقاييس الأداء (Benchmarks) في لغة Go"
order: 72
---

تعتبر اختبارات الوحدة جزءاً أساسياً من كتابة كود Go بمستوى إنتاجي. توفر حزمة `testing` الأدوات اللازمة لكتابة الاختبارات، وأداة `go test` تقوم بتشغيلها.

```go
package main

import (
    "fmt"
    "testing"
)
```

سنقوم باختبار هذه الدالة البسيطة التي تحسب الحد الأدنى لرقمين. عادةً ما يكون الكود الذي نختبره في ملف مثل `intutils.go` وملف الاختبار المقابل له يكون `intutils_test.go`.

```go
func IntMin(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

يتم كتابة الاختبار بإنشاء دالة تبدأ بكلمة `Test`.

```go
func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -2 {
```

`t.Errorf` تبلغ عن فشل الاختبار ولكنها تستمر في التنفيذ.

```go
        t.Errorf("IntMin(2, -2) = %d; want -2", ans)
    }
}
```

غالباً ما يتم كتابة الاختبارات باستخدام "الجدول" (Table-driven tests) لتجنب التكرار.

```go
func TestIntMinTableDriven(t *testing.T) {
    var tests = []struct {
        a, b int
        want int
    }{
        {0, 1, 0},
        {1, 0, 0},
        {2, -2, -2},
        {0, -1, -1},
        {-1, 0, -1},
    }

    for _, tt := range tests {
```

`t.Run` تسمح بتشغيل "اختبارات فرعية" (subtests).

```go
        testName := fmt.Sprintf("%d,%d", tt.a, tt.b)
        t.Run(testName, func(t *testing.T) {
            ans := IntMin(tt.a, tt.b)
            if ans != tt.want {
                t.Errorf("got %d, want %d", ans, tt.want)
            }
        })
    }
}
```

اختبارات الأداء (Benchmark tests) تبدأ بـ `Benchmark` وتستخدم `testing.B`.

```go
func BenchmarkIntMin(b *testing.B) {
```

أداة الاختبار ستنفذ متن الدالة `b.N` مرة.

```go
    for i := 0; i < b.N; i++ {
        IntMin(1, 2)
    }
}
```

لتشغيل الاختبارات:
`go test -v`

لتشغيل مقاييس الأداء:
`go test -bench=.`
