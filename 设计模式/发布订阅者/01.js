var event = {
    clientList = [],
    listen:function(key,fun){
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fun);
    },
    trigger:function(){
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if(!fns||fns.length===0){
            return false;
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    }
}