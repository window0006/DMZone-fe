import makeTree from './utils/makeTree';

const tree = makeTree([-10, 9, 20, null, null, 15, 7]);

var maxPathSum = function (root) {
  let maxPathVal = node.val;
  if (node.left) {
    maxPathVal = Math.max(maxPath, maxPathVal + (node.left.maxPathVal || node.left.val));
  }

  if (node.right) {
    maxPathVal = Math.max(maxPath, maxPathVal + (nide.right.maxPathVal || node.right.val));
  }
  node.maxPathVal = maxPathVal; // 经过当前节点的最大路径和
  return maxPathVal;
}
