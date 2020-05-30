# 从0打造一个现代化的前端react项目
> 请认真感受一个前端项目的发展历程。

## 什么样的前端项目才是现代化的前端项目？（要做哪些事情）
1. 工程化架子
   1. npm
   2. webpack
      1. dev
         1. hot module replacement
      2. test
      3. build
      4. dynamic import
      5. compilation optimize
   3. cli工具
   4. typescript
2. react全家桶
   1. react(16.8)
      1. react hooks
   2. redux
      1. redux-saga
   3. router
      1. react-router
      2. react-router-redux
   4. react optimize
      1. immutable
      2. pure component
      3. shouldComponentUpdate
3. css in js
   1. cssModule
4. 使用create-react-app

## npm init
```shell
npm init -y
```

## 工程化
开始使用`webpack`，先做一个能跑起来的小应用。

###  scripts
  * dev
  * build
  * ~~publish~~
我需要一个`scripts`目录，里面存放对应的工程脚本，这是`cli`的雏形。

### 持续集成 - Continuous integration，简称CI
软件开发的一套标准流程

Design -> Dev -> Test -> Release -> Rollback

* 频繁地将代码集成到主干
* 产品可以快速迭代，同时还能保持高质量
* 核心措施是，代码集成到主干之前，必须通过自动化测试，只要有一个测试用例失败，就不能集成。
