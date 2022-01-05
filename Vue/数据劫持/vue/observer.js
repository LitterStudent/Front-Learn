import defineReactiveData from "./reactive.js"
import {arrMethods} from './array.js'
import observeArr from "./observeArr.js";

function Observer(data){

    // Object.defineProperty 不能处理数组
    if(Array.isArray(data)){
        data.__proto__ = arrMethods;
        observeArr(data)
    }
    else{
        // 如果是对象
        this.walk(data);
    }
}

Observer.prototype.walk = function(data){
    var keys = Object.keys(data);
    
    keys.forEach(key=>{
        let value = data[key];
        defineReactiveData(data,key,value)
    })
}
export default Observer;