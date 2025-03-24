---
title: 函数的最佳平方逼近
published: 2024-04-18
description: ''
image: ''
tags: [学习笔记]
category: '数值分析'
draft: false 
lang: ''
---
研究在区间$[a,b]$上一般的最佳平方逼近问题，对$f(x)\in C[a,b]$及$C[a,b]$中的一个子集$\varphi=span\{\varphi_0(x),\varphi_1(x),\cdots,\varphi_n(x)\}$，若存在$S^*(x)\in\varphi$，使

$$
\begin{equation}
\begin{aligned}
\parallel f(x)-S^*(x)\parallel_2^2&=\mathop{\min}_{S(x)\in\varphi}\parallel f(x)-S(x)\parallel_2^2 \\&=\mathop{\min}_{S(x)\in\varphi}\int_a^b\varphi(x)[f(x)-S(x)]^2dx
\end{aligned}
\end{equation}
$$

则称$S^*(x)$使$f(x)$在子集$\varphi\subset C[a,b]$中的**最佳平方逼近函数**

为了求$S^*(x)$，可等价于求多元函数

$$
I(a_0,a_1,\cdots,a_n)=\int_a^b\rho(x)\left[\sum_{j=0}^{n}a_j\varphi_j(x)-f(x)\right]^2dx
$$

的**最小值**问题

为了确定参数 $a_k\quad(k=0,1,\cdots,n)$ ,由多元函数极值存在的必要条件，有

$$
\begin{aligned}
&\frac{\partial I}{\partial a_k}=0\quad(k=0,1,\cdots,n)
&\\&\frac{\partial I}{\partial u_k}=2\int_a^b\rho(x)\biggl[\sum_{j=0}^na_j\varphi_j(x)-f(x)\biggr]\varphi_k(x)dx=0\\&&(k=0,1,\cdots,n)\\&\text{即有}\sum_{j=0}^n(\varphi_j,\varphi_k)a_j=(f,\varphi_k),\quad(k=0,1,\cdots,n)
\end{aligned}
$$

而对应$\sum_{j=0}^n(\varphi_j,\varphi_k)a_j=(f,\varphi_k),\quad(k=0,1,\cdots,n)$即为：

$$
\begin{bmatrix}
(\varphi_0,\varphi_0) & (\varphi_0,\varphi_1) & \cdots & (\varphi_0,\varphi_n) \\
(\varphi_1,\varphi_0) & (\varphi_1,\varphi_1) & \cdots & (\varphi_1,\varphi_n) \\
\vdots & \vdots & \vdots & \vdots \\
(\varphi_n,\varphi_0) & (\varphi_n,\varphi_1) & \cdots & (\varphi_n,\varphi_n)
\end{bmatrix}
{\color{red}{\begin{bmatrix}
\textcolor{red}{a_0} \\
\textcolor{red}{a_1} \\
\vdots \\
\textcolor{red}{a_n}
\end{bmatrix}}}
=
\begin{bmatrix}
(\varphi_0,f) \\
(\varphi_1,f) \\
\vdots \\
(\varphi_n,f)
\end{bmatrix}
$$

红色部分即为所求。这是关于未知数$a_0,a_1,\cdots,a_n$的线性代数方程组，称为**法方程组**，由于$\varphi_0,\varphi_1,\cdots,\varphi_n$线性无关，故系数行列式$G(\varphi_0,\varphi_1,\cdots,\varphi_n)\neq0$，于是方程组有唯一解$a_k=a_k^*(k=0,1,\cdots,n)$，从而得到

$$
S^*(x)=a_0^*\varphi_0(x)+\cdots+a_n^*\varphi_n(x)
$$
