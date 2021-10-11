//  a^b 异或运算  0101
//               0100 看成无进位相加 
//               1001
//  N^N=0 N^0=N  一个数组 很多数都出现偶数次数，只有一个数出现奇数次。可以用 a=0去异或所有数
//  a^b^c^d  顺序可改
//  如何不用任何空间 交换两个数 a = a^b b=a^b a=a^b

// 一个 int数,取出它的最右侧的1 a = 0011101000 a&((~a)+1)  ~a按位取反

// 如果一个数字有两个数出现奇数次，其他数都出现偶数次，求这两个数
function a(arr){
 let eor =0;
 for(let i=0; i<arr.length;i++){
     eor ^= arr[i];
 }
 let rightOne = eor & (~eor + 1);
 let onlyOne = 0
 for(let i =0;i<arr.length;i++){
     if((arr[i]&rightOne)!== 0){
         onlyOne ^= arr[i]
     }
 }
 console.log(onlyOne,eor^onlyOne);
}

a([1,1,1,1,2,2,2,3,3,3,3,4,4,4])


// 求一个数二进制数中1的个数

function b(N){
  let count=0
  while(N!=0){
   let first = N & ((~N) + 1)
    N ^= first;
    count++
  }
  return count
}

console.log(b(8));
