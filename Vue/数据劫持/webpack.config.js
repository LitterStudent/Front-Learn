const {resolve} = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:"./src/index.js",
    output:{
        path:resolve(__dirname,'dist'),
        filename:"bundle.js"
    },
    devtool:'source-map',
    resolve:{
        // 导入模块时
        modules:[resolve(__dirname,""),resolve(__dirname,"node_modules")]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: resolve(__dirname,"public/index.html")
               })
    ],
    mode:"development"

}