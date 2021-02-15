# lint
代码风格约束的意义。风格一致，在习惯内，降低代码维护成本。

## eslint

### 初始化
生成 `.eslintrc.js` 文件。

```shell
eslint --init
? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? Do you use React? No
? What format do you want your config file to be in? JavaScript
```
或者使用 VS Code 的 Create ESLint configuration 命令。

#### extends
`extends` 是 ESlint 的共享机制，能让我们以非常低的成本使用上社区的最佳实践。

```js
{
  // 字符串
  "extends": "airbnb",
  // 数组
  "extends": [
    "eslint:recommended",
    "eslint-config-airbnb-base",
    "../rules/react"
  ]
}
```
* 可以是一个字符串，也可以是一个数组。
* 以 `plugin:` 开头的字符串，会应用对应的第三方插件规则，如 `plugin:react/recommended` ，也就是 `eslint-plugin-react` 的所有推荐规则。
* 以 `eslint-config-` 开头的包，则是第三方规则的集合。ESLint 做了特殊处理，可以省略 `eslint-config-`。
* 本地路径

#### rules
```js
{
  rules: {
    "no-console": ["error", { allow: ["warn"] }]
    `${ruleName}: [${'error' || 'warn' || 'off'}, ${option}]`
  }
}
```
一条 rule 就是一个规则，对应一个 node 模块，主要由 meta 和 create 两部分构成。
* meta: 规则的相关元数据。[官方文档](https://eslint.org/docs/developer-guide/working-with-rules#rule-basics)
* create: rule 的代码分析过程，中间可以使用 `(context)[https://eslint.org/docs/developer-guide/working-with-rules#the-context-object]` 对象进行交互处理。需要返回一个对象，以供 ESLint 遍历 ast 节点时使用，会有三个类型
  * `selector` （用于匹配 ast 节点的字符串，可以类比为 css selector）ESLint calls that visitor function while going down the tree
  * `selector:exit` ESLint calls that visitor function while going up the tree
    * ESLint 内部实现原理，遍历 ast 其实是一个递归，存在一个由外向内再向外的过程。
  * event name，在 `code path analysis` 的对应事件阶段调用。一个 code path 由多个 CodePathSegment 组成，ESLint 将 code path 抽象为 5 个事件。
    * onCodePathStart
    * onCodePathEnd
    * onCodePathSegmentStart
    * onCodePathSegmentEnd
    * onCodePathSegmentLoop

##### code path analysis
`code path`指的是程序的执行路径，条件语句、循环语句都是程序的执行路径。一个执行路径为 `CodePath`，由内部 `CodePathSegment` 组成。

```js
if (a && b) {
    foo();
}
bar();
```
* 如果 a 为真 - 检测 b 是否为 真
* 如果 b 为真 — 执行 `foo()` — 执行 `bar()`
* 如果 b 非真 — 执行 `bar()`
* 如果 a 非真，执行 `bar()`

将上述内容整体视为一个 `CodePath`，`CodePathSegment` 就是其中的一个分支。

#### plugin
* plugin 其实可以看作是第三方规则的集合，ESLint 本身规则只会去支持标准的 ECMAScript 语法。如果想要支持特殊的校验，比如 react 的 jsx 则需要自己定义对应的规则，比如 `eslint-plugin-react`。

plugin 配置写法和 `.eslintrc` 文件类似。

plugin 两种用法：
在 `extends` 中使用， plugin 具有自己的命名空间，可通过 `"extends": ["plugin:myPlugin/myConfig"]` 引用 plugin 中的某类规则（可能是全部，也可能是推荐）；
在 plugin 中使用，如添加配置 `plugins: ['react',]`，可声明自己想要引用的`eslint-plugin-react` 提供的规则，但是具体用哪些，怎么用，还是需要在 rules 中配置；

#### parser 
默认使用 `babel-eslint` 作为 parser，也可以自定义 parser。
```js
{
  "parser": "./path/to/awesome-custom-parser.js"
}
```

#### 其他配置字段
env、parserOptions、settings 等。

## TSlint
曾经纠结过 TS 项目中该用 ESLint 还是 TSLint，一番搜索调查后发现 TSLint 已经不推荐使用了，早在2019年的时候，TS 团队就公开发表说 ESLint 较于 TSLint 有一个更高效的架构，他们后面不会再维护TSLint，转而投入到 ESLint 中。

另外就是，TSLint 只能用于 TS 项目，而ESLint同时支持 JS 和 TS 项目。

## VS Code 编辑器
安装 `ESLint` 插件
VS Code 会根据当前项目下的 `.eslintrc` 文件的规则做代码格式做校验。
