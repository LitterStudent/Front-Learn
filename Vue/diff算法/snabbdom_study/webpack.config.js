const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    //   虚拟打包路径 用户webpack-server
    publicPath: 'xuni',
    filename: 'bundle.js',
  },
  devServer:{
      port:8081,
      contentBase:'www'
  }
};