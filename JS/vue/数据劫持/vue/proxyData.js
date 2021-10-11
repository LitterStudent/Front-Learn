function proxyData(vm,target,key) {
    // 数据劫持
    // 可以直接使用vm.key 去访问vm.data.key
    // vm[key] = vm.options.data[key]
    Object.defineProperty(vm,key,{
        get(){
            // console.log("代理拦截get 数据劫持",);
            return vm[target][key];
        },
        set(newValue){
            // console.log("代理拦截set 数据劫持");
            vm[target][key] = newValue; 
        }
    })
}

export default proxyData;