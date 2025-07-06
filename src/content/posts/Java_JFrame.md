---
title: 窗口-JFrame
published: 2024-06-06
description: ''
image: ''
tags: [学习笔记]
category: 'Java GUI'
draft: false 
lang: ''
---
GUI的全称是Graphical User Interface， 即**图形用户界面**
Swing是Java语言开发图形化界面的一个工具包，以抽象窗口工具（AWT）为基础。所有的 `Swing`组件都保存在 `javax.swing`包中

## Swing 顶级容器

**顶层容器**意味着是一个独立的窗口，**可以包含其他Swing组件**，比如按钮、标签、文本框等。
Swing提供了主要的三个顶级容器分别为：`Jwindow`、`JFrame`和 `JDialog`

### JFrame

```java
import javax.swing.JFrame;  //导入swing.JFrame包
public class Main {  
    public static void main(String[] args){  
        JFrame frame = new JFrame("Swing example"); //构造方法，参数为窗口的标题
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  // 当关闭窗口时，退出整个程序
        frame.setSize(400,300);  //设置窗口的大小，前参数为宽度，后参数为高度
        frame.setVisible(true);  //设置窗口是否可见，true可见，false不可见
    }  
}
```

> 窗口标题也可使用 `setTitle()`方法进行设置

以下是一些其他常用方法：

| 方法                                 | 类型     | 功能描述                             |
| ------------------------------------ | -------- | ------------------------------------ |
| `add(Component comp)`              | 普通方法 | 向内容窗格添加组件                   |
| `setLayout(LayoutManager manager)` | 普通方法 | 设置内容窗格的布局管理器             |
| `JFrame.DISPOSE_ON_CLOSE`          | 普通方法 | 关闭窗口时释放窗口资源，但不退出程序 |

## 自定义窗口

使用自定义窗口，可以将 `main()`方法中对窗口的设置分离出来成为一个类，从而简化 `main()`方法中的代码长度，易于后期代码优化

```java
import javax.swing.JFrame;  
  
public class MyFrame extends JFrame{  
    public MyFrame(String title){  
        super(title);  //调用父类的带参数构造器，即调用JFrame的构造方法设置title  
        JPanel root = new JPanel();  
        this.setContentPane(root);  
        JButton button = new JButton("按钮");  
        root.add(button);  
    }  
}
```

我们创建一个名为 `MyFrame`的类来继承 `JFrame`，在 `MyFrame`中实现对窗口的设置
