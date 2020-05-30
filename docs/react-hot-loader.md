# 如何实现React的热更新

## webpack热更方案
* webpack第三方loader
* webpack配置使用`webpack.HotModuleReplacementPlugin`
* devServer配置开启`hot: true`
* 业务模块根据`module.hot`，使用`module.hot.accept('[modulename]', callback)`运行热更逻辑
  * prod环境下`module.hot`会是`undefined`，在编译阶段会被`UglifyJS`移除

这个`callback`不容易写，业务模块需要实现更新方法，每次更新前要考虑移除副作用，

### 如何接收到新的模块方法
self-accept模块
* 有更新的时候当前模块（当前文件）会自动重新运行。

parent-accept模块
* 有更新的模块（当前或者import进来的子模块）时，对应模块会被重新执行，更新对应的模块引用，最后再执行callback。

## react-hot-loader
> 可以在生产环境代码中使用react-hot-laoder，生产环境中是不会生效的
```json
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```
根组件中使用`hot`方法
```jsx
import { hot } from 'react-hot-loader/root';
import App from './App';

export default hot(App);
```