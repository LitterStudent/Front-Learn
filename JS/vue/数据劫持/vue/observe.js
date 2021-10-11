import Observe from "./observer"

function observe(data){
    if(data===null||typeof data!== 'object')return;
    return new Observe(data);
}

export default observe;