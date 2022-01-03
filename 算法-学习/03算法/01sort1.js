// 荷兰国旗问题 
// 将数组三分问题
// 找出一个数将数组分成小于这个数的在数组左边，等于的在中间，大于在右
// 返回 等于部分的下标值
// 现在设这个数为arr的最后一个数
function fun1(arr,left,right){
if(right<left){
    return [-1,1];
}
if(right===left){
    return [right,right]
}
let L = left-1
let R = right
let index = left
while(index<R){ 
    if(arr[index]<arr[right]){
        let temp = arr[index];
        arr[index++] = arr[++L];
        arr[L] = temp;  
    }
    else if(arr[index]>arr[right]){
        let temp = arr[index];
        arr[index] = arr[--R];
        arr[R] = temp;
    }
    else{
        index++;
    }
}
let temp = arr[right];
arr[right] = arr[R];
arr[R] = temp;

return [L+1,R]

}

console.log(fun1([1,2,2,2,6,77,88],0,6));