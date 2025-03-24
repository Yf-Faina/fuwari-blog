---
title: 误差
published: 2024-03-03
description: ''
image: ''
tags: [学习笔记]
category: '数值分析'
draft: false 
lang: ''
---

提问：数值分析是做什么用的？

输入复杂问题或运算

$$
\sqrt{x},a^x,lnx,A\overrightarrow{x}=\overrightarrow{b},\int_{a}^{b}f(x)dx,\frac{d}{dx}f(x),\dots
$$

通过数值分析转换为简单的加减乘除，通过计算机计算得到原式在某一误差范围内的近似解。

---

学习数值分析课程的**基本要求**

* 掌握算法（数值方法）的基本思想和原理
* 注意方法处理的技巧与计算机的结合，重视误差、稳定性、收敛性等基本理论
* 通过例子，编程实现各种数值方法，并利用其解决实际问题

---

## **误差**

**一、误差**：一个物理量的真实值与计算值之间的差异

1. **来源与分类**

* 从实际问题中抽象出的数学模型——**模型误差(Modeling Error)**
* 通过测量得到模型中参数的值——**观测误差(Measurement Error)**
* 求近似解——**方法误差/阶段误差(Truncation Error)**
* 机器字长有限——**舍入误差(Roundoff Error)**

**例：近似计算$\int_{0}^{1} e^{-x^2} dx$**

**解法之一：将**$e^{-x^2}$**作**$Taylor$**展开后再积分**

$$
\int_{0}^{1} e^{-x^2} dx=\int_{0}^{1}(1-x^2+\frac{x^4}{2!}-\frac{x^6}{3!}+\frac{x^8}{4!}-\cdots)dx
\newline = \underbrace{1-\frac{1}{3}+\frac{1}{2!}\times\frac{1}{5}-\frac{1}{3!}\times\frac{1}{7}}_{S_4}+\underbrace{\frac{1}{4!}\times\frac{1}{9}-\cdots}_{R_4}
$$

取$\int_{0}^{1} e^{-x^2} dx \approx S_4$，则$\frac{1}{4!}\times\frac{1}{9}-\frac{1}{5!}\times\frac{1}{11}+\cdots$称为**截断误差**

这里$\mid R_4 \mid < \frac{1}{4!}\times\frac{1}{9}<0.005$

$$
S_4=1-\frac{1}{3}+\frac{1}{10}-\frac{1}{42}\approx1-0.333+0.1-0.024=0.743
$$

舍入误差$<0.0005\times2=0.001$

计算$\int_{0}^{1} e^{-x^2} dx$的总体误差$<0.005+0.001=0.006$

> **截断误差由截去部分引起，舍入误差由留下部分引起**

2. **误差的传播与积累**

蝴蝶效应是一个例子

**例：计算$I_n=\frac{1}{e}\int_{0}^{1}x^ne^xdx,n=0,1,2,\dots$**

公式一：$I_n=1-n\,I_{n-1}$

注意：本题严格满足该递推公式，也就是不存在公式上的模型误差和截断误差

$$
I_0=\frac{1}{e}\int_{0}^{1}e^xdx=1-\frac{1}{e}\approx0.63212056\xlongequal{\text{记作}}I^*_0
$$

则初始误差$\mid E_0 \mid=\mid I_0-I^*_0\mid<0.5\times10^{-8}$

$$
\frac{1}{e}\int_{0}^{1}x^n\cdot e^0dx<I_n<\frac{1}{e}\int_{0}^{1}x^n\cdot e^1dx \newline \therefore \frac{1}{e(n+1)}<I_n<\frac{1}{n+1} \newline \newline I_1^*=1-1\cdot I_0^*=0.36787944\newline \dots\dots\dots\newline I_{10}^*=1-10\cdot I_9^*=0.08812800\newline I_{11}^*=1-11\cdot I_{10}^*=0.03059200\newline I_{12}^*=1-12\cdot I_{11}^*=0.63289600\newline I_{13}^*=1-13\cdot I_{12}^*=-7.2276480\newline I_{14}^*=1-14\cdot I_{13}^*=94.9594241\newline I_{15}^*=1-15\cdot I_{14}^*=-1423.3914\newline
$$

由关系式$\frac{1}{e(n+1)}<I_n<\frac{1}{n+1}$可知，具有单调递减的单调性，大于$0$并不断逼近。观察列出的结果可观察到从$I_{12}^*$开始的答案不满足单调性。

尽管严格满足递推公式，但是在实际的运算中逐渐失真最终出现不可信答案。因为满足直接法，所以不存在方法设计误差，问题出现在了舍入误差，舍入误差在递推的过程中发生了传播和累计，变得不可控——**数值算法的数值不稳定**。

只有数值稳定的算法才可以在计算机上运行。

考察第$n$步的误差$\mid E_n\mid$

$$
\mid E_n \mid=\mid I_n-I_n^*\mid=\mid (1-nI_{n-1})-(1-nI_{n-1}^*)\mid=n\mid E_{n-1}\mid = \cdots = n!\mid E_0 \mid
$$

误差$\mid E_n\mid$是误差$\mid E_0\mid$的$n!$倍，可见初始的小扰动$\mid E_0 \mid <0.5\times10^{-8}$迅速积累，误差呈递增走势，所以误差不可控。

公式二：$I_n=1-nI_{n-1} \Rightarrow I_{n-1}=\frac{1}{n}(1-I_n)$

**注意：此公式与公式一在理论上是等价的，也就是同样不存在公式设计上的误差**

方法：先估计一个$I_N$，再反推要求的$I_n(n<<N)$

$$
\because \frac{1}{e(N+1)} < I_N < \frac{1}{N+1}
$$

当$N$足够大的时候，该区间的左右端点距离已经极为接近，我们可取该区间中点为近似值

$$
\text{可取} \quad I_N^*=\frac{1}{2}\left[\frac{1}{e(N+1)}+\frac{1}{N+1} \right] \approx I_N
$$

取得$I_N^*$后代入递推公式二
