const path = require('path');

module.exports = {
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'loader1'
            }
        ]
    },
    // 配置loader的解析规则
    resolveLoader:{
        modules:[
            'node_modules',
            path.resolve(__dirname,'myLoaders')
        ]
    }
}