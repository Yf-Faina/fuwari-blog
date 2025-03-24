---
title: 函数逼近(Approximation Theory)
published: 2024-04-17
description: ''
image: ''
tags: [学习笔记]
category: '数值分析'
draft: false 
lang: ''
---
### 魏尔斯特拉斯(Weierstrass)逼近定理

闭区间上的连续函数可用**多项式**一致逼近

即$\forall    \varepsilon > 0$，存在多项式$P_m(x)$，使得$|f(x)-P_m(x)|<\varepsilon$对一切$x\in[a,b]$成立。

:::important

一致逼近：$\left\|f(x)-y(x)\right\|_\infty=\max_{a\leq x\leq b}\left|f(x)-y(x)\right|$
:::

### 范数与赋范线性空间

#### 线性空间也称为向量空间

**空间**：表示有很多向量，有一整个空间的向量，但并不是任意向量的组合都能被称为空间。**空间必须满足一定的规则，必须能够进行加法和数乘运算，必须能够进行线性组合**

例：$R^2$是所有二维实数向量的空间，在这个空间中，每个向量都由两个实数构成，通常表示为 $(x, y)$，其中 $x$ 和 $y$ 分别表示向量在 $x$ 轴和 $y$ 轴上的分量。$R^2$空间像是一个平面

以此类推，我们可以得到$R^3$、$R^4$……等向量空间

$R^n$空间就指的是$n$维实数向量空间，它包含了所有由 n 个实数组成的有序元组，通常表示为 $(x_1, x_2, ..., x_n)$，其中每个$x$ 表示向量在相应维度上的分量。$R^n$空间是$n$维笛卡尔坐标系中的空间，其中每个坐标轴都是一条直线，原点是所有坐标轴的交点。

#### 向量空间有些什么性质呢？

1. **封闭性**：线性空间中的任意两个向量进行加法运算后的结果仍然属于该空间。换句话说，线性空间对于加法运算是封闭的。

   $$
   \forall u,v\in V,u+v\in V
   $$
2. **结合律**：对于线性空间中的任意三个向量$u$、$v$ 和 $w$，加法满足结合律

   $$
   \forall u,v,w\in V，(u+v)+w=u+(v+w)
   $$
3. **存在零向量**：线性空间中存在一个特殊的零向量，记作 $0$，满足

   $$
   \exists 0\in V,\forall u\in V,u+0=u
   $$
4. **存在负向量**：对于线性空间中的任意一个向量 $u$，存在一个特殊的负向量，记作 $-u$，满足

   $$
   \begin{aligned}\forall u\in V,\exists-u\in V,u+(-u)=0\end{aligned}
   $$
5. **乘法单位元性质**：对于线性空间中的任意标量 $\alpha$和向量 $v$，有

   $$
   1\cdot\alpha=\alpha
   $$
6. **数乘分配律（向量）**：对于线性空间中的任意两个标量 $k$、$l$和任意向量 $u$，数乘运算对于向量的加法满足分配律

   $$
   \forall k \forall l\in\mathbb{R},\quad\forall u\in V,\quad u\cdot(k+l)=k\cdot u+l\cdot u
   $$
7. **数乘结合律**：对于线性空间中的任意标量 $k$和任意两个向量$u$和$v$，数乘运算满足结合律

   $$
   \forall k\in\mathbb{R},\quad\forall u,v\in V,\quad k\cdot(u+v)=k\cdot u+k\cdot v
   $$

#### 范数

为了对==线性空间中元素大小进行衡量==，需要引进范数定义，它是$\mathbb{R}^n$空间中向量长度概念的直接推广

设$S$为线性空间，$x \in S$ ，若存在唯一实数 $\left\|\cdot\right\|$，满足条件：

- $||x||\ge0$，当且仅当$x=0$时，$||x||=0$；（正定性）
- $||ax||=|\alpha|\quad||x||,\alpha\in\mathbb{R}$；（齐次性）
- $||x+y||\le||x||+||y||,x,y\in S$；（三角不等式）

则称$||\cdot||$为线性空间$S$上的**范数**，$S$与$||\cdot||$一起称为**赋范线性空间**，记为$X$

例如，对于在$\mathbb{R}^n$上的向量$x=(x_1,x_2,...,x_n)^T\in\mathbb{R}^n$,有三种常用范数：

$\|x\|_{\infty}=\max_{1\leqslant i\leqslant n}|x_{i}|$,称为$\infty$-范数或最大范数

$\|x\|_{1}=\sum_{i=1}^{n}|x_{i}|$,称为 $1-$范数

$||x||_{2}=\left(\sum_{i=1}^{n}x_{i}^{2}\right)^{\frac{1}{2}}$,称为 $2-$范数

类似地对连续函数空间 $C[a,b]$,若 $f\in C[a,b]$可定义三种常用范数如下：

 $\left\|f\right\|_{\infty}=\max_{a\leqslant x\leqslant b}\left|f\left(x\right)\right|$,称为$\infty-$范数

 $\|f\|_{1}=\int_{a}^{b}|f\left(x\right)|dx$,称为 $1-$范数

$\|f\|_{2}=\left(\int_{a}^{b}f^{2}\left(x\right)\mathrm{d}x\right)^{\frac{1}{2}}$,称为 $2-$范数

### 内积和内积空间

  设在区间$(a,b)$上的非负函数$\rho(x)$，满足条件：

- $\int_{a}^{b}|x|^n\rho (x)dx$存在且为有限值，$(n=0,1\dots$)
- 对非负的连续函数$g(x)$，若$\int_{a}^{b}g(x)\rho (x)dx=0$，则$g(x)\equiv0$

则称$\rho(x)$为$(a,b)$上的**权函数**

---

设$f(x),g(x)\in C[a,b]$，$\rho(x)$是$[a,b]$上的权函数，积分

$$
(f,b)=\int_{a}^{b}\rho(x)f(x)g(x)dx
$$

称为函数$f(x)$与$g(x)$在$[a,b]$上的**内积**（内积是一个算出来的数）

满足内积定义的函数空间就称为**内积空间**。在连续函数空间$C[a,b]$上定义了内积就形成一个内积空间。

**内积空间满足四条公理**：

1. $(f,g)=(g,f)$              交换率
2. $(cf,g)=c(f,g) \text{,}c$为常数                  线性性
3. $(f_1+f_2,g)=(f_1,g)+(f_2,g)$           线性性
4. $(f,f)\ge0$，当且仅当$f=0$时$(f,f)=0$               正定性

:::tip

用定积分可以证明满足上述四条公理

:::

---

设$\vec{f},\vec{g}$是$R^n$中的向量
则 $\vec{f}=(f_1,f_2,...,f_n)^T,\vec{g}=(g_1,g_2,...,g_n)^T$ 其内积

$$
(\vec{f},\vec{g})=\sum_{k=1}^nf_kg_k
$$

向量$\vec{f}\in\mathbb{R}^n$的**模 (范数)** 定义为$\left\|\vec{f}\right\|_2=(\sum_{k=1}^nf_k^2)^{\frac12}$将它推广到任何内积空间中就有下面定义:

即对于$f(x)\in C[a,b]$，记

$$
\parallel f \parallel_2 = \sqrt{\int_{a}^{b}\rho(x)f^2(x)dx}=\sqrt{(f,f)}
$$

称为$f(x)$的**欧式范数**

#### 定理

对任何$f,g\in C[a,b]$，下列结论成立：

- $|(f,g)|\le \parallel f\parallel_2 \parallel g\parallel_2$  此式称为柯西——施瓦茨(Cauchy-Schwarz)不等式
- $\parallel f+g\parallel_2 \le \parallel f \parallel_2+\parallel g\parallel_2$ （三角不等式）
- $\parallel f+g\parallel_2^2+\parallel f-g\parallel_2^2 = 2(\parallel f\parallel_2^2+\parallel g\parallel_2^2)$ （平行四边形定律）

### 正交函数族与正交多项式

定义 若$f(x),g(x)\in C[a,b]$,满足

$$
(f,g)=\int_a^b\rho(x)f(x)g(x)dx=0
$$

则称$f$与$g$在$[a,b]$上带权 $\rho(x)$正交，若函数族

$$
\varphi_0(x),\varphi_1(x),\cdots,\varphi_n(x),\cdots
$$

满足关系

$$
\begin{aligned}&(\varphi_{j},\varphi_{k})=\int_{a}^{b}\rho(x)\varphi_{j}(x)\varphi_{k}(x)dx=\begin{cases}\:0,&j\neq k\\A_{k}>0,&j=k\end{cases}\end{aligned}
$$

就称$\{\varphi_k\}$是$[a,b]$上带权 $\rho(x)$的正交函数族；若 $A_k\equiv1$, 就称之为标准正交函数族。

### 线性无关函数族

函数族$\varphi_0(x),\varphi_1(x),\dots,\varphi_n(x),\dots$   满足条件：

其中任意函数的线性组合

$$
a_0\varphi_0(x)+a_1\varphi_1(x)+\cdots+a_{n-1}\varphi_{n-1}(x)=0
$$

对任意$x\in[a,b]$成立当且仅当$a_0=a_1=\cdots=a_{n-1}=0$时成立，则称在$[a,b]$上是**线性无关**的，若函数族$\{\varphi_k\}(k=0,1,\cdots)$中的仍和有限个$\varphi_k$线性无关，则称$\{\varphi_k\}$为线性无关函数族。

#### 函数族线性无关的充要条件？

函数族$\{\varphi_k\}(k=0,1,\cdots,n-1)$在$[a,b]$上线性无关的==充要条件==是：格拉姆$(Cramer)$行列式$G_{n-1}\neq0$

$$
G_{n-1}=G(\varphi_0, \varphi_1,\cdots,\varphi_{n-1})=\begin{vmatrix}(\varphi_0,\varphi_0)&(\varphi_0,\varphi_1)&\cdots&(\varphi_0,\varphi_{n-1})\\(\varphi_1,\varphi_0)&(\varphi_1,\varphi_1)&\cdots&(\varphi_1,\varphi_{n-1})\\\cdots\cdots&&\cdots\\(\varphi_{n-1},\varphi_0)&(\varphi_{n-1},\varphi_1)&\cdots&(\varphi_{n-1},\varphi_{n-1})\end{vmatrix}
$$
