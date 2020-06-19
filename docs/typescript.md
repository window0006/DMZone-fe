# ts
## ts基础
* 类型系统
* 类型推断

> a type variable, a special kind of variable that works on types rather than values.

## 泛型（类型变量）
<> 用来声明类型变量
* `泛型操作符`：类型系统中的函数，可以使用`type`简单定义
```ts
type foo<T> = T;

type foo<T extends string = 'hello world'> = T;

```
* TS类型系统支持条件判断


```ts
type Fn<T> = T extends (arg: T) => infer P ? P : any;
```
* `T`类型变量
* 泛型的函数：Fn<T>，可通过`type`关键字生命
* `infer`关键字，声明一个可推断的类型``
* `Conditional Types`
  * T extends U ? X : Y

* 泛型接口
* 泛型类
* 泛型变量 <T, K, V, E>
  * T type
  * K key
  * V vaule
  * E element

## 泛型工具基础
### typeof

### keyof
### in
### infer
### extends

## TS内置的泛型工具
