const  path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

module.exports = {
    entry:['@babel/polyfill','./src/main.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // MiniCssExtractPlugin.loader 单独将css提出来，在html中用link引入
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            // style-loader直接用style标签加入样式
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset/resource',
            },
            {
                test:/\.js$/,
                use:{
                  loader:'babel-loader',
                  options:{
                    presets:['@babel/preset-env']
                  }
                },
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    resolve:{
        alias:{
          'vue$':'vue/dist/vue.runtime.esm.js',
          ' @':path.resolve(__dirname,'../src')
        },
        extensions:['*','.js','.json','.vue']
   },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "./src/main.css",
            chunkFilename: "[id].css",
        }),
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
    // 
    static: {
        directory: path.join(__dirname, 'public'),
      },
    compress: true,
    port:8000,
    hot:true,
    host:"0.0.0.0"
  },
    mode:'development'
};