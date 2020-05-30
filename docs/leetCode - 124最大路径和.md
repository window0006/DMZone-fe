# 二叉树中的最大路径和
* 从树中任意节点出发，达到任意节点，其中节点的和。
* 找到最大值

```js
class Node {
  value = undefined;
  left = undefined;
  right = undefined;

  constructor(value, left, right) {
    this.value = value;
  }

  setLeftChild(leftChild) {
    this.left = leftChild;
    leftChild.parentNode = this;
  }

  setRightChild(rightChild) {
    this.right = rightChild;
    rightChild.parentNode = this;
  }

  setChild(child) {
    if (!this.left) {
      this.setLeftChild(child);
      return true;
    }
    if (!this.right) {
      this.setRightChild(child);
      return true;
    }
    return false;
  }
  
}
function makeTree(array) {
  let root;
  let parentNode;

  array.forEach((value, index) => {
    if (value === null) {
      return;
    }

    const node = new Node(value);

    if (index === 0) {
      root = parentNode = node;
      return;
    }
    parentNode.setChild(node);
    
    if (parentNode.right) {
      parentNode = parentNode.right;
    }
  });

  return root;
}

```