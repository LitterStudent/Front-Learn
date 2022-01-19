var findMinDifference = function(timePoints) {
    timePoints.sort();
    let resMin = Infinity;
    for(let i=1;i<timePoints.length;i++){
        const temp = getMinutes(timePoints[i])-getMinutes(timePoints[i-1]);
        if(temp < resMin){
            resMin = temp;
        }
    }
    return Math.min(resMin,getMinutes(timePoints[0])+1440-getMinutes(timePoints[timePoints.length-1]))
};

var getMinutes = (timePoint) => {
   return ((timePoint[0]*10+timePoint[1]*1)*60+(timePoint[3]*10+timePoint[4]*1))
}
findMinDifference(["23:59","00:00"])