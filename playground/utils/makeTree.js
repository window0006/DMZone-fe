class Node {
  val = undefined;
  left = undefined;
  right = undefined;

  constructor(value, left, right) {
    this.val = value;
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
      parentNode = parentNode.left;
    }
  });

  return root;
}

var temp = [];
var walkTree = function (root) {
  let leftMax;
  let rightMax;

  if (root.left) {
    leftMax = walkTree(root.left);
  }
  if (root.right) {
    rightMax = walkTree(root.right);
  }

  const passMax = Math.max.apply(null, [
    root.val,
    root.val + (rightMax || 0),
    root.val + (leftMax || 0)
  ].filter(i => i !== undefined));
  // 得出经过当前节点的最大路径和
  const currentMax = Math.max(passMax, root.val + (rightMax || 0) + (leftMax || 0));

  temp.push(currentMax);

  return passMax;
}
var maxPathSum = function (root) {
  temp = [];
  walkTree(root);

  return Math.max.apply(null, temp)
};
