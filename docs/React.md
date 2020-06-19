# react 学习
* [setState如何知道该做什么？](https://overreacted.io/zh-hans/how-does-setstate-know-what-to-do/)
* [React Fiber](https://juejin.im/post/5dadc6045188255a270a0f85#heading-0)
## react
>react包仅仅是让你使用 React 的特性，但是它完全不知道这些特性是如何实现的。而渲染器包(react-dom、react-native等)提供了React特性的实现以及平台特定的逻辑。这其中的有些代码是共享的(“协调器”)，但是这就涉及到各个渲染器的实现细节了

## rednerer 渲染器
[构件属于你的渲染器](https://github.com/facebook/react/blob/master/packages/react-reconciler/README.md#practical-examples)

## reconciler 协调器（调度器）
* Reconciliation
  * React会递归对比virtual dom树，找出需要更新的节点，v15会同步更新他们。这期间会导致React长时间霸占浏览器资源，导致卡顿。
* render
  * 返回v-node节点树
* diff逻辑优化
  * 不同类型的节点会有不同的两棵子树
  * 可以通过key来指定稳定给的节点

the tree of immutable React elements: Virtual dom
the tree of iternal instance: components, DOM nodes, etc. use to keep the state.

When updates are queued, they are just added to the queue of updates to process on a Fiber node.

React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

浏览器通过`requestIdleCallback`给程序分配执行时间片，程序在这个时间内执行完毕然后返回控制权

执行一个任务，完成后检查是否超时，如果超时就暂停后续任务，先返回控制权


## react-dom
* 使用`react-reconciler`实现的一个`renderer`，是将`renderer`和`reconciler`打包在一起后的结果。

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

* every renderer sets a special field on the created class: `updater`
renderer set this field after creating an instance of your class.

```js
setState(partialState, callback) {
  // Use the `updater` field to talk back to the renderer!
  this.updater.enqueueSetState(this, partialState, callback);
}
```
```js
enqueueSetState(inst, payload, callback) {
  const fiber = getInstance(inst);
  const currentTime = requestCurrentTime();
  const expirationTime = computeExpirationForFiber(currentTime, fiber);

  const update = createUpdate(expirationTime);
  update.payload = payload;
  if (callback !== undefined && callback !== null) {
    if (__DEV__) {
      warnOnInvalidCallback(callback, 'setState');
    }
    update.callback = callback;
  }

  flushPassiveEffects();
  enqueueUpdate(fiber, update);
  scheduleWork(fiber, expirationTime);
},
```


## hooks的`useState`是怎么知道要做什么的？
* 类似class组件内的setState，但是使用了一个`dispatcher`属性

```ts
export function useState<S>(initialState: (() => S) | S) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```
renderer会在渲染组件之前设置`React.__currentDispatcher`属性



## 实践

### 按需加载的路由
```jsx
<Suspense fallback={<Loading/>}>
  {
    React.lazy(() => import(/* webpackChunkName: 'Clock' */ './Clock'))
  }
</Suspense>
```
> 这种方式目前不支持SSR

### 错误边界处理
> 组件发生错误的时候会导致整个组件树都被卸载，会白屏。

`umi`的路由级别的动态加载思路，其实还是通过cli工具转换了router配置，将`component`配置的路径，都用dynamic方法包裹了。

### antd的使用
* 样式引入问题
* 按需引入问题
要配合`babel`来做。先使用`ts-loader`处理tsx，再使用`babel-loader`处理，`.babelrc`文件内还需要配置`plugins`字段，使用`import`插件：
```json
{
  // ...
  "plugins": [
    // ...
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": "css"
      },
      "antd"
    ]
  ]
}

```

### dmz项目
