---
title: "الأوامر الفرعية"
description: "بناء أدوات سطر أوامر معقدة تحتوي على أوامر فرعية (Subcommands) في لغة Go"
order: 75
---

تدعم بعض أدوات سطر الأوامر، مثل `go` أو `git` الكثير من *الأوامر الفرعية* (subcommands) التي لكل منها مجموعتها الخاصة من الأعلام. على سبيل المثال، `go build` و `go test` هما أمران فرعيان مختلفان لأداة `go`.

```go
package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {
```

نعلن عن أمر فرعي باستخدام `NewFlagSet` ونستمر في تعريف الأعلام الخاصة بهذا الأمر الفرعي.

```go
    fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)
    fooEnable := fooCmd.Bool("enable", false, "enable")
    fooName := fooCmd.String("name", "", "name")
```

بالنسبة لأمر فرعي آخر...

```go
    barCmd := flag.NewFlagSet("bar", flag.ExitOnError)
    barLevel := barCmd.Int("level", 0, "level")
```

يتوقع البرنامج أن يكون الأمر الفرعي هو المعامل الأول.

```go
    if len(os.Args) < 2 {
        fmt.Println("expected 'foo' or 'bar' subcommands")
        os.Exit(1)
    }
```

نتحقق من الأمر الفرعي الذي تم استدعاؤه.

```go
    switch os.Args[1] {

    case "foo":
```

لكل أمر فرعي، نقوم بتحليل أعلامه والوصول إلى المعاملات المتبقية.

```go
        fooCmd.Parse(os.Args[2:])
        fmt.Println("subcommand 'foo'")
        fmt.Println("  enable:", *fooEnable)
        fmt.Println("  name:", *fooName)
        fmt.Println("  tail:", fooCmd.Args())
    case "bar":
        barCmd.Parse(os.Args[2:])
        fmt.Println("subcommand 'bar'")
        fmt.Println("  level:", *barLevel)
        fmt.Println("  tail:", barCmd.Args())
    default:
        fmt.Println("expected 'foo' or 'bar' subcommands")
        os.Exit(1)
    }
}
```

لتجربة البرنامج:

```sh
$ go build command-line-subcommands.go
$ ./command-line-subcommands foo -enable -name=joe a1 a2
subcommand 'foo'
  enable: true
  name: joe
  tail: [a1 a2]
```
