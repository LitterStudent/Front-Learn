var spiralOrder = function(matrix) {
    let arr = matrix;
    let D = -1, H = arr.length, L = -1, R = arr[0].length;
    let i = 0, j = 0; // (i,j)
    let res = [];
    while(true){
        while(j<R){
            res.push(arr[i][j])
            j++;
        }
        D++;
        j--;
        i++;
        if((H-D)<= 1 || (R-L)<=1){
            return res
        }
        while(i<H){
            res.push(arr[i][j]);
            i++
        }
        i--;
        j--;
        R--;
        if((H-D)<= 1 || (R-L)<=1){
            return res
        }
        while(j>L){
            res.push(arr[i][j])
            j--;
        }
        j++;
        i--;
        H--;
        if((H-D)<= 1 || (R-L)<=1){
            return res
        }
        while(i>D){
            res.push(arr[i][j])
            i--;
        }
        i++;
        j++;
        L++;
        if((H-D)<= 1 || (R-L)<=1){
            return res
        }
    }
    };
    spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])