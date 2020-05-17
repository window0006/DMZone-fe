# ts
## ts基础
* 类型系统
* 类型推断

## 泛型（类型变量）

```ts
type Fn<T> = T extends (arg: T) => infer P ? P : any;
```
* `T`类型变量
* 泛型的函数：Fn<T>，可通过`type`关键字生命
* `infer`关键字，声明一个可推断的类型``
* `Conditional Types`
  * T extends U ? X : Y