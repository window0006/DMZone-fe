# Babel
* 转译（transpiling）工具 es5 -> es6
* 基于 babelon，解析 js 源码，得到 ast 
* 支持语法扩展，比如 React jsx
* 插件机制，一切都是插件

## `babel-cli`
```shell
npm install --global babel-cli

babel my-file.js

babel example.js --out-file compiled.js
babel example.js -o compiled.js

babel src --out-dir lib
babel src -d lib
```

## `babel-register`
```js
require("babel-register");
require("./index.js");
```
需要编译的是 index.js 文件，通过新增一个 reqister.js 文件，在require 要编译的文件之前，先require babel-register。

## `babel-node`
代替 node 命令运行 js 程序。
```shell
npm install -g babel-cli
babel-node script.js
```

## `babel-core`
`api` 包。
```sh
npm install babel-core --save-dev
```
```js
const babel = require("babel-core");
const { code, map, ast } = babel.transform('console.log("inline code")', options);

babel.transformFile('filename.js', options, (error, { code, map, ast }) => { ... });
const { code, map, ast } = babel.transformFileSync('filename.js', options);

// 直接从已有的 ast 中进行转换
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

## .babelrc

> 通过安装 插件（plugins） 或者 预设（presets） 来指示 babel 对源码做什么修改。一般使用预设就够了。

### presets
> js 提案相关：babel-preset-stage-1 依赖 babel-preset-stage-2，后者又依赖 babel-preset-stage-3。


```sh
npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-2
```

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ],
  "plugins": []
}
```

babel-polyfill 使用
```sh
npm install --save babel-polyfill
```
```js
import 'babel-polyfill'
```

babel-runtime
> 转换成 es5 方法后一些需要在运行时使用的方法。
```sh
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

上面的预设会在编译后的代码中插入下面这样的运行时代码。

```js
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
```

### plugins

> 一般 preset 就够用了，但是如果想要做更多的操作则需要手动设置 plugins。几乎和 presets 是一样的。

```sh
npm install --save-dev babel-plugin-transform-es2015-classes
```
```json
{
  "plugins": [
    "transform-es2015-classes"
  ]
}

```

## 不同环境的配置
```json
  {
    "presets": ["es2015"],
    "plugins": [],
    "env": {
      "development": {
        "plugins": [...]
      },
      "production": {
        "plugins": [...]
      }
    }
  }
```
Babel 将根据当前环境来开启 env 下的配置。

当前环境可以使用 process.env.BABEL_ENV 来获得。 如果 BABEL_ENV 不可用，将会替换成 NODE_ENV，并且如果后者也没有设置，那么缺省值是"development"。

