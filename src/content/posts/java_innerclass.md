---
title: 内部类
published: 2024-06-06
description: ''
image: ''
tags: [学习笔记]
category: '面向对象'
draft: false 
lang: ''
---
有一种类是被定义在某一个类中的（类中类）称为**内部类**

## **Inner Class**

如果一个类定义在某一个类的内部，这个类就是 `Inner Class`

```java
class Outer{
    class Inner{
        //这里定义了一个内部类
    }
}
```

在这里 `Outer`是一个普通类，而 `Inner`是一个内部类，`Inner Class`的实例（对象）不能单独存在，必须依附于一个 `Outer`类的实例存在

```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer("Nested"); // 实例化一个Outer
        Outer.Inner inner = outer.new Inner(); // 实例化一个Inner
        inner.hello();
    }
}
```

观察上述代码，要实例化一个 `Inner`，必须首先创建一个 `Outer`的实例，然后，调用 `Outer`实例的 `new`来创建 `Inner`实例：

```java
Outer.Inner inner = outer.new Inner();
```

## **匿名内部类 Anonymous Class**

匿名内部类是一种没有名字的内部类，它可以直接在声明和实例化时定义。匿名内部类通常用于简化代码，特别是在实现接口或继承类时
匿名内部类的语法结构如下：

```java
new SuperType() {
    // 重写方法或实现接口方法
};
```

以下是一完整使用匿名内部类实现接口的例子：

```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer("Nested");   //创建了一个外部类的实例，并使用构造函数传入name参数
        outer.asyncHello(); //调用outer类中使用匿名内部类实现的asyncHello方法
    }
}

class Outer {
    private String name;

    Outer(String name) {     //构造方法
        this.name = name;
    }

    void asyncHello() {
        Runnable r = new Runnable() {   //匿名内部类
            @Override
            public void run() {   //这里覆写实现Runnable接口中的run抽象方法
                System.out.println("Hello, " + Outer.this.name);
            }
        };
        new Thread(r).start();    //启动新线程
    }
}
```

:::note
**在 `Main()`中 `outer.asyncHello()`的这里调用的是 `Outer`类的实例方法 `asyncHello()`，而不是直接调用匿名内部类的方法**
:::

`asyncHello()`内部的内容：

- 在 `asyncHello()`方法内部，创建了一个匿名内部类，这个类实现了 `Runnable`接口，并重写了其 `run`方法。
- `Runnable r = new Runnable() { ... }`：这里定义了一个匿名内部类并将其实例化，赋值给变量 `r`。
- `Outer.this.name`：在匿名内部类中，通过 `Outer.this.name` 访问外部类 `Outer` 的实例变量 `name`。

可以理解为匿名内部类把（将接口转为类、再将类实例化为对象）两个步骤直接简化，在将接口实例化的时候，因为接口已经实现了好了，并直接赋值给某变量，也就跳过了变成类的步骤，没有类名

因此匿名内部类存在**局限**：

1. **不能有构造函数**：匿名内部类不能定义构造函数，因为它们没有类名。
2. **不能被重用**：匿名内部类只能在声明时使用，不能在其他地方实例化。
