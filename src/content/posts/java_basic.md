---
title: Java基本语法
published: 2024-03-08
description: ''
image: ''
tags: [学习笔记]
category: '面向对象'
draft: false 
lang: ''
---

## **逃逸字符**

| 字符   | 意义           | 字符   | 意义       |
| ------ | -------------- | ------ | ---------- |
| `\b` | 回退一格       | `\"` | 双引号     |
| `\t` | 到下一个表格位 | `\'` | 单引号     |
| `\n` | 换行           | `\\` | 反斜杠本身 |
| `\r` | 回车           |        |            |

**制表位（八个字符）**：

- 每行的固定位置
- 用一个 `\t`使得输出从下一个制表位开始
- 用 `\t`才能使得上下两行对齐

## **`String[] args`命令行参数**

Java程序的入口是 `main`方法，而 `main`方法可以接收一个命令行参数，是一个 `String[]`数组

```java
public class Main {
    public static void main(String[] args) {
        for (String arg : args) {
            System.out.println(arg);
        }
    }
}
```

例：利用 `-version`打印程序版本号

```java
public class Main{
    public static void main(String[] args){
         for(String arg:args){
             if("-version".equals(arg)){
                System.out.println("v 1.0");
                break;
             }
         }
    }
}
```

该程序必须在 `cmd`中使用命令行运行，编译：

```sh
$ javac Main.java
```

然后，执行的时候，给它传递一个 `-version`参数：

```sh
$ java Main -version
v 1.0
```

## **包裹类型**

每种基础类型都有对应的包裹类型

| 基础类型    | 包裹类型      |
| ----------- | ------------- |
| `boolean` | `Boolean`   |
| `char`    | `Character` |
| `int`     | `Integer`   |
| `double`  | `Double`    |
| `byte`    | `Byte`      |

可以将一个基础类型的数据转换为[对象](/zh/posts/Java面向对象/1.md)的形式，使它们一样可以参与运算与传递

```java
import java.util.Scanner;  
  
public class Main{  
    public static void main(String[] args){  
        Scanner in = new Scanner(System.in);  
        int i = 10;    //使用基础类型定义变量  
        Integer k = 10;   //使用包裹类型定义对象  
        k = i;        //包裹类型的对象可以使用对应的基础类型变量进行赋值  
    }  
}
```

:::tip
好处：可以更方便的使用函数
:::
