function TreeNode(val, left, right) {
    this.val = (val == undefined ? 0 : val)
    this.left = (left == undefined ? null : left)
    this.right = (right == undefined ? null : right)
}

//  先序遍历 递归
let preorderTraversal = (root, arr = []) => {
    if (root != null) {
        arr.push(root.val)
        preorderTraversal(root.left, arr)
        preorderTraversal(root.right, arr)

    }
    return arr
}
// 非递归前序遍历
let preorderTraversal2 = (root) => {
    let statck = []
    let res = []
    let current = root
    let Traversal = (root) => {
        while (statck.length > 0 || current) {
            while (current) {
                res.push(current.val)  //前序压入
                statck.push(current)
                current = current.left
            }
            current = statck.pop() //出栈，遍历其右节点
            current = current.right
        }
    }
    Traversal(root)
    return res
}



var isValidBST = function (root) {  //判断排序二叉树  
    //  let validate = function(root,min,max){
    //    if(root==null){
    //        return true
    //    }
    //    if(root.val<=min||root.val>=max){
    //        return false
    //    }
    //    return validate(root.left,min,root.val)&&validate(root.right,root.val,max)
    //  }
    //  return validate(root,Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)

    let statck = []
    let current = root
    let pre = null
    let a
    while (statck.length > 0 || current) {
        if (current) {
            statck.push(current)
            current = current.left
        }
        current = statck.pop()
        if (pre != null && current.val <= pre.val) {
            a = false
        }
        pre = current
        current = current.right
    }
    if (a == false) return false
    console.log(a)
    return true
};


//    1
//  2    3
// 4 5  6 7

let tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)))
let tree2 = new TreeNode(4, new TreeNode(2,new TreeNode(4,new TreeNode(8),new TreeNode(9)),new TreeNode(5)), new TreeNode(3, new TreeNode(6),new TreeNode(7)))
let tree3 = new TreeNode(4,new TreeNode(8),new TreeNode(9))
//  preorderTraversal(tree, arr)
//  console.log(arr)
//  let res = []
//  res = preorderTraversal2(tree)
//  console.log(res)
console.log(isValidBST(tree))


// var sortedArrayToBST = function(nums) {  //用一个有序数组创建一个二叉排序树
// let createTree = function(low,high){
//     if(low>high){
//       return null
//     }
//     let mid = low+Math.floor((high-low)/2)
//     let root = new TreeNode(nums[mid])
//     root.left = createTree(low,mid-1)
//     root.right = createTree(mid+1,high)
//     return root
// }
// return createTree(0,nums.length-1)
// };
// let nums = [-10,-3,0,5,9]
// console.log(sortedArrayToBST(nums))

// var isValidBST = function (root) {
//     let statck = []
//     let current = root
//     let pre = null
//     while (statck.length > 0 || current) {
//         if (current) {
//             statck.push(current)
//             current = current.left

//         }
//         current = statck.pop()
        
//         if (pre != null && current.val <= pre) {
//             return false
//         }
//         pre = current.val
//         current = current.right
//     }
//     return "true2"
// };

// let tree2 = new TreeNode(1, new TreeNode(1))
// console.log(isValidBST(tree2))



let root = new TreeNode(1,new TreeNode(9),new TreeNode(20,new TreeNode(15),new TreeNode(7)))

var levelOrder = function(root) {
    if(root ===null){
        return []
    }
let queue =[root];
let res = [];
let i = 1;
while(queue.length>0){
   let len = queue.length;
   let arr = []
   if(i%2===1){
    while(len){
     let node = queue.pop();
     arr.push(node.val);
     if(node.left!==null){
         queue.push(node.left);
     }
     if(node.right!==null){
         queue.push(node.right);
     }
     len--;
    }
    i = 2;
   }
   else if(i%2===0){
    while(len){
     let node = queue.pop();
     arr.unshift(node.val);
     if(node.left!==null){
         queue.push(node.left);
     }
     if(node.right!==null){
         queue.push(node.right);
     }
     len--;
    }
    i = 1;
   }
   res.push(arr)
}
return res;
};
console.log(levelOrder(root));