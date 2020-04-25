# async await底层原理
* Promise + Generator = async await

## Generator
* `Generator`方法执行后将不会马上运行其内部逻辑，而是返回一个`Generator`实例，需要调用实例的`next`方法才会执行；
* 在`Generator`函数内部执行一段代码，如果遇到`yield`关键字，js引擎会暂停该函数的执行，并返回`yield`后面的内容给外部；
* 外部实例可以通过`next`方法恢复函数的执行;
* 通过`return`结束。

### `Generator.prototype.next()`
* 返回一个由 yield表达式生成的值。
### `Generator.prototype.return()`
* 返回给定的值并结束生成器。
### `Generator.prototype.throw()`
* 向生成器抛出一个错误。

## 协程
> 协程比线程更轻量，一个线程内可以有多个协程，协程不被操作系统内核管理，程序可以完全控制内部的协程，切换协程不会像切换线程那样消耗系统资源。

V8实现`Generator函数`暂停执行的原理是通过协程来实现的。
* 主执行栈 - 父协程
* `Generator函数` - 子协程

关注点
* `js执行栈`所在父协程 - 主调用栈
* `Generator函数`所在子协程协程 - `Generator函数`调用栈
* 通过`yield`和`next方法`切换执行流程
* js引擎会保存两个携程内的调用栈信息，流程切换后，对应的调用栈信息也会被恢复

```js
function *gen() {
  yield new Promise(res => setTimeout(() => res('a'), 100));
  yield new Promise(res => setTimeout(() => res('b'), 100));
  yield new Promise(res => setTimeout(() => res('c'), 100));
}

for (let i of ) {

  const tmepPromise = gen.next();
}
```

## `Generator函数`的执行器
* 调用后可以自动跑`next`执行`Generator函数`的方法。
