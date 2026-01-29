---
title: "السياق (Context)"
description: "استخدام حزمة context لإدارة المهلات (Timeouts) والإلغاء في لغة Go"
order: 80
---

في المثال السابق نظرنا في إعداد خادم HTTP بسيط. خوادم HTTP مفيدة لتوضيح استخدام `context.Context` للتحكم في الإلغاء. يحمل `Context` المواعيد النهائية (deadlines) وإشارات الإلغاء وبيانات أخرى عبر حدود الواجهات البرمجية (API) والـ goroutines.

```go
package main

import (
    "fmt"
    "net/http"
    "time"
)

func hello(w http.ResponseWriter, req *http.Request) {
```

يتم إنشاء `Context` لكل طلب بواسطة آلية `net/http` ويمكن الوصول إليه باستخدام دالة `Context()`.

```go
    ctx := req.Context()
    fmt.Println("server: hello handler started")
    defer fmt.Println("server: hello handler ended")
```

انتظر بضع ثوانٍ قبل إرسال رد للعميل. هذا يحاكي عملاً يقوم به الخادم. أثناء العمل، نراقب قناة `Done()` في السياق لمعرفة ما إذا كان يجب علينا إلغاء العمل والعودة فوراً.

```go
    select {
    case <-time.After(10 * time.Second):
        fmt.Fprintf(w, "hello\n")
    case <-ctx.Done():
```

دالة `Err()` في السياق تعيد خطأ يوضح سبب إغلاق قناة `Done()`.

```go
        err := ctx.Err()
        fmt.Println("server:", err)
        internalError := http.StatusInternalServerError
        http.Error(w, err.Error(), internalError)
    }
}

func main() {
    http.HandleFunc("/hello", hello)
    http.ListenAndServe(":8090", nil)
}
```

لتجربة هذا، قم بتشغيل الخادم، ثم في نافذة أخرى ابدأ طلب `curl` واقطعه فوراً بـ `Ctrl+C`. يجب أن ترى رسالة الإلغاء في مخرجات الخادم.
