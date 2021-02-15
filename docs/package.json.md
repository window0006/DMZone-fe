# package.json

## 字段含义
之前对这些没有怎么理解好。

### main

### es

### bin

### files
`files`字段是可选的，值为数组，每一项是一个个`pattern`。当前package被安装后，pattern匹配上的文件可以被直接import，如`import xxx from 'pkg/xxx'`；

### scripts

### dependencies

### devDependencies

### peerDependencies

### optionalDependencies

### bundledDependencies

## package-lock.json
```shell
npm shrinkwrap
```
