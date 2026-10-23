---
title: 可变性修饰符
published: 2026-10-23
description: ''
image: ''
tags: [学习笔记]
category: '面向对象'
draft: false 
lang: ''
---
定义：**可变性修饰符（Mutability Modifiers）** 用于定义变量、对象或数据结构在声明/初始化之后，其**状态是否可以被修改**以及**何时确定其值**。

## 引入可变性修饰符的原因？
默认情况下，普通变量是可变的：
```java
int count = 10;
count = 20; // 允许重新赋值
```
但在复杂应用中，过度使用可变变量可能会导致：
1. 难以追踪状态变化：多处代码修改同一个变量，引发意外逻辑Bug
2. 并发不安全：多线程或并发环境下，可变状态容易产生竞争条件
3. 性能优化困难：在flutter中，不可变对象可以帮助框架识别组件是否需要重新进行绘制，从而大幅度节省CPU/GPU资源
因此，引入不可变机制，主要分为两个层级：**运行时不可变**和**编译时不可变**。

## `final` 运行时不可变
`final`是运行时不可变的（只读/ Single Assignment），其修饰的变量**只能被赋值一次**，即在运行时计算确定。
- 初始化时机：声明时直接赋值，或者在[构造函数](/posts/java_object/)中初始化
- 主要用途：修饰在程序运行过程中确定后就不再改变的数据，例如从网络接口读取的配置、用户输入的表单数据、传入 Widget 的参数等。
```dart
// 1. 声明时赋值（运行时获取当前时间）
final DateTime now = DateTime.now();

// 2. 在构造函数中赋值
class User {
  final String name; // 实例化后不能修改 name
  User(this.name);
}
```

## `const` 编译时不可变
`const` 修饰的变量不仅**只能赋值一次**，而且其值必须在编译期（Compile time）就完全确定。
- **初始化时机**：编译阶段。其值必须是字面量（如字符串、数字）或其他已知的 `const` 表达式。
- **主要用途**：定义硬编码常量（如 API URL、固定颜色、数学常数），以及在 Flutter 中修饰**不可变组件（UI 组件树优化）**。

> [!TIP] 内存复用机制
>
> Dart中的`const`对象在内存中具有**规范化**特性，相同参数的`const`对象在内存中只会创建一次副本并复用
> ```dart
> var a = const [1, 2];
> var b = const [1, 2];
> print(identical(a, b)); // 输出 true！它们指向相同的内存地址
> ```

## `late`延迟初始化（Dart）
`late` 主要解决“变量非空且不能立即赋值”的问题，常与 `final` 结合使用。

**主要用途**：
1. **延迟初始化**：变量在声明时不赋值，直到**第一次使用时**才执行初始化逻辑。
2. **非空保证**：向 Dart 编译器承诺“该变量在使用前一定会赋值”，避免写成可为空的类型。
```dart
class ProfileScreen {
  // late final: 只能赋值一次，且延迟到第一次调用 _loadUserData() 时才执行
  late final String userData = _loadUserData();

  String _loadUserData() {
    print('加载用户数据中...');
    return 'User Profile Data';
  }
}
```

