## 记录不理解的git的用法

### Git merge vs Git rebase

所谓变基理解了之后就会觉得还是挺形象的
原本从master的a commit checkout出来的feature分支，master分支出现了多次commit之后，最后的是c commit；

在feature分支执行git rebase master，现在feature变成了从master的c commitcheckout出来，当然中间可能会有冲突，按照feature分支的所有commit来解决冲突即可
