var mostPoints = function(questions) {
    let max = 0;
for(let i=0;i<questions.length;i++){
    let length = questions.length;
    let index = i;
    let sum = 0;
    while(index<length){
        sum += questions[index][0]
        index += questions[index][1]+1
    }
    if(sum > max){
        max = sum
    }
}
    return max
};
let arr = [[21,5],[92,3],[74,2],[39,4],[58,2],[5,5],[49,4],[65,3]]
mostPoints(arr)