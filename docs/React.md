# react 学习
* [setState如何知道该做什么？](https://overreacted.io/zh-hans/how-does-setstate-know-what-to-do/)
* [React Fiber](https://juejin.im/post/5dadc6045188255a270a0f85#heading-0)
## react
>react包仅仅是让你使用 React 的特性，但是它完全不知道这些特性是如何实现的。而渲染器包(react-dom、react-native等)提供了React特性的实现以及平台特定的逻辑。这其中的有些代码是共享的(“协调器”)，但是这就涉及到各个渲染器的实现细节了

## rednerer 渲染器
[构件属于你的渲染器](https://github.com/facebook/react/blob/master/packages/react-reconciler/README.md#practical-examples)

## reconciler 协调器（调度器）
* Reconciliation
* render
  * 返回v-node节点树
* diff逻辑优化
  * 不同类型的节点会有不同的两棵子树
  * 可以通过key来指定稳定给的节点

## react-dom
* 使用`react-reconciler`实现的的一个`renderer`，是将`renderer`和`reconciler`打包在一起后的结果。

`react-dom`会在创建组件实例后，给组件示例设置一个`updater`字段，

## 组件的`setState`实现：
```js
setState(partialState, callback) {
  this.updater.enqueueSetState(
    this,
    partialState,
    callback,
    'setState'
  );
}
```
其实是在委托渲染器创建组件实例，再里面就是渲染器使用调度器创建/更新组件的逻辑了。

## hooks的`useState`是怎么知道要做什么的？
* 类似class组件内的setState，但是使用了一个`dispatcher`属性

```ts
export function useState<S>(initialState: (() => S) | S) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```
渲染器会在渲染组件之前设置`__currentDispatcher`属性

## 实践

### dmz项目
