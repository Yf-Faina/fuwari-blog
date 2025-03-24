---
title: 拉格朗日插值多项式
published: 2024-03-18
description: ''
image: ''
tags: [学习笔记]
category: '数值分析'
draft: false 
lang: ''
---
求$n$次多项式$L_n(x)=y_0l_0(x)+y_1l_1(x)+\dots+y_nl_n(x)$

使得$L_n(x_i)=y_i,i=0,1,2,\dots,n$

**条件**：无重合节点，即$i\neq j \Longrightarrow x_i \neq x_j$

**如何构造拉格朗日多项式？**

当$\boxed {n=1}$时已知$x_0,x_1;y_0,y_1$，求$L_1(x)=l_0(x)y_0+l_1(x)y_1$，使得$L_1(x_0)=y_0,L_1(x_1)=y_1$

可见$L_1(x)$是过$(x_0,y_0)$和$(x_1,y_1)$两点的直线

$$
\begin{align}
L_1(x)&=y_0+\frac{y_1-y_0}{x_1-x_0}(x-x_0) \newline &= \underbrace{\left(\frac{x-x_1}{x_0-x_1}\right)}_{l_0(x)}y_0+\underbrace{\left(\frac{x-x_0}{x_1-x_0}\right)}_{l_1(x)}y_1 = \sum_{i=0}^{1}l_i(x_j)y_i
\end{align}
$$

$l_i(x)$称为**拉氏基函数(Lagrange Basis)**满足条件**$l_i(x_j)=\delta_{ij}$(Kronecker Delta)**

$$
\begin{align}
l_0(x_0) &= \frac{x_0-x_1}{x_0-x_1}=1 \newline
l_0(x_1) &= \frac{x_1-x_1}{x_0-x_1}=0 \newline
l_0(x_i) &= \begin{cases}1,x=x_0,i=0 \\ 0,x=x_1,i=1\end{cases} \newline \text{若将0替换为j，则公式可化为：} \newline
l_j(x_i) &= \begin{cases}1,x=x_0,i=j \\ 0,x=x_1,i\neq j\end{cases}
\end{align}
$$

符合

$$
\delta_{ij} = \begin{cases}1,i=j\\0,i\neq j\end{cases}
$$

当$\boxed {n\ge 1}$时，希望找到$l_i(x),i=0,\dots,n$使得$l_i(x_j)=\delta_{ij}$；然后令$L_n(x)=\sum_{i=0}^{n}l_i(x)y_i$，则显然有$L_n(x_i)=y_i$

:::important

只有在$i=j$时，才会得到$1$，其他都为$0$，所以求和中的$n$项只剩下了$1$项

:::

$$
L_n(x_i) = \sum _{j=0}^{n}l_j(x_i)y_j = \underbrace{l_i(x_i)}_{=1}y_i = y_i
$$

针对每个$\color{red}l_i$有$n$个零点，$\begin{aligned}\color{blue}x_0...\widehat{x_i}...x_n\end{aligned}$

$$
\begin{aligned}
&\begin{aligned}&{\rightarrow}{\color{red}l_i}(x)=C_i(x-x_0)...\widehat{(x-x_i)}...(x-x_n)=C_i\prod_{j\neq i,j=0}^n(x-x_j)\\&{l_i(x_i)=}1\quad\boldsymbol{\rightarrow}{C_0=}\prod_{j\neq i}\frac{1}{(x_i-x_j)}\end{aligned} \\
&\boxed{l_i(x)=\prod_{j\neq i,j=0}^n\frac{(x-x_j)}{(x_i-x_j)}} \Longrightarrow \boxed{L_n(x)=\sum_{i=0}^nl_i(x)y_i}
\end{aligned}
$$

**一点零次插值多项式**为

$$
L_n(x)=y_0
$$

**两点一次插值 (线性插值) 多项式**为

$$
{L_1(x)=\frac{x-x_1}{x_0-x_1}y_0+\frac{x-x_0}{x_1-x_0}y_1}
$$

**三点二次插值 (抛物插值) 多项式**为

$$
L_2(x)=\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}y_0+\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}y_1+\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}y_2
$$
