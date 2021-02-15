# React组件更新机制

## 基础知识

### Component & FunctionComponent
`props` 和 `state` 变化会导致组件重新渲染。

函数组件的 rerender 会比较困扰。原本函数组件的设计理念是 stateless ，只要父组件关注自身的 `state` 就好，但是 hook 出现后让函数组件也拥有了 `state` 。而父组件的每次 `render` 都会导致函数组件被执行。

### PureComponent & React.memo


## 优化逻辑
核心逻辑是要减少「渲染」次数。

## 渲染
也就是类组件`render`的调用以及函数组件的执行。

上面已经总结过，`props` 和 `state` 变化会导致组件重新渲染。而 `props` 其实是来自父组件的，也就是父组件的 `state` ，所以我们关注 `state` 就好了。

## setState
* 类组件
* 函数组件
