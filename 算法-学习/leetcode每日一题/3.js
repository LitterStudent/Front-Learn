var numberOfBeams = function(bank) {
    let num = new Array(bank.length).fill(0)
    bank.forEach((item,index)=>{
        for(let i=0;i<item.length;i++){
            if(item[i]==='1'){
                num[index]++;
            }
        }
    })
    let res=0;
    let arr = [];
    for(let i=1;i<num.length;i++){
        if(num[i]!==0){
            arr.push(num[i])
        }
    }
    for(let i=1;i<arr.length;i++){
        res+=arr[i-1]*arr[i]
    }
        return res;
    };
var bank = ["011001","000000","010100","001000"];
numberOfBeams(bank)