import observe from "./observe";
import proxyData from "./proxyData";
function initState(vm) {
    var options = vm.$options;

    if(options.data){
        initData(vm);
    }
}

function initData (vm) {
    var data = vm.$options.data;
    

    data = vm._data = typeof data === "function" ? data.call(vm):data||{};
    
    for(let key in data){
        // 数据代理
        proxyData(vm,"_data",key)
    }
    // 数据劫持
     observe(data)
}

export {
    initState
}