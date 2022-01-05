import observe from "./observe";

function defineReactiveData(data,key,value){
    observe(value)
    Object.defineProperty(data,key,{
        get(){
            console.log("响应式数据:获取",value);
            return value
        },
        set(newValue){
            console.log("响应式数据:设置",newValue);
            if(value === newValue) return;
            observe(newValue)
            value = newValue
        }
    })
}

export default defineReactiveData;