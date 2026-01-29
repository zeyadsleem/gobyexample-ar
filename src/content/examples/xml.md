---
title: "بيانات XML"
description: "التعامل مع بيانات XML في لغة Go باستخدام حزمة encoding/xml"
order: 56
---

تقدم Go دعماً مدمجاً لـ XML والتنسيقات المشابهة لـ XML باستخدام حزمة `encoding/xml`.

```go
package main

import (
    "encoding/xml"
    "fmt"
)
```

سيتم تعيين `Plant` إلى XML. بشكل مشابه لأمثلة JSON، تحتوي وسوم الحقول على توجيهات للمشفر وفك التشفير. هنا نستخدم بعض الميزات الخاصة لحزمة XML: اسم الحقل `XMLName` يحدد اسم عنصر XML الذي يمثل هذا الهيكل؛ `id,attr` يعني أن حقل `Id` هو سمة (attribute) XML وليس عنصراً متداخلاً.

```go
type Plant struct {
    XMLName xml.Name `xml:"plant"`
    Id      int      `xml:"id,attr"`
    Name    string   `xml:"name"`
    Origin  []string `xml:"origin"`
}

func (p Plant) String() string {
    return fmt.Sprintf("Plant id=%v, name=%v, origin=%v",
        p.Id, p.Name, p.Origin)
}

func main() {
    coffee := &Plant{Id: 27, Name: "Coffee"}
    coffee.Origin = []string{"Ethiopia", "Brazil"}
```

إصدار XML يمثل نباتنا؛ باستخدام `MarshalIndent` لإنتاج مخرجات أكثر قابلية للقراءة البشرية.

```go
    out, _ := xml.MarshalIndent(coffee, " ", "  ")
    fmt.Println(string(out))
```

لإضافة ترويسة XML عامة للمخرجات، أضفها صراحة.

```go
    fmt.Println(xml.Header + string(out))
```

استخدم `Unmarshal` لتحليل دفق من البايتات يحتوي على XML إلى هيكل بيانات. إذا كان الـ XML مشوهاً أو لا يمكن تعيينه لـ Plant، سيتم إرجاع خطأ وصفي.

```go
    var p Plant
    if err := xml.Unmarshal(out, &p); err != nil {
        panic(err)
    }
    fmt.Println(p)

    tomato := &Plant{Id: 81, Name: "Tomato"}
    tomato.Origin = []string{"Mexico", "California"}
```

وسم الحقل `parent>child>plant` يخبر المشفر بتداخل جميع الـ `plant`s تحت `<parent><child>...`

```go
    type Nesting struct {
        XMLName xml.Name `xml:"nesting"`
        Plants  []*Plant `xml:"parent>child>plant"`
    }

    nesting := &Nesting{}
    nesting.Plants = []*Plant{coffee, tomato}

    out, _ = xml.MarshalIndent(nesting, " ", "  ")
    fmt.Println(string(out))
}
```

تشغيل البرنامج:

```sh
$ go run xml.go
 <plant id="27">
   <name>Coffee</name>
   <origin>Ethiopia</origin>
   <origin>Brazil</origin>
 </plant>
<?xml version="1.0" encoding="UTF-8"?>
 <plant id="27">
   <name>Coffee</name>
   <origin>Ethiopia</origin>
   <origin>Brazil</origin>
 </plant>
Plant id=27, name=Coffee, origin=[Ethiopia Brazil]
 <nesting>
   <parent>
     <child>
       <plant id="27">
         <name>Coffee</name>
         <origin>Ethiopia</origin>
         <origin>Brazil</origin>
       </plant>
       <plant id="81">
         <name>Tomato</name>
         <origin>Mexico</origin>
         <origin>California</origin>
       </plant>
     </child>
   </parent>
 </nesting>
```
