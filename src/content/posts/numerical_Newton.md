---
title: 牛顿插值
published: 2024-03-18
description: ''
image: ''
tags: [学习笔记]
category: '数值分析'
draft: false 
lang: ''
---
**问题**

$Lagrange$插值简单易用，但若要增加或减少节点时，全部基函数$l_k(x)$都需要重新计算，不太方便。

**解决方法：**

设计一个可以**逐次**生成插值多项式的算法，即

$$
p_n(x) = p_{n-1}(x)+u_n(x)
$$

其中，$p_n(x)$和$p_n-1(x)$分别为$n$次和$n-1$次插值多项式。

### 牛顿($Newton$)插值思想

拉格朗日插值多项式，一点零次插值多项式为

$$
L_0(x)=y_0
$$

拉格朗日两点一次插值（线性插值）多项式为

$$
L_1(x)=\frac{x-x_1}{x_0-x_1}y_0+\frac{x-x_0}{x_1-x_0}y_1 = y_0 \cdot \boxed1 + \frac{y_0-y_1}{x_0-x_1}\boxed{(x-x_0)}
$$

前者是由两点式表达的拉格朗日线性插值，而后者使用的是点斜式。

:::tip

无论是两点式还是点斜式只是在不同基函数情况下表征的同一线性函数

:::

拉格朗日三点二次插值（抛物插值）多项式为

$$
\begin{align}
L_2(x)&=\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}y_0+\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}y_1+\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}y_2 \\
&= L_1(x)+c_2\cdot \boxed{(x-x_0)(x-x_1)}
\end{align}
$$

根据线性插值递推，我们希望抛物插值也得到如上的类似点斜式形式，如何求$c_2$？

$$
\begin{align}
C_2 &=\frac{y_0}{(x_0-x_1)(x_0-x_2)}+\frac{y_1}{(x_1-x_0)(x_1-x_2)}+\frac{y_2}{(x_2-x_0)(x_2-x_1)}\\
 &=\frac{\frac{y_0-y_1}{x_0-x_1}-\frac{y_1-y_2}{x_1-x_2}}{x_0-x_2}
\end{align}
$$

以此类推，推导

### **牛顿插值**

拉格朗日插值虽然容易计算，但若是要增加一个节点时，全部基函数$l_k(x)$都需要重新计算。

如果能将$L_n(x)$改写成$c_0+c_1(x-x_0)+c_2(x-x_0)(x-x_1)+\dots+c_n(x-x_0)\dots(x-x_{n-1})$的形式，则每增加一个节点都只附加一项上去。

**差商（亦称均差）**：

一阶差商：

$$
f[x_i,x_j]=\frac{f(x_i)-f(x_j)}{x_i-x_j}\qquad(i\neq j,x_i\neq x_j)
$$

二阶差商：

$$
f[x_i,x_j,x_k]=\frac{f[x_i,x_j]-f[x_j,x_k]}{x_i-x_k}\qquad(i\neq k)
$$

$(k+1)$阶差商：

$$
\begin{align}
f[x_0,\dots,x_{k+1}]&=\frac{f[x_0,x_1,\dots,x_k]-f[x_1,\dots,x_k,x_{k+1}]}{x_0-x_{k+1}} \\ &=\frac{f[x_0,x_1,\dots,x_k]-f[x_0,\dots,x_k,x_{k+1}]}{x_k-x_{k+1}}
\end{align}
$$

:::important
$k$阶差商必须由$k+1$个节点构成，$k$个节点是构造不出$k$阶差商的。

为了统一起见，补充定义函数$f(x_0)$为零阶差商
:::
