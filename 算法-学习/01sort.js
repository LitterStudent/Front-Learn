
//选择排序
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
//然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
// 选择一个无序序列的最小的插入有序序列的下一位
// 插入排序 选择无序序列第一个数插入到有序序列中
function sort(arr){
   let len = arr.length;
    for(let i =0;i<len-1;i++){
        let min = i;
        for(let j=i+1;j<len;j++){
            if(arr[min]>arr[j]) min = j;
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}

// 冒泡排序

function sort2(arr){
    let len = arr.length;
    for(let i=0;i<len;i++){
        for(let j=0;j<len-i-1;j++){
            if(arr[j]>arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

// 插入排序
//通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
// 插入排序 选择无序序列第一个数插入到有序序列中
function sort3(arr){
 let len = arr.length;
 for(let i=1;i<len;i++){
     for(let j=i;j>0;j--){
         if(arr[j]<arr[j-1]){
            let temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
         }
     }
 }
}


// 归并排序

function sort4(arr,left,right){
    if(left === right){
        return;
    }
    let mid = left+Math.floor((right-left)/2)
    sort4(arr,left,mid);
    sort4(arr,mid+1,right);
    merge(arr,left,mid,right)
}

function merge(arr,left,mid,right){
    let arr2 = []
    let i = left;
    let j = mid+1;
    let k = 0;
    while(i<=mid&&j<=right){
        arr2[k++] = arr[i]<arr[j]?arr[i++]:arr[j++]
    }
    while(i<=mid){
        arr2[k++] = arr[i++]
    }
    while(j<=right){
        arr2[k++] = arr[j++]
    }
    for(let i=0;i<arr2.length;i++){
        arr[left++] = arr2[i]
    }
}

// 一个数组中的一个数 左边比它小的数的总和叫最小数和。
// 数组中所有数的最小数和叫数组小和  可用归并排序 求出




// 快速排序

function quicksort(arr){
    if(arr.length<=1){
        return arr;
    }
    let mid = Math.floor((arr.length-1)/2);
    let i =0;
    let left = [],right = [];
    while (i<arr.length){
        if(arr[mid]<arr[i]){
            right.push(arr[i])
        }
        else if(arr[mid]>arr[i]){
            left.push(arr[i])
        }
        i++;
    }
    left = quicksort(left);
    right = quicksort(right);
    return left.concat(arr[mid],right);
}

let arr = [5,4,3,2,1,-1,-2,0]
arr = quicksort(arr,0,arr.length-1);
console.log(arr);

