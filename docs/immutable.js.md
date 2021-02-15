## Immutable

关于为什么React要求state是Immutable的，其实还是听迷惑人的。

setState本身会导致得到一个新的state对象（引用地址是不同的），但是这是一个浅拷贝，更深的state还是要手动immutable化，也就是如果有子组件依赖了state.xxx作为props的一部分，而xxx是一个对象，那么如果想要在xxx变化的时候重新渲染这个子组件，那就需要手动设置`setState{ xxx: { ...state.xxx, [newprop]: newval } }`，state一定要是新的。

## 关键的心智模型
> Immutable collections should be treated as values rather than objects.

## 数据类型
```js
import Immutable from 'immutable';

const {
  List, // 有序索引集像，像Array
  Map, // 无需索引集，像Object
  OrderedMap, // 有序的map, 元素按照调用set方法的顺序进行排序
  Set, // 没有重复饿集合
  OrderedSet, // 调用add方法的顺序进行排序
  Stack,  // unshift()和shift()添加和删除
  Record, // ?? 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值
  Seq, // ?? 序列，但是可能不能由具体的数据结构支持
  Collection
} = Immutable;
```

`Collection`是`Immutablejs`的基类（todo: source code），不可以直接被创建，但是创建的Map、Set、List等都是他的子类，Immutablejs文档中频繁提到的collections就是指这个东西。

所有操作都会返回一个新的immutable collection。

`Record`和`Seq`？？。

## api
### Immtable主体的api
* fromJS()
* toJS()
* is() 根据两个immutable对象的hashCode和valueOf值来判断是否是相同，这里可以避免深度遍历，提高性能
* List()
* isList()
* Map()
* isMap()
* withMutation()

Instance
* size：List/Map的长度
* has() 、 hasIn()：判断是否存在某一个key 用法
* equals() 类似is()
* includes() List是否包含某个值
* set(key/index, value);
* setIn()
* get()
* getIn()
* update()
* updateIn()
* delete()
* deleteIN()
* deleteALll()
* merge()
* mergeIn()
* mergeWith()
* mergeDeepIn()
* mergeDeepWith()
* concat()
* map()
* slice()
* ...