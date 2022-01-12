var checkValid = function(matrix) {
    const row = matrix.length;
    const col = matrix[0].length;
    const arr = new Array(row);
for(let i=0;i<row;i++){
    arr.fill(0)
    for(let j=0;j<col;j++){
        const index = matrix[i][j]
        if(0<index&&index<=row&&arr[index]==0){
            arr[index] = 1;
        }
        else {
            return false
        }
    }
}
for(let i=0;i<col;i++){
    arr.fill(0)
    for(let j=0;j<row;j++){
        const index = matrix[j][i]
        if(0<index&&index<=row&&arr[index]==0){
            arr[index] = 1;
        }
        else {
            return false
        }
    }
}
    return true
};

var arr = [[1,2,3],[3,1,2],[2,3,1]]
checkValid(arr)