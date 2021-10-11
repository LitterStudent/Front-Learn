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
        // 数据劫持
        proxyData(vm,"_data",key)
    }
    // 观察 data
     observe(data)
}

export {
    initState
}