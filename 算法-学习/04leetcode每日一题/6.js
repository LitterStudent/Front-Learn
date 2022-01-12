// 306. 累加数
// 回溯解法： dfs + 剪枝 
var isAdditiveNumber = function(num) {
    
    function dfs(num,index,count,prevprev,prev){
        if(index >= num.length){
            return count>2
        }

        let current = 0;

        for(let i=index; i < num.length;i++){
            let c = num[i];
            if(num[index]=='0' && i>index){
                // 剪枝1： 0不能做前导，但是可以作为一个数单独使用
                return false;
            }
            
            current = current * 10 + (c -'0');
            if(count >= 2){
                let sum = prev + prevprev;
                if(current > sum){
                    // 剪枝2： 如果当前数比前两个数和大了，说明不合适
                    return false
                }
                if(current < sum) {
                    // 剪枝3：如果当前数比前两个数和小，继续增加当前数的位数
                    continue
                }
            }
            if(dfs(num,i+1,count+1,prev,current)){
                    return true
            }
        }
        return false
    }
    return dfs(num,0,0,0,0)
};

isAdditiveNumber("199100199")