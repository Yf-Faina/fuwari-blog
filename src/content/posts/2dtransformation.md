---
title: 2D变换
published: 2026-08-05
description: '基础变换（旋转、平移、对称、缩放）'
image: ''
tags: [学习笔记]
category: '计算机图像学'
draft: false 
lang: ''
---
Transformation
- modeling 模型变换
- viewing 观测变换
   - View 视图/Camera transformation
   - Projection transformation 投影变换
     - Orthographic projection 正交投影变换
     - Perspective projection  透视投影变换

## Scale 缩放
![](https://img.664558.xyz/9c58f3a0a787b24075dfb82f07452f7b.png)
若设缩放变换后的图像上的点坐标为$(x',y')$，则可得：
$$

\begin{align}
x^{\prime} & =Sx \\
y^{\prime} & =Sy
\end{align}
$$
其中，$S$为缩放系数，将上式子写为矩阵形式，可得：
$$
\begin{bmatrix}
x^{\prime} \\
y^{\prime}
\end{bmatrix}=
\begin{bmatrix}
S_{x} & 0 \\
0 & S_y
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$
称由缩放系数组成矩阵为**缩放矩阵**
>[!tip]
> 对应$x$和$y$的缩放系数$S_x$和$S_y$可不相等，相等时为等比例缩放，不相等时为自由缩放
## Reflection 对称
![](https://img.664558.xyz/bd162df57ff6ffc562e8eab1883e6d6c.png)
若设沿$y$轴对称变换后的图像上的点坐标为$(x',y')$，则可得：
$$
\begin{align}
x' &= -x \\
y' &= y
\end{align}
$$
将上式子写为矩阵形式，可得：
$$
\begin{bmatrix} x' \\ y'\end{bmatrix} = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y\end{bmatrix}
$$
## Shear 切变
![](https://img.664558.xyz/226e7595c46a41a2994aa1e273430223.png)
经过观察可以发现， 切变后的图像：
- 当 y=0 时，水平位移为 0
- 当 y=1 时，水平位移为 a
- 垂直位移始终为 0
由此，若设切变后图像上的点坐标为$(x',y')$分析可得：
$$
\begin{align}
x’&=x+ay \\
y’&=y
\end{align}
$$
将上式子写为矩阵形式，可得：
$$
\begin{bmatrix} x' \\ y'\end{bmatrix} = \begin{bmatrix} 1 & a \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y\end{bmatrix}
$$
## Rotate 旋转
### 逆时针
![](https://img.664558.xyz/2772abe2f9cb0b4ae0d63c6654c473c7.png)
旋转矩阵（注意上图的旋转方向是**逆时针**）：
$$
R_{\theta} = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}
$$
### 顺时针
顺时针旋转方向的旋转矩阵应该如何推导得到？
如果$R_{\theta}$是逆时针旋转$\theta$角度，那么$R_{-\theta}$即为顺时针旋转$\theta$角度，将$-\theta$带入逆时针旋转矩阵得到：
$$
R_{-\theta} = \begin{bmatrix} \cos(-\theta) & -\sin(-\theta) \\ \sin(-\theta) & \cos(-\theta)\end{bmatrix}
$$
由三角函数性质：
$$
\cos(-\theta)=\cos\theta,\quad\quad \sin(-\theta)=-\sin\theta
$$
得到：
$$
R_{-\theta}=\begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix}
$$
### 结论
观察可以发现，矩阵$R_{-\theta}=R_{\theta}^T$，从定义上来说，逆时针旋转与顺时针旋转互为逆操作，即$R_{-\theta}=R_{\theta}^{-1}$
*线性代数中规定，当一个矩阵的逆矩阵与转置矩阵相等时，该矩阵即为正交矩阵*
## 线性变换
以上几种变换，可以发现，皆可写为如下形式的线性组合：
$$
\begin{align}
x'&=ax+by \\
y'&=cx+dy
\end{align}
$$
化为矩阵形式即为：
$$
\begin{align}
\begin{bmatrix} x' \\ y'\end{bmatrix} &= \begin{bmatrix} a&b\\c&d\end{bmatrix}\begin{bmatrix} x\\y\end{bmatrix} \\
x'&=Mx
\end{align}
$$
我们认为以上这种通过一个矩阵乘以输入坐标从而得到输出坐标的变换称为**线性变换**
**缩放、对称、切变、旋转都是线性变换**
## Homogenous Coordinates 齐次坐标
### Translation 平移变换
![](https://img.664558.xyz/dac1e1dbb0343e99b9694f0559ecd82a.png)
设平移变换后的图像上的点坐标为$(x',y')$，则可得：
$$
\begin{align}
x' &= x+t_x \\
y'&= y+t_y
\end{align}
$$
将上式子写为矩阵形式，可得：
$$
\begin{align}
\begin{bmatrix} x' \\ y'\end{bmatrix} &= \begin{bmatrix} a&b\\c&d\end{bmatrix}\begin{bmatrix} x\\y\end{bmatrix} + \begin{bmatrix} t_x\\ t_y\end{bmatrix}
\end{align}
$$
>[!info]
> 平移变换不是线性变换
---

为了让所有的变换都表示为一个矩阵乘以向量的形式，我们引入齐次坐标

在齐次坐标下，设二维点Point为$(x,y,1)^T$，二维向量Vector为$(x,y,0)^T$

证：在二维点和向量中人为添加数字$1$和$0$的意义
设二维变换矩阵为：
$$
\begin{bmatrix} a & b & t_x \\ c  & d & t_y \\ 0 & 0 & 1\end{bmatrix}
$$
用该矩阵对向量$(x,y,0)^T$做变换，即：
$$
\begin{align}
\begin{bmatrix} a & b & t_x \\ c  & d & t_y \\ 0 & 0 & 1\end{bmatrix}
\begin{bmatrix} x \\ y \\ 0\end{bmatrix}= \begin{bmatrix} ax+by+0\cdot t_x \\ cx+dy+ 0\cdot t_y \\ 0\cdot x+0\cdot y+ 1\cdot 0\end{bmatrix} \text{得} \begin{bmatrix} ax+by \\ cx+dy \\ 0\end{bmatrix}
\end{align}
$$
$\therefore$  向量只被线性变换影响，不受平移变换影响，符合向量具有平移不变形的性质。

- vector + vector = vector
- point - point = vector
- point + vector = point 
- point + point = 中点

在两点相加中，可以发现数字由$1+1$变为$2$，故对于点，我们引入更广泛的设法：$(x,y,w)^T$在$w\neq0$时表示的是$(\dfrac{x}{w},\dfrac{y}{w},1)^T$的点

## 仿射(Affine)变换 
> [维基百科](https://zh.wikipedia.org/wiki/%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2)：**仿射变换**（Affine transformation），又称**仿射映射**，是指在几何中，对一个向量空间进行一次线性变换并接上一个平移，变换为另一个向量空间。

二维变换矩阵对二维点的变换即为仿射变换：
$$
\begin{bmatrix} x' \\ y' \\ 1\end{bmatrix} = \begin{bmatrix} a&b&t_x \\ c&d&t_y \\ 0&0&1\end{bmatrix} \begin{bmatrix} x \\ y \\ 1\end{bmatrix}
$$
