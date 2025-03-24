---
title: 暑假集训第一篇周记（7月15日-7月16日）
published: 2023-07-16
description: ''
image: ''
tags: [周记]
category: '暑假集训'
draft: false 
lang: ''
---
## 部分题目详细分析与总结

### **第一题：A - A+B for Input-Output Practice (I)**

**基本题意**：输入不定行数的数据，每行数据存在一对$a$和$b$，计算$a+b$的值

**难点**：数据不定行，在不出现数据时结束，有两种写法：

 1.` while(~scanf("%d%d",&a,&b))`

 2.`while(scanf("%d%d",&a,&b) != EOF)  `

这里推荐第一种 😄

```c
#include<stdio.h>
int main(){
    //用两个数组分别存入a和b的值，然后再用一个数组存入a+b的值，最后输出这个数组
    inta[1000],b[1000],c[1000];
    int d,e;
    int count =0;
    while(~scanf("%d%d",&d,&e)){
        a[count]=d+e;
        count++;
    }
    for(int i=0;i<count;i++){
        printf("%d\n",a[i]);
    }
    return 0;
}
```

出现**特殊字符**结束的情况（例如以$0$为结束符号）可以修改为：`while(~scanf("%d%d",&n) && n)`

---

### **第二题：F - A+B for Input-Output Practice (VI)**

**基本题意**：输入不定行数据，每行数据以数据$n$开头，后接$n$个整型数据，计算每行整型数据的和

**难点**：采用 **计数器 `count`** 统计出现数据有几行，嵌套循环 获取并计算数据和

```c
#include<stdio.h>
int main(){
    int n,count=0;
    int sum[1000] = {0};//该数组用来存放每行计算得出的和
    while(~scanf("%d",&n)){
        int a;
        for(int i = 0;i < n; i++){//因为已知需要计算的数据为n个所以使用for循环
          scanf("%d",&a);
          sum[count] += a;
        }
           count++; //计数（行数）
    }
    for(int i = 0;i < count; i++){
      printf("%d\n",sum[i]);
    }
    return 0;
}
```

---

### **第三题：I - Download Manager**

**基本题意**：要求实现一个下载管理器的行为模拟，计算下载所有文件所需的总时间。

输入包含多个测试用例，每个测试用例由三个整数$T$、$n$和$B$组成。其中，$T$表示要下载的文件数量，$n$表示可以同时下载的文件数量，$B$表示可用的总带宽。

 对于每个测试用例，接下来的T行描述每个文件的大小和已完成的百分比。文件大小由浮点数$S$表示，已完成的百分比由整数$P$表示。

我们需要计算这些文件全部下载下来需要的总时间

**难点**：题目比较坑人，挖了一个大坑，实际上$n$（同时可下载的文件数量）是一个误导数据，我们只需计算文件的总大小除以宽带总量即可得总下载时间

*又及：该死的长长英文题干让人看着特烦，消耗耐心*

```c
#include<stdio.h>
int main(){
    int n,m,s; //n为文件总数，s为下载速度
    float x,y;
    int count=0;
    while(~scanf("%d%d%d",&n,&m,&s)&&(n || m || s)){
        float sum = 0.0;
        if(n==0&&m==0&&s==0) break;
        else{
           for(int i=0;i<n;i++){
              scanf("%f%f",&x,&y);
              sum += x*(1-y/100);  //计算总大小
           }
        }
        count++;
        printf("case %d: %.2f\n\n",count,sum/s);
    }
    return 0;
}

```

---

### **第四题：A - Together （枚举）**

**基本题意**：主要思路是使用计数排序和枚举范围的方式来解决问题，给出$n$个数，可以对每一个数做三种操作$a$，$a+1$,$a-1$，求所有操作完成后出现次数最多的数的个数。

**难点**：枚举范围很大，采用如冒泡排序等排序方式进行排序会出现运行超时的错误

```c
#include<stdio.h>
constint MAX_RANGE = 100005; // 数组元素范围的最大值
int count_arr(int a[], int n, int num);
int main(){
    int n;
    int a[MAX_RANGE];
    for (int i = 0; i < MAX_RANGE; i++) {
        a[i] = 0; // 初始化数组元素为零
    }
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int ai;
        scanf("%d", &ai);
        a[ai]++;
    }//通过读取输入，将数组 a 作为计数排序的辅助数组。对于每个输入的元素 ai，将对应位置的 a[ai] 的计数加一
    int max = 0;
    for (int i = 0; i < MAX_RANGE; i++) {
        int count = count_arr(a, MAX_RANGE, i);
        if (count > max)
            max = count;
    }
    printf("%d", max);
    return 0;
}
//遍历 MAX_RANGE 范围内的所有元素来进行枚举。对于每个元素 i，调用 count_arr 函数来计算与 i 相等的元素个数
int count_arr(int a[], int n, int num){
    if (num < 1 || num >= n)
        return 0;
    else
        return a[num-1] + a[num] + a[num+1];
}

```

### **第五题：E - Number Box （枚举）**

**基本思路**：

1. 首先读取输入的 $N$ 和网格上的数字。
2. 针对每个方向，按照该方向进行连续移动 $N-1$ 次，并记录经过的方格上的数字。
3. 对于每个方向，将经过的方格上的数字按照访问顺序从左到右连接起来，形成一个整数。
4. 从所有方向中选择形成的整数中的最大值作为答案。

**难点**：通过设置 `int dx[8] = {0, 0, -1, 1, -1, -1, 1, 1};` `int dy[8] = {-1, 1, 0, 0, -1, 1, -1, 1}; `来设置方向，同时使用 `(x + dx[i] + N) % N` 和 `(y + dy[i] + N) % N` 来处理网格边界的循环移动，确保方格的坐标始终在合法范围内

```c
#include<stdio.h>
typedef longlong ll;
int main() {
    int N;
    scanf("%d", &N);
    int a[10][10] = {0};
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            scanf("%1d", &a[i][j]);
        }
    }
    // 定义方向的增量
    int dx[8] = {1, 1, 0, -1, -1, -1, 0, 1};
    int dy[8] = {0, 1, 1, 1, 0, -1, -1, -1};
    ll max = -1;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {  //枚举起点的所有可能性
            for (int k = 0; k < 8; k++) {  //枚举所有的可能方向
                int x = i, y = j;
                ll ans = 0;
                for (int d = 0; d < N; d++) {
                    ans = ans * 10 + a[x][y];//连接数字
                    x = (x + dx[k] + N) % N;// 循环网格的边界处理
                    y = (y + dy[k] + N) % N;
                }
                max = (max > ans) ? max : ans;// 计算两个整数的较大值
            }
        }
    }
    printf("%lld", max);
    return 0;
}

```
