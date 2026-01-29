---
title: "الوقت"
description: "التعامل مع الوقت والتواريخ والمدد الزمنية في لغة Go"
order: 57
---

تقدم Go دعماً واسعاً للأوقات والمدد الزمنية؛ إليك بعض الأمثلة.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    p := fmt.Println
```

سنبدأ بالحصول على الوقت الحالي.

```go
    now := time.Now()
    p(now)
```

يمكنك بناء هيكل `time` بتقديم السنة، الشهر، اليوم، إلخ. الأوقات مرتبطة دائماً بـ `Location` أي المنطقة الزمنية.

```go
    then := time.Date(
        2009, 11, 17, 20, 34, 58, 651387237, time.UTC)
    p(then)
```

يمكنك استخراج المكونات المختلفة لقيمة الوقت كما هو متوقع.

```go
    p(then.Year())
    p(then.Month())
    p(then.Day())
    p(then.Hour())
    p(then.Minute())
    p(then.Second())
    p(then.Nanosecond())
    p(then.Location())
```

يوم الأسبوع متاح أيضاً.

```go
    p(then.Weekday())
```

هذه الدوال تقارن بين وقتين، وتختبر ما إذا كان الأول يحدث قبل أو بعد أو في نفس وقت الثاني، على التوالي.

```go
    p(then.Before(now))
    p(then.After(now))
    p(then.Equal(now))
```

دالة `Sub` تعيد `Duration` (مدة زمنية) تمثل الفترة بين وقتين.

```go
    diff := now.Sub(then)
    p(diff)
```

يمكننا حساب طول المدة بوحدات مختلفة.

```go
    p(diff.Hours())
    p(diff.Minutes())
    p(diff.Seconds())
    p(diff.Nanoseconds())
```

يمكنك استخدام `Add` لتقديم وقت بمقدار مدة معينة، أو مع `-` للتحرك للخلف بمقدار مدة.

```go
    p(then.Add(diff))
    p(then.Add(-diff))
}
```

تشغيل البرنامج:

```sh
$ go run time.go
2012-10-31 15:50:13.793654 +0000 UTC
2009-11-17 20:34:58.651387237 +0000 UTC
2009
November
17
20
34
58
651387237
UTC
Tuesday
true
false
false
25891h15m15.142266763s
25891.25420618521
1.5534752523711128e+06
9.320851514226677e+07
93208515142266763
2012-10-31 15:50:13.793654 +0000 UTC
2006-12-05 01:19:43.509120474 +0000 UTC
```
