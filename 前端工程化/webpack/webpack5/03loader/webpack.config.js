const path = require('path');

module.exports = {
    module:{
        rules:[
            {
                test:/\.js$/,
                // loader文件夹下的loader1
                //use数组内先顺序执行各个loader的pitch函数，再逆序执行loader的真正解析函数
                //loader可以分为同步loader和异步loader
                //1. 在loader的函数内直接返回结果或者调用回调函数都属于同步loader,看 @loader1.
                //2. 异步loader，看loader2.
                use:[
                    'loader1',
                    'loader2',
                    'loader3'
                ]
            }
        ]
    },
    // 配置loader的解析规则
    resolveLoader:{
        modules:[
            'node_modules',
            path.resolve(__dirname,'loaders')
        ]
    }
}