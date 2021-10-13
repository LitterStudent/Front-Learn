obj1 = { a: 1 ,c:3}
obj2 = { a: 2 ,b:4}
let key1 = Object.keys(obj1);
let key2 = Object.keys(obj2);
let res = {}
key1.forEach((value,index)=>{
    if(key2.includes(value)){
        key2.splice(key2.indexOf(value),1);
        
        if(typeof obj1[value] === typeof obj2[value]){
            // console.log(11);
            res[value] = [];
            res[value].push(obj2[value]);
            console.log(res);
            (res[value]).push(obj1[value]);
        }
        else{
            throw new Error();
        }
    }
    else{
        res[value] = obj1[value];
    }
})

key2.forEach((value,index)=>{
    res[value] = obj2[value];
})
console.log(res.valueOf());
return res;