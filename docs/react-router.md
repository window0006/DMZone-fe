# React Router 尽知尽会

> 无论何时你需要在匹配某个路径的时候绘制一个组件，那么就可以使用Route组件
属性：
* `path`
* `component`
* `exact`
* `strict`：只匹配以斜线结尾的路径。

可以用`component`属性替代的属性
* `render`：`render-prop`的由来
* `children`：返回一个总是会被渲染的子组件？

## 尽知尽会
router相关项目
* `react-router` 作为基础库使用
* `react-router-dom` 使用`react-router`，结合浏览器能力，提供可在浏览使用的api
* `react-router-native`
* `react-router-redux` 已废弃

### 前菜：web单页应用路由基础
想象一下，如果让你做一个router，你会怎么做？

对于hash router，浏览器`window`对象提供了`hashchange`事件。
```js
window.addEventListener('hashchange', function() {
  console.log('The hash has changed!')
}, false);‘
```
每次跳转都直接修改hash就可以了
```js
button.onclick = (e) => {
  window.location.hash = this.path;
  e.preventDefault(); // 这句是用来干什么的？
}
```
而对于borwser router，浏览器`window`对象提供了[popstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)事件，虽然叫`pop`，但是无论是点击浏览器的后退还是前进按钮，都可以触发到。当然，要通过`history.pushState()`方法修改的session history stack才可以，否则就会刷新浏览器页面。

除了手动点击浏览器前进/后退按钮，`history.back()`、`history.forward()`和`history.go()`方法也能触发`popstate`事件。这里要注意`hisotry.pushState()`和`history.replaceState()`方法的调用是不会触发`popstate`事件的。（看起来是只有不修改其内部`session history`的方法才会触发这个事件。

小结一下，这些都是浏览器提供的非传统刷新跳转页面地址的api，是web单页应用跳转路由的基础。

hash router
* window hashchange 事件

brower router
* window popstate 事件
* history.pushState 方法
* history.replaceState 方法
* history.back 方法
* history.forward 方法
* history.go 方法

### 极简router
那么我们可以自己折腾一个破轮子出来玩玩了，毕竟造轮子是学习新技能的一个好方法。

```js
// Route.js
import EventEmitter from './events';

class Router extends EventEmitter {
  sessionStack = [];

  constructor() {
    super();
    this.addEvents();
  }

  addEvents() {
    window.addEventListener('popstate', () => {
      this.emit('popstate');
    }, false);
    // custom events
    const { sessionStack } = this;
    this.on('popstate', () => {
      sessionStack.pop();
    });
    this.on('pushstate', (historyData) => {
      sessionStack.push(historyData);
    });
    this.on('replacestate', (historyData) => {
      sessionStack.pop();
      sessionStack.push(historyData);
    });
  }

  push(path, data, title) {
    const historyData = { data, title, path };
    window.history.pushState(data, title, path);
    this.emit('pushstate', historyData);
  }

  replace(path, data, title) {
    const historyData = { data, title, path };
    window.history.replaceState(data, title, path);
    this.emit('replacestate', historyData);
  }

  pushSessionStack(historyData) {
    this.sessionStack.push(historyData);
  }
}

export default Router;
```
这个模块实例提供了一个事件中心，提供了`push`和`replace`方法，核心能力是修改浏览器地址栏，同时维护一个`session stack`作为页面栈，供后续模块使用。

后续围绕这个核心模型，我们可以再打造周边能力，比如url params（路径解析模块）功能，`<Switch />`，`<Route />`组件、`hooks`等。

### react-router-dom的使用
web项目中一般用`react-router-dom`，而不直接使用`react-router`
```jsx
import { BrowserRouter, Switch, Route } from 'react-router-dom';
<BrowserRouter>
  <Switch>
    <Route path="/" render={() => {...}} />
    ...
  </Switch>
</BrowserRouter>
```
看看BrowserRouter做了什么

BrowserRouter直接渲染了react-router提供的Router组件，传入了history的createBrowserHistory

再看react-router提供的Router组件，只是将各种属性塞进了RouterContext和HistoryContext，再直接渲染了children
```jsx
render() {
  return (
    <RouterContext.Provider
      value={{
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }}
    >
      <HistoryContext.Provider
        children={this.props.children || null}
        value={this.props.history}
      />
    </RouterContext.Provider>
  );
}
```

看看Switch做了什么

Switch做的事情也很简单，对children做一次循环，只返回clone匹配当前url的第一个。

Route也没做什么，只是把component展示了，把render运行了，一大串三元，还是很晕人的
```jsx
return (
  <RouterContext.Provider value={props}>
    {props.match
      ? children
        ? typeof children === "function"
          ? __DEV__
            ? evalChildrenDev(children, props, this.props.path)
            : children(props)
          : children
        : component
        ? React.createElement(component, props)
        : render
        ? render(props)
        : null
      : typeof children === "function"
      ? __DEV__
        ? evalChildrenDev(children, props, this.props.path)
        : children(props)
      : null}
  </RouterContext.Provider>
);
```
withRouter也是只将RouterContext上的属性全部打进组件里面
```jsx
return (
    <RouterContext.Consumer>
      {context => {
        invariant(
          context,
          `You should not use <${displayName} /> outside a <Router>`
        );
        return (
          <Component
            {...remainingProps}
            {...context}
            ref={wrappedComponentRef}
          />
        );
      }}
    </RouterContext.Consumer>
  );
};
```
hooks

从上面能看出，其实关键还是history对象和location信息，都放在context里了

useHistory，直接用useContext从context里面取就好了，location同。

params信息存储在match里面，match也放在context里。


