const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.join(__dirname, "/src/index.js"), // 入口文件
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    }
}