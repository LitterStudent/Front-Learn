//846. 一手顺子

var isNStraightHand = function(hand, groupSize) {
    // 这道题目 可以使用hash表保存数字剩余个数
    
    if(hand.length % groupSize !==0){
        return false;
    }
    hand.sort((a,b)=>{return a-b})
    let map = new Map()
    for(let i=0;i<hand.length;i++){
        if(map.has(hand[i])){
            let count = map.get(hand[i])
            map.set(hand[i],++count);
        }
        else{
            map.set(hand[i],1)
        }
    }
    for(let i=0;i<hand.length;i++){
        if(map.get(hand[i])>0){
            // 删除从 [i...i+groupSize]的数
            for(let start=hand[i];start<(hand[i]+groupSize);start++){
                if( map.has(start) && map.get(start)>0){
                    let count = map.get(start);
                    map.set(start,--count);
                }
                else{
                    return false
                }
            }
        }
    }
     return true;
    };

console.log(isNStraightHand([1,2,3,6,2,3,4,7,8],3));