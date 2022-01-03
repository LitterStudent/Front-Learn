

function bianrySearch(arr,value){
  let min = 0;
  let max = arr.length-1;
  let mid = Math.floor(max/2)
  while(min<=max){
    if(arr[mid]===value) return mid;
    else if(arr[mid]<value) {
        min = mid+1;
    }
    else{
        max = mid-1;
    }
    mid = min+Math.floor((max-min)/2)
  }
  return -1;
}


// 寻找 >= value 最左侧的位置

function leftfind(arr,value){
    let max = arr.length-1;
    let min = 0;
    let mid = Math.floor(max/2);
    let index = -1;
    while(min<=max){
        if(arr[mid]>=value){
            index = mid;
            max = mid-1;
        }
        else{
            min = mid+1;
        }
        mid = min+Math.floor((max-min)/2)
    }
    return index;
}
// 1222345 2
// 寻找 <= value 最右侧的位置
function Rightfind(arr,value){
    let max = arr.length-1;
    let min = 0;
    let mid = Math.floor(max/2);
    let index = -1;
    while(min<=max){
        if(arr[mid]<=value){
            index = mid;
            min = mid+1;
        }
        else{
            max = mid-1;
        }
        mid = min+Math.floor((max-min)/2)
    }
    return index;
}
let arr = [1,2,3,4,5,6,7,8,99,101]
console.log(bianrySearch(arr,5));

let arr2 = [1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,4]
console.log(leftfind(arr2,3));
console.log(Rightfind(arr2,1));