# React 的一些理念整理
* 为什么我更喜欢React，而不是vue

## Algebraic Effects 代数效应的灵感
>An algebraic effect handler is a programming abstraction for manipulating control-flow in a first-class fashion
```js
try {
  // thorw new Promise()
} catch (e) {
  // 接住了一个promise，等promise解决后继续后续的操作
}
```

## 时间分片

## Subspense

## 程序控制权

## 一些理念
* UI = fn(data)
* vnode = render(state)

* 组件

* 声明式编程
jq是命令式的，他提供api，使用者调用api
react是声明式的，我们提供render方法，提供生命周期方法，react调用我们实现的方法
