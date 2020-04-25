> 面向小白编程，尽可能写下我知道的一切

# Vue 学习

## 初始化项目

### cdn版本
在一些demo示例页面可以使用这个方案，使用`script`标签引入官方提供在cdn上的资源，这会引入最新的版本。
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

如果不希望被版本升级带来一些意外的问题，也可以明确指定具体版本。
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```

官方cdn上还提供了`es modules`版本，可以用`import`的方式将`Vue`到代码中。

```html
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
</script>
```

### npm安装
现代化的方式是通过`npm`按包装，不仅仅是为了代码中编码时可以使用`import vue from'vue'`，更是为了可以让`webpack`等打包工具能更好地优化构建结果，比如可以使用vue的dev版本调试，做`trees haking`优化等。
```shell
$ npm install vue --save
```

## 初始化项目
### npm init
使用`npm init -y`命令初始化项目，`-y`参数可以指定跳过命令行中的问题选择。命令执行完后生成了`package.json`文件，这是一个现代前端项目的基础。

### 官方cli工具
>Vue 提供了一个官方的 CLI，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 Vue CLI 的文档。

```shell
npm install @vue/cli -g
vue create dmz

cd dmz
yarn serve
```

## 项目实战
我的vue项目 使用antui一个心晴发布


### 路由设计
