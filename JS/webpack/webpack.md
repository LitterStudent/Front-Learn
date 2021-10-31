[入门文章](https://www.jiangruitao.com/webpack/quick-start/)

![image-20211030150844521](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211030150844521.png)

## 0.常见问题

### 1.webpack的作用

1.模块打包。将不同模块的文件打包在一起，保证模块之间的正确引用，执行有序。

2.编译兼容。通过webpack的Loader机制，编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，以及浏览器无法识别的ES6语法。



### 2chunk是什么？

在[模块化编程](https://en.wikipedia.org/wiki/Modular_programming)中，开发者将程序分解为功能离散的 chunk，并称之为 **模块**。



### 3webpack的打包运行原理？（流程）

1.读取webpack的配置参数。

2.启动webpack，启动compiler对象并开始解析项目

3.从入口文件开始解析，并且找出其依赖的模块，递归遍历解析，构造依赖关系树

4.对不同文件类型的依赖模块使用相应的loader进行编译，转化为js文件。

5.整个过程中webpack通过发布订阅模式，向外抛出一些hooks,而webpack的插件可以通过监听这些关键事件节点，执行相应任务从而做到干预的目的。

6.将编译好的模块组成chunk，将chunk转换成文件，输出到文件系统。



### 4sourcemap是什么？

webpack中的devtool中配置。（最上一级）

sourcemap是将编译打包好的代码映射回源码的技术。如果构建后的代码哪里出错了，可以通过sourcemap找出源码出错的位置。



### 5.Loader和Plugin的区别。

Loader本质是一个函数，该函数通过接收内容并进行转换，输出转换后的结果。因为webpack本身只能识别js和json,所以Loader充当了翻译的角色，对其他类型进行转译处理。

Plugin是插件，基于事件流。插件可以扩展webpack的功能。在webpack运行的生命周期内会广播许多事件，插件可以通过监听事件，在合适的事件使用webpack提供的API改变输出结果。



### 6热跟新原理。HMR

HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 `Websocket`，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 `Ajax` 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 `jsonp` 请求获取该chunk的增量更新。



## 1.初始化

npm 配置淘宝镜像

```
 npm config set registry https://registry.npm.taobao.org
```



```js
npm init 

npm install --save-dev webpack@4.43.0    webpack-cli@3.3.12  
 # 全局安装最新稳定版本
  npm install webpack webpack-cli -g
 # 全局安装指定版本
  npm install webpack@4.43.0  webpack-cli@3.3.12 -g
# 全局安装指体验版本，目前(2020-7-10)体验版本是webpack5
  npm install webpack@next webpack-cli -g
 # 本地安装最新稳定版本，该命令是npm install webpack webpack-cli --save-dev的缩写
  npm i webpack webpack-cli -D

npx webpack a.js -o bundle.js      //从a.js文件开始，按照模块引入的顺序把所有代码打包到bundle.js文件里。
//npx是新版Node里附带的命令。它运行的时候默认会找到node_modules/.bin/下的路径执行。

```



## 2简单属性

### 1.context是基础目录,但是一般不设置。

```js
  var path = require('path');  
  module.exports = {
    context: path.resolve(__dirname, './src'),  //其中 context是基础目录，entry后是基础目录+'./js/a.js'；
    entry: './js/a.js',  // a.js里又引入了b.js
    output: {
      path: path.resolve(__dirname, ''),
      filename: 'bundle.js'
    },
    mode: 'none'
  };
```

### 2.入口 entry.

1.入口是字符串形式：单入口文件。

2.入口是数组形式：数组最后一个文件是资源的入口文件，数组其余文件会预先构建到入口文件。

3.入口是entry是对象形式：入口entry是对象形式的又称之为多入口配置。之前我们讲的都是单入口的配置，本质上打包后生成一个JS文件。多入口配置，本质上打包后生成多个JS文件。

4.入口entry函数形式:看函数返回值对应以上三种形式。

### 3.出口文件output

它有几个重要的属性**filename、path、publicPath和chunkFilename。**

#### 1.filename:

特定动态值有**[hash]、[chunkhash]和[contenthash]**，**[name]等**。

**[hash]**:根据打包中所有的文件计算出的hash值,在一次打包中，所有出口文件的filename获得的[hash]都是一样的。

**[chunkhash]**:是根据打包过程中当前chunk计算出的hash值。如果Webpack配置是多入口配置，那么通常会生成多个chunk，每个chunk对应的出口filename获得的[chunkhash]是不一样的。这样可以保证打包后每一个JS文件名都不一样（这么说不太严谨，但有助于理解）。

**[contenthash]**是根据打包时CSS内容计算出的hash值。一般在使用提取CSS的插件的时候，我们使用contenthash。

**[name]**：其中字符串和数组形式的entry，output.filename的[name]值都是main。

对于entry是对象形式的多入口配置，[name]是对象的属性名，对应每一个入口文件。



#### 2path：绝对路径。如果你不设置它，webpack4默认为dist目录。



#### 3publicPath：表示的是资源访问路径。

表示形式有两大类：相对路径与绝对路径。

我们都以当前浏览的页面url是 https://www.apple.com/ipad/ ,要访问的资源名称是bundle-3fa2.js为例讲解。

##### 1.相对路径

相对路径又可以分类两种情况，第一种，它相对于当前浏览的HTML页面路径取值的。

（1） output.publicPath以"./"或"../"等开头，表示要访问的资源以当前页面url作为基础路径。

```js
  publicPath: ""  // 资源的访问地址是https://www.apple.com/ipad/bundle-3fa2.js

  publicPath: "../dist/"  // 资源的访问地址是https://www.apple.com/dist/bundle-3fa2.js

  publicPath: "./dist/"  // 资源的访问地址是https://www.apple.com/ipad/dist/bundle-3fa2.js
```

（2） output.publicPath以"/"开头，表示要访问的资源以当前页面的服务器地址作为基础路径。

```js
  publicPath: "/"  // 资源的访问地址是https://www.apple.com/bundle-3fa2.js。

  publicPath: "/dist/"  // 资源的访问地址是https://www.apple.com/dist/bundle-3fa2.js。
```

##### 2.绝对路径

output.publicPath的值以HTTP协议名称开始。一般在使用CDN的时候，因为CDN的域名与我们自己服务器的域名不一样，我们会采用这种方式。

Web中常见的协议名称有http和https，例如我的网站 https://www.jiangruitao.com/ 的协议名称就是https。

还有一种叫做相对协议的形式，它以 // 开头，也就是省略了前面的https:或http:。

在使用相对协议的时候，浏览器会对前页面使用的协议名称与相对协议拼接。

下面看一下output.publicPath的值以协议开始的例子，在以协议开始的publicPath时，资源的访问地址是publicPath代表的绝对路径加上资源名称。

```js
  publicPath: "https://cdn.apple.net/"  // 资源的访问地址是https://cdn.apple.net/bundle-3fa2.js

  publicPath: "http://cdn.apple.net/"  // 资源的访问地址是http://cdn.apple.net/bundle-3fa2.js

  publicPath: "//cdn.apple.net/dist/"  // 资源的访问地址是https://cdn.apple.net/dist/bundle-3fa2.js
```

#### 4.chunkFilename：表示的是打包过程中非入口文件的chunk名称，通常在使用异步模块的时候，会生成非入口文件的chunk。

## 3Loader

Loader即为预处理器。Webpack本身打包时，对所有的引入资源都当做模块处理。但Webpack自身只支持对JS和JSON文件的处理。我们加载相应的Loader预处理器去解析特定资源。

预处理器loader本质是一个函数，它接受一个资源模块，然后将其处理成Webpack核心能使用的形式。

### 1.Loader的配置：

配置loader是在Webpack配置项module里进行的，这个配置项名为何叫module？Module是模块的意思，因此用这个名字可以表示这个配置项是用来解析与处理模块的。

```js
module:{
  rules: [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    exclude: /node_modules/
  }]
}
//除了test和use这两个关键配置参数，rules还有exclude、include、resource、issure和enforce等参数。
```

### 2.css-loader:解析CSS文件插入到JS文件中

  style-loader:通过js动态生成style标签插入到HTML中。



```js
module:{
	rules:[{
	test:/\.css$/,
	use:['style-loader','css-loader']  //先执行css-loader，然后把css-loader执行的结果交给style-loader执行。
	}]
}
```



### 3.bable-loader

1.bable是什么？

Bable是一个工具集，主要用于将ES6版本的javaScript转化成向后兼容的JS代码。从而可以在低版本的浏览器环境中运行。



babel-loader这个loader主要作用是在Webpack打包的时候，用Babel将ES6的代码转换成ES5版本的。

```js
const path = require('path');
  module.exports = {
    entry: './a.js',
    output: {
      path: path.resolve(__dirname, ''),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    mode: 'none'
  };
```



### 3.file-loader

file-loader在Webpack中的作用是，**处理文件导入地址并替换成其访问地址**，并把文件输出到相应位置。其中导入地址包括了JavaScript和CSS等导入语句的地址



### 4.url-loader

url-loader的特殊功能是可以计算出文件的base64编码接在打包在JS文件里，在文件体积小于我们指定的值（单位 byte）的时候，可以返回一个base64编码的**DataURL**来代替访问地址。

使用base64编码的好处是可以减少一次网络请求，提升页面加载速度。



## 4dev-server

**1publicPath**

影响资源在本地开发环境中的访问。



2.**contentBase**的替代

**为什么要配置 contentBase ？**

配置 DevServer HTTP 服务器的文件根目录。



我也不知道为啥contentBase配置不了，看了官网好像是这样配置的

```js
static: {
        directory: path.join(__dirname, 'public'),
      },
```



## 5.生产环境配置



### 1.提取css成单独一个文件

```js
//1
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//2
{
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader', 
          // 这个loader取代style-loader。作用：提取js中的css成单独一个文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
}，
//3
plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    })
  ]
```

### 2.压缩CSS文件

```js
//1
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


//2压缩css
plugins: [
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ]
```



### 3.JS语法检查

```js
//语法检查： eslint-loader  eslint
/*
        语法检查： eslint-loader  eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
              }
            airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true
        }
      }
```

### 4.js兼容

```js
/*
        js兼容性处理：babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill  
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
 */

 {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
```

### 5.js压缩

```js
  // 生产环境下会自动压缩js代码
  mode: 'production'
```

### 6.html压缩

```js
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ]
```



### 7.生产环境优化

#### 1.HMR

```js
/* 样式文件：可以使用HMR功能：因为style-loader内部实现了~
      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
      html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
        解决：修改entry入口，将html文件引入*/

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true
  }
```



#### 2.source-map

```js

devtool: 'eval-source-map'

/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      只能精确的行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好  
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
*/

```

