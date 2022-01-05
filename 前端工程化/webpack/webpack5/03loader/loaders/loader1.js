module.exports = function(content,map,meta){
    console.log(1111);

    //第一个参数是错误参数，没有错误传null就行
    //一般该函数只返回前两个参数
    //calllback和return都是同步的方式
    this.callback(null,content,map,meta)
    // return content;
}

module.exports.pitch = function(){
    console.log(111);
}