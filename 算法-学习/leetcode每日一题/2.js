/**
 * @param {number} n
 * @return {number}
 */
 var findNthDigit = function(n) {

    // index 位的数有多少个 1位10个 2位90个 3位900个
    function findWeishu(index){
        if(index === 0) {
            return 0;
        }
        if(index === 1){
            return 10;
        }
        return  9*10**(index-1);
    }
    
    let index = 0; //位数 1，2，3，4
    let sum = 0;
    let indexSum = 0; //当前位数之前所有数占了多少位 
                      //1位 10*1, 2位 （90+10）*2,3位（10+90+900）*3
    while(true){
        indexSum += findWeishu(++index)*index // 10
        sum += findWeishu(index);
        if(indexSum >= n){
            // index-1位数下的范围内的所有数共有多少位
            indexSum = indexSum - findWeishu(index)*index 
            sum = sum - findWeishu(index);
            // 该位数的数起始剩下多少位
            x = n - indexSum;       // 3
            // 该位数的第 sum个数
            let sum2 = Math.floor(x/index); // 3 / 1 = 3
            let res = sum+(sum2)+'';   // 10
            let d = (x) % index; // 3 % 1 = 0
            return res[d]
        }
    }
    };

    findNthDigit(11)