var findContinuousSequence = function(target) {
    // 滑动窗口
    let l=1,r=1,sum=1,res = [];
    while(r<target){
        if(sum < target){
            r++;
            sum+=r
        }
        else if( sum > target){
            sum-=l;
            l++;
        }
        else{
            const arrNum = [];
            for(let i=l;i<=r;i++){
                arrNum.push(i)
            }
            res.push(arrNum)
        }
    }
    return res;
    };
    findContinuousSequence(9)