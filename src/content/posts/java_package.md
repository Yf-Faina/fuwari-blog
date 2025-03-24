---
title: 包
published: 2024-03-22
description: ''
image: ''
tags: [学习笔记]
category: '面向对象'
draft: false 
lang: ''
---

## **包(package)**

**包**：主要为了解决命名冲突的问题，包是一种**名字空间**

当有以下文件结构：

```
clock----------project根目录   
|___src--------资源目录
    |___clock
        |___Clock.java
    |___display
        |___Display.java
```

此时，`clock`和 `display`是两个不同的包，而对应的 `.java`文件处于不同的包中。

### **包的引入**

```java
package clock;   //打包

import display.Display;   //引入完整类名

public class Clock{
    private Display hour = new Display(24);
    private Display minute = new Display(60);
  
    ...
}
```

:::info
以上代码在 `Clock.java`中
:::

同时也可这么引入：

```java
package clock;   

//import display.Display;

public class Clock{
    private display.Display hour = new display.Display(24);   //在新建对象时给出全名
    private display.Display minute = new display.Display(60);
  
    ...
}
```

可以使用 `*`（通配符），表示把这个包下面的所有 `class`都导入进来（但不包括子包的 `class`）

```java
package clock;   

import display.*;

public class Clock{
    private Display hour = new Display(24);
    private Display minute = new Display(60);
  
    ...
}
```

**但一般不建议这么做，因为在导入多个包后，很难看出该类来自哪个包，也容易导致重名冲突问题。**
