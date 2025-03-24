---
title: 对象和类
published: 2024-03-23
description: ''
image: ''
tags: [学习笔记]
category: '面向对象'
draft: false 
lang: ''
---

**对象**是实体，需要被创建 `new`，可以为我们做事情。**对象 = 属性 + 服务**

* 表达东西或者事件
* 运行时响应消息（提供服务）

把数据和对数据的操作放在一起$\rightarrow$**封装**

**类**是规范，根据类的定义来创建对象

- 定义所有对象的属性

OOP特性：

1. 一切都是对象
2. 程序就是一堆互相发送消息的对象
3. 每个对象都有自己的存储空间，里面时其他的对象
4. 每个对象都有一个类型
5. 所有属于某个特定类型的对象可以提供相同的服务

## **定义类**

以自动售货机为例子，创建一个自定义类：

```java
public class VendingMachine{
    int price = 80;  //商品的价格
    int balance;  //余额
    int total;    //收到的所有钱
  
    void showPrompt(){   //显示提示
        System.out.println("Welcome");
    }
  
    void insertMoney(int amount){   //往售货机中放钱
        balance = balance + amount;
    }
  
    void showBalance(){   //显示余额
        System.out.println(balance);
    }
  
    void getFood(){    //得到食物
        if(balance >= price){
            System.out.println("Here you are.");
            balance -= price;
            total += price;
        }
    }
  
    public static void main(String[] args){
        VendingMachine vm = new VendingMachine();
        vm.showPrompt();
        vm.showBalance();
        vm.insertMoneyj(100);
        vm.getFood();
        vm.showBalance();
    }
}
```

创建对象：**对象变量**是*对象的管理者而不是所有者*

使用点运算符 `.`可以让对象做事

### **成员变量**

- 类定义了对象中所具有的变量，这些变量称作成员变量
- 每个对象有自己的变量，和同一个类的其它对象是分开的

### **函数与成员变量**

- 在函数中可以直接写成员变量的名字来访问成员变量

:::tip
在Java中，类中的成员函数被称为（类）方法。
:::

- 函数是通过对象来调用的

  `v.insertMoney()`

  这次调用临时建立了 `insertMoney()`和 `v`之间的关系，`insertMoney()`内部的成员变量指的是 `v`的成员变量

### **this关键字**

`this`是成员函数的一个特殊的固有的本地变量，它表达了调用这个函数的那个对象

```java
public class VendingMachine{
    int price = 80;  
    int balance;  
    int total;  
  
    void setPrice(int price){
        this.price = price;   
    }
}
```

`this.price`指的是成员对象所对应的 `price`，而 `price`指的是 `setPrice(int price)`函数中的 `price`参数

### **调用函数**

- 通过点运算符 `.`调用某个对象的函数
- 在成员函数内部直接调用自己（`this`）的其他成员函数

### **本地变量**

- 定义在方法体内部的变量是本地变量，也成为局部变量，这些变量只有在方法被调用的时候才会分配空间，当方法结束，这些变量就会被释放。
- 与本地变量相对的是成员变量（字段或属性），它们被定义在类中而不是方法中，成员变量的生存周期与对象的生存周期相同，它们将在对象被销毁时释放内存。成员变量的作用域是类内部的成员函数（方法）。
- 本地变量的生存期和作用域都是函数内部。

## **对象初始化**

### **成员变量定义初始化**

- 变量成员在定义的地方就可以给出初始值，没有给出初始值的成员变量在对象创建的时候会自动获得$0$值

:::tip
对象变量的$0$值表示没有管理任何对象，也可以主动给 `null`值
:::

- 定义初始化可以调用函数，也可以使用已经定义的成员变量

```java
public class VendingMachine{
    int price = 80;  
    int balance = f();  
    int total;  
  
    vendingMachine{   //构造函数
        total = 0;
    }
  
    int f(){   //使用f()函数为balance进行初始化
        return 10;
    }
}
```

### **构造函数**

如果有一个成员函数的名字和类的名字完全相同，则在创建这个类的每一个对象的时候会自动调用这个函数$\rightarrow$**构造函数**

:::warning
这个函数不能有返回类型
:::

### **函数重载**

- 一个类可以有多个构造函数，只要它们的参数表不同
- 创建对象的时候给出不同的参数值，就会自动调用不同的构造函数
- 通过 `this()`还可以调用其他构造函数
- ==一个类里的同名但参数表不同的函数构成重载关系==

```java
public class VendingMachine{
    int price = 80;  
    int balance;  
    int total;  
  
    vendingMachine(){
        total = 0;
    }
    //这两个名字但是参数表不同的函数构成重载关系
    vendingMachine(int price){
        this.price = price;
    }
  
    public static void main(String[] args){
        VendingMachine vm = new VendingMachine();  //在创建vm时使用vendingMachine()
        vendingMachine vm1 = new vendingMachine(100);//在创建vm1时使用vendingMachine(int price)
    }
}
```

### **访问属性**

**`private`私有**

- 只有这个类内部可以访问
- 类内部指类的成员函数和定义初始化
- 这个限制是对类的而不是对对象的

**`public`公共**

- 任何人都可以访问
- 任何人指的是在任何类的函数或定义初始化中可以使用
- 使用指的是调用、访问或定义变量

:::important
 `public`修饰的类，必须定义在与自己同名的单独 `.java`文件中，否则只能被在同一个[包](/zh/posts/Java面向对象/3.md)中的代码访问。该 `.java`文件称为一个**编译单元**，在一个编译单元中，可以存在多个类，但只有一个类可以用 `public`修饰
:::
