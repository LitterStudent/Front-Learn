module.exports = function(content,map,meta){
    console.log(2222);

    // 返回一个callback函数
    const callback = this.async();

    //只有callback被执行时，才能接着执行下一个loader
    //在等待的时候loader不会执行但是其他操作仍在继续
    setTimeout(()=>{
     callback(null,content)
    },1000)

    // return content;
}

module.exports.pitch = function(){
    console.log(222);
}