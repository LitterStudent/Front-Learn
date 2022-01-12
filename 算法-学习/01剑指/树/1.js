function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
    // 以中序遍历数组重建二叉树
    let build = function(left,right,root){
        if(left>right){
            return null;
        }
     const rootNode = new TreeNode(inorder[root]);
     // 寻找left节点的位置
        if(left<root){
            const leftval = preorder.shift();
            const index = inorder.findIndex(value => value === leftval);
            rootNode.left = build(left,root-1,index)
        }
        if(right > root){
            const rightval = preorder.shift();
            const index2 = inorder.findIndex(value => value === rightval)
            rootNode.right = build(root+1,right,index2)
        }
     return rootNode;
    }
    let rootval = preorder.shift();
    let root = inorder.findIndex(value => value === rootval)
    return build(0,inorder.length-1,root)
};
var preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];

console.log(buildTree(preorder,inorder));