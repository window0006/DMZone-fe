# npm
## 常用命令
通过一个包管理项目的流程来走。
1. 基本命令
* `init`初始化
* `install`安装依赖
* `link` 软连接
* `login`登录
  * `token`命令更新身份信息，可做自动化包管理操作
* `publish`发布

2. 工程相关

### npm init
```shell
npm init [--force|-f|--yes|-y|--scope]
npm init <@scope> (same as `npx <@scope>/create`)
npm init [<@scope>/]<name> (same as `npx [<@scope>/]create-<name>`)
```

`npm init <initializer> [参数]`会被转换成`npx create-<initializer> [参数]`，后面的参数会直接透传到`npx`。比如:

```shell
npm init react-app ./workspace -> npx create-react-app ./workspace
npm init esm --yes -> npx create-esm --yes
```

如果`<initializeer>`是一个`scope`（`@`开头的），则相当于会运行`npx <@scope>/create`，比如

```shell
npm init @dmz
```
会先去下载`@dmz/create@latest`包，然后会用`node命令`运行`@dmz/create`包内`package.json`的`bin`字段指向的文件，和`npx <@scope>/create`是一样的。

### install
scrope模块：`@${scrope}/${pkgname}`，安装后将被安装在`node_modules/@${scope}/${pkgname}`下。（`tnpm`会将目录结构打平，`_${scope}_{pkgname}@${version}`）

* --save,-s, --save-dev, -s -d
* --global, -g

### npm link
> 软链：
* 一般用于本地调试
将当前目录link到全局
```shell
npm link
```
将path指定给的目录link到当前目录
```shell
npm link path
```

### npm unlink
移除当期那目录对path的软链
```shell
npm unlink path
```

### npm publish
会要求先登录，登录后将生成身份验证用的`token`，用以获得发布和管理包的权限。这个`token`也可以给通过`npm token`命令重新创建。

### npm scripts
`package.json`中`scripts`字段内写下了`dev`，就可以通过`npm run dev`执行，这是为什么呢？`npm`做了哪些事情才能这样？
>原理：每当执行`npm run`，就会自动创建一个`Shell`，在里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

阮一峰的教程：http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
非常通俗易懂。

### npm变量
可以在命令行中使用`$npm_package_${name}`的变量，将会被赋值为`package.json`中的`${name}`字段的值，若果`${name}`字段对应的是一个对象，也可以通过`_`继续往下拼接。如：
```json
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

## npm 版本锁定
```shell
npm shrinkwrap
```

生成`package-lock.json`，解决小版本不一致的问题。

## yarn

