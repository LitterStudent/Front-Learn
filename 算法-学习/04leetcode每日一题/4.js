/**
 * @param {number} n
 * @return {number}
 */
 var lastRemaining = function(n) {
    // 每一轮删除完后都为等差数列
    // 剩余数字数目 等差数列首项 a1 公差 1 
    let num = n,a1 = 1,k = 1,leftToRgith = true;
    while(num >1){
        if(leftToRgith || num%2!=0){
            a1 = a1+k;
            k = k * 2;
            num = Math.floor(num/2);
            leftToRgith = !leftToRgith
        }
        else{
            k = k*2;
            num = Math.floor(num/2);
            leftToRgith = !leftToRgith
        }
    }
        return a1;
    };
    lastRemaining(10);