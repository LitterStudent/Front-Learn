/**
 * @param {number[][]} properties
 * @return {number}
 */
// 1996. 游戏中弱角色的数量
 var numberOfWeakCharacters = function(properties) {
    properties.sort((p1,p2)=>{
        return p1[0] == p2[0] ? p2[1] - p1[1] : p2[0] - p1[0]
    })
    let res = 0;
    let maxDef = 0;
    for(let i=0;i<properties.length;i++){
        if(maxDef <= properties[i][1]){
            maxDef = properties[i][1]
        }
        else{
            res++;
        }
    }
    return res;
};
numberOfWeakCharacters([[1,1],[2,1],[2,2],[1,2]])