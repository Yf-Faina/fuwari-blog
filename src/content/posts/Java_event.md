---
title: 事件处理机制
published: 2024-06-06
description: ''
image: ''
tags: [学习笔记]
category: 'Java GUI'
draft: false 
lang: ''
---
## GUI事件处理机制

定义：当在某个组件上发生某些操作的时候，会自动触发某一段代码的执行
在GUI事件处理机制中涉及到四个重要的概念：

- **事件源（Event Source）**：事件发生的场所，通常是产生事件的组件，如窗口、按钮、菜单等
- **事件对象（Event）**：在事件源上发生的操作可以称为事件，GUI会把事件都封装到一个事件对象中，如果需要知道该事件的详细信息，就可以通过Event对象来获取
- **监听器（Listener）**：当在某个事件源上发生了事件，事件监听器就可以对事件进行处理
- **注册监听**：把某个事件监听器（A）通过某个事件（B）绑定到某个事件源（C）上，当在事件源（C）上发生了某个事件（B）后，那么事件监听器（A）的代码就会自动执行
  以下以一个鼠标单击事件为例：

```java
import javax.swing.*;  
import java.awt.event.ActionEvent;  
import java.awt.event.ActionListener;  
  
public class MyFrame extends JFrame{  
    public MyFrame(String title){  
        super(title);  
        JPanel root = new JPanel();  
        this.setContentPane(root); 
        //创建事件源： 
        JButton button = new JButton("按钮");  
        root.add(button);  
        //为事件源注册监听器：
        MyActionListener listener = new MyActionListener();  
        button.addActionListener(listener);  
    }  
    //自定义事件监听器：
    private static class MyActionListener implements ActionListener{  
        @Override  
        public void actionPerformed(ActionEvent e) {  
            System.out.println("按钮被点击了");  
        }  
    }  
}
```

根据这段代码，不难发现Swing事件处理的主要步骤如下：

1. **创建事件源**：在这里我们创建了一个按钮（当然除了一些常见的按钮、键盘等组件作为事件源外，还可以使用JFrame窗口在内的顶级容器作为事件源）
2. **自定义事件监听器**：这里我们使用 `MyActionListener`实现了 `ActionListener`作为鼠标单击事件的动作监听器。因为 `ActionListener`是一个接口，所以采用了内部类([[内部类]])的定义方法对接口进行实现（接口必须被继承实现其中所有的抽象方法才能被使用）。**监听器是一个特殊的Java类，必须实现 `XxxListener`接口**
3. **为事件源注册监听器**：使用 `addXxxListener()`方法为指定事件源添加特定类型监听器。上述代码中我们使用的两行代码可简化为：`button.addActionListener(new MyActionListener())`

## 代码简化

在Java Swing中自定义事件监听器存在三种写法：内部类、匿名内部类、Lambda表达式
内部类写法同上

### 匿名内部类

匿名内部类([[内部类#匿名内部类 Anonymous Class]])的好处是使得代码更加简化，不需要为每个简单的接口实现创建单独的类文件。匿名内部类直接在需要的地方定义和使用。上述代码可改写为：

```java
button.addActionListener(new ActionListener(){
     public void actionPerformed(ActionEvent e) {  
            System.out.println("按钮被点击了");  
        } 
});
```

### Lambda表达式

Lambda表达式是Java 8引入的一种新特性，用于简洁地表示能够作为参数传递的匿名函数。它使得代码更加简洁、易读，同时在处理集合和流时提供了强大的支持。Lambda表达式可以看作是对匿名内部类的一种简化。
Lambda表达式的基本语法格式如下：

```java
(parameters) -> expression
```

或者

```java
(parameters) -> { statements; }
```

**语法详解**

1. **参数列表**：
   - 位于箭头符号 `->` 的左边，可以是一个或多个参数。
   - 如果没有参数，可以写成 `()`。
   - 如果有一个参数，并且没有显式指定参数类型，则可以省略括号。
2. **箭头符号**：
   - 使用 `->` 将参数列表和方法体分隔开。
3. **方法体**：
   - 位于箭头符号 `->` 的右边，可以是一个表达式或一段代码块。
   - 如果是单个表达式，不需要花括号 `{}`。
   - 如果是多行代码，需要用花括号 `{}` 包裹，并可以包含返回语句。

因此，上述匿名内部类对自定义事件监听器的写法可以进一步简写为：

```java
button.addActionListener(e -> System.out.println("按钮被点击了"));
```
