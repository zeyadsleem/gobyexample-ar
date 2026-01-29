---
title: "توجيه التضمين"
description: "استخدام //go:embed لتضمين الملفات في الملف الثنائي للبرنامج في لغة Go"
order: 71
---

توجيه `//go:embed` هو توجيه للمترجم (compiler directive) يسمح للبرامج بتضمين ملفات ومجلدات عشوائية في الملف الثنائي (binary) لبرنامج Go وقت التصريف.

```go
package main

import (
    "embed"
)
```

توجيه `embed` يخبر Go بتضمين محتوى الملفات في المتغيرات التالية له. هنا نقوم بتضمين محتوى ملف نصي في متغير `string`.

```go
//go:embed folder/single_file.txt
var fileString string
```

يمكنك أيضاً تضمين محتوى الملف كـ `[]byte`.

```go
//go:embed folder/single_file.txt
var fileByte []byte
```

يمكننا أيضاً تضمين عدة ملفات أو حتى مجلدات كاملة. هذا يستخدم نوع `embed.FS` الذي يطبق واجهة نظام ملفات للقراءة فقط.

```go
//go:embed folder/*.hash
//go:embed folder/subdir/*.txt
var folder embed.FS

func main() {
```

طباعة محتوى `single_file.txt`.

```go
    print(fileString)
    print(string(fileByte))
```

استخراج محتوى ملف من المجلد المضمن.

```go
    content1, _ := folder.ReadFile("folder/file1.hash")
    print(string(content1))

    content2, _ := folder.ReadFile("folder/subdir/file2.txt")
    print(string(content2))
}
```

للمزيد من المعلومات، راجع [التوثيق الرسمي لحزمة embed](https://pkg.go.dev/embed).

تشغيل البرنامج (بافتراض وجود المجلد والملفات المطلوبة):

```sh
$ mkdir -p folder/subdir
$ echo "hello go" > folder/single_file.txt
$ echo "123" > folder/file1.hash
$ echo "456" > folder/subdir/file2.txt
$ go run embed-directive.go
hello go
hello go
123
456
```
