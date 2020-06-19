# [serviceWorker](https://developers.google.com/web/fundamentals/primers/service-workers)
* 在后台独立于网页运行的脚本，可作为网络代理，控制页面所发送网络请求的处理方式。
* 注意
  * 是一种js worker，无法直接访问dom，通过`postMessage`和页面通信；
  * 在`不用时`会被中止，在下次有需要时重启，因此不能依赖其`onfetch`和`onmessage`处理全局信息；
  * 可以使用`IndexDB API`。

## 生性周期
1. 页面js中注册serviceWorker
2. 浏览器在后台下载对应的js文件，安装。
3. 激活

注意：注册serviceWorker的页面需要重新加载才会受到serviceWorker的控制
