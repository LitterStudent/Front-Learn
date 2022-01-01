// 快排切分 返回下表j, 比arr[j]小的都在左边 大的都在右边
function partition(arr,lo,hi){
    let i = lo, j = hi+1;
    let v = arr[lo];
    while(true){
        while(++i<=hi && arr[i]<v);//找到比v大的元素 退出
        while(--j>=lo && arr[j]>v);//找到比v小的元素 退出
        if(i>=j){ //指针越界
            break;
        }
        const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
    }
    arr[lo] = arr[j];
    arr[j] = v;
    return j;
}
let arr = [5,1,2,3,4,5,6,7,8,9];

function quickSort(arr,i,j){
    if(i>=j){
        return ;
    }
    const mid = partition(arr,i,j);
    quickSort(arr,i,mid-1);
    quickSort(arr,mid+1,j)
}
quickSort(arr,0,arr.length-1);
console.log(arr);
