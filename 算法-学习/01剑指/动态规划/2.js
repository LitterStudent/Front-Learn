// 剑指 Offer 60. n个骰子的点数
var dicesProbability = function(n) {
    let dp = new Array(6);
    dp.fill(1/6);
    for(let i=1;i<n;i++){
        let temp = []
        for(let j=0;j<dp.length; j++){
            for(let k=0;k<6;k++){
                temp[j+k] += dp[j]*1/6
            }
        }
        dp = temp;
    }
    return dp;
};

dicesProbability(2)