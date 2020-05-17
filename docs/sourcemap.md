# source map是如何生成的
1. 将源码解析成ast
2. 为每个ast节点添加一个clone节点（作为源数据）
3. 