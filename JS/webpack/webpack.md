[	入门文章](https://www.jiangruitao.com/webpack/quick-start/)

[npm命令](https://www.cnblogs.com/web-record/p/10904907.html)

![image-20211030150844521](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211030150844521.png)

## 0.常见问题

webpack 根据引用关系，**构建**一个依赖关系图，然后利用这个关系图将所有静态模块**打包**成一个或多个 bundle 输出。

### 1.webpack的作用

1.模块打包。将不同模块的文件打包在一起，保证模块之间的正确引用，执行有序。

2.编译兼容。通过webpack的Loader机制，编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，以及浏览器无法识别的ES6语法。



### 2chunk是什么？模块，chunk,bundle的区别？

[好文](https://www.cnblogs.com/skychx/archive/2020/05/18/webpack-module-chunk-bundle.html)

```js
 //多入口打包生成两个chunk，构建两个bundle 
 entry: {
        index: "../src/index.js",
        utils: '../src/utils.js',
    }
```

1.module 是源码，一个源文件可以对应一个module，我们通过import可以导入另一个module

2.chunk是从入口文件开始，包含其依赖的文件的集合 。entry如果是一个对象的话，其对象的每一项都对应一个chunk.

可以通过import()和splitChunk 生成多个chunk.

3.chunk是webpack打包过程生成的，bundle是webpack打包结束后输出的文件。一般一个chunk对应一个bundle文件.但是也有例外，例如可以通过MiniCssExtractPlugins插件将一个chunks中的css文件单独提取出来打包成一个chunk.



<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112001116745.png" alt="image-20211112001116745" style="zoom:67%;" />

1. 对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 **module** ；
2. 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 **chunk** 文件，webpack 会对这个 chunk 文件进行一些操作；
3. webpack 处理好 chunk 文件后，最后会输出 **bundle** 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，比如上图中的 `utils.js -> chunks 1 -> utils.bundle.js`；但也有例外，比如说上图中，我就用 `MiniCssExtractPlugin` 从 chunks 0 中抽离出了 `index.bundle.css` 文件。

###  一句话总结：

`module`，`chunk` 和 `bundle` 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。



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



```js
entry:'index.js'

entry:['index.js'.'test.js']

entry:{
    index:'index.js',
    test:"test.js"
}
//
```



### 3.出口文件output

它有几个重要的属性**filename、path、publicPath和chunkFilename。**

#### 1.filename:

特定动态值有**[hash]、[chunkhash]和[contenthash]**，**[name]等**。

**[hash]**:根据打包中所有的文件计算出的hash值,在一次打包中，**所有出口文件的filename获得的[hash]都是一样的**。

**[chunkhash]**:是根据打包过程中当前chunk计算出的hash值。如果Webpack配置是多入口配置，那么通常会生成多个chunk，不同chunk对应的出口filename获得的[chunkhash]是不一样的。这样可以保证打包后每一个JS文件名都不一样（这么说不太严谨，但有助于理解）。

**[contenthash]**是根据打包时根据文件内容计算出的hash值。一般在使用提取CSS的插件的时候，我们使用contenthash。

**[name]**：其中字符串和数组形式的entry，output.filename的[name]值都是main。

对于entry是对象形式的多入口配置，[name]是对象的属性名，对应每一个入口文件。



#### 2path：打包后的文件在硬盘路径

绝对路径。如果你不设置它，webpack4默认为dist目录。



#### 3publicPath：所有资源引用路径的前缀

一般用于生产模式和开发模式引用资源的公共路径前缀的切换。

表示的是虚拟打包路径，文件夹不会真正生成，但是会添加到生成网页中静态资源的uri上。

[haowen](https://blog.csdn.net/wang839305939/article/details/85855967)

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211111145547566.png" alt="image-20211111145547566" style="zoom:50%;" />

![image-20211111145533874](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211111145533874.png)

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

#### 4.chunkFilename：

表示的是打包过程中非入口文件的chunk名称。

两种方式会产生非入口chunk:  1.import()语法导入的模块

​                                                    2.optimatization打包的第三方库模块

#### 5.library

```js
output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: 'element-ui.common.js',
        libraryExport: 'default',
        library: 'ELEMENT',
        libraryTarget: 'commonjs2'
    }
```



- libraryTarget: "commonjs" 当 library 加载完成，入口起点的返回值将分配给 exports 对象。这个名称也意味着模块用于 CommonJS 环境



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

1.**oneOf**：只匹配一个loader，**exclude**：排除某个文件夹，**include**只在某个文件夹下执行 , 

   **enforce**:pre(提前执行),post(最后执行)。

​    

```js
 module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查 src 下的js文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post',
        // 单个loader用loader
        loader: 'eslint-loader',
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
```





### 2.css-loader:解析在JS文件中引入的CSS文件插入到JS文件中

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



### 3.file-loader  用于打包 图片、字体、媒体、等文件

在JavaScript,CSS引入文件时，把文件生成到输出目录，并替换JavaScript和CSS引入文件的地址。



### 4.url-loader

功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中

使用base64编码的好处是可以减少一次网络请求，提升页面加载速度。



### 5.html-loader

负责处理html中的图片，使其能被url-loader解析。



## 4.resolve

解析模块的规则



```js
resolve:{
    alias:{
        //  import '$css/index';  为路径取别名
         $css: resolve(__dirname,'./src/css')
    },
     // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    //默认取数组的第一项，第一项找不到再去找数组的第二项。这样就不用一层一层往上找node_module
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
}
```





## 5dev-server

启动：npx webpack-dev-server

启动后的页面默认为 html-webpack-plugin插件的模板页面。



**1publicPath**

影响资源在本地开发环境中的访问路径。



2.**contentBase**

dev-server服务器运行代码的根目录。



**为什么要配置 contentBase ？**

DevServer启动后会自动将模块编译打包到内存当中。contentBase 用于配置 DevServer HTTP 服务器的文件根目录， 启动服务后会自动访问index.html。

我也不知道为啥contentBase配置不了，看了官网好像是这样配置的

.**contentBase**的替代

```js
static: {
        directory: path.join(__dirname, 'public'),
      },
```



3.**proxy**

将dev-Server当作代理服务器，解决跨域请求发送。

```js
devServer:{
  port:5000,
  host:localhost,
  host:true,
  open:true,
  compress:true,
   // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
  watchContentBase: true,
  watchOptions: {
   // 忽略文件
  ignored: /node_modules/
  },
  proxy:{
     '/api':{
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)         
          target:'http:localhost:3000',
          pathRewirte:{
               // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
              '^api':''
          }
     }
  }
}
```



## 6.optimization

开启第三方库的打包

```js
 optimization: {
    splitChunks: {
      chunks: 'all'
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }*/
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
```



## 7开发环境配置

1.解析css资源，less资源插入js中再插入html中。less-loader,css-loader,style-loader.

2.处理js和css中引用的图片资源。使用url-loader将相应的被引用的资源输出到指定目录，并更换引用地址。url-loader还可以通过limit指定大小来使用base64进行处理，从而减少请求数量，但是请求的html会增大。

3.处理html中引用的图片，使用html-loader。使被引用的图片能被url-loader识别解析。

4.使用file-loader处理其他资源类型，将引用的资源输出到指定目录，并更改引用地址。

5.html-webpack-plugin 指定模板html输出到输出目录，并且自动引用打包后的js资源。





## 8.生产环境配置



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

### 1.5CSS兼容性处理

postcss-loader 

对css进行处理，实现兼容。

plugin: postcss-preset-env

找到package.json中browserslist里面的配置，指定css要兼容到哪些浏览器和版本。

```js
 {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /*
            css兼容性处理：postcss --> postcss-loader postcss-preset-env

            帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

            "browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          // 使用loader的默认配置
          // 'postcss-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
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



## 9.开发环境优化

\* 优化打包构建速度

 \* HMR

\* 优化代码调试

 \* source-map

#### 1.HMR

HMR: HotModuleReplace 热模块替换。当某一个模块发生变化时，只会重新打包这一个模块而不是打包所有模块，提升构建速度。

热跟新：修改代码后会重新编译，刷新浏览器。

```js
/* 样式文件：可以使用HMR功能：因为style-loader内部实现了.所以开发环境使用style-loader性能更好，开发环境使用MiniCssExtractPlugin.loader提取成单独文件~
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

```js
//通过 module.hot.accept来监听非入口文件的js文件，当监听的文件发生变化时执行回调函数。
if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}
```



#### 2.source-map

总结： source-map是可以将构建后的代码映射到源代码中。

在开发环境和生产环境可以用不同的source-map.

开发环境为了调式更友好和构建速度更快可以使用 eval-source-map

生产环境如果需要隐藏源代码可以使用nosources-source-map 全部隐藏
    如果不需要隐藏为了调试更友好可以使用 source-map

```js

devtool: 'eval-source-map'

/*
  source-map: 一种将构建后代码映射到源代码的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    
    有些会产生映射文件到外部，有些内联在js中。下面有表外部的就是生成在外部，内联就是在js中。

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



## 10.生成环境优化

\* 优化打包构建速度

 \* oneOf

 \* babel缓存

 \* 多进程打包

 \* externals

 \* dll

\* 优化代码运行的性能

 \* 缓存(hash-chunkhash-contenthash)

 \* tree shaking

 \* code split

 \* 懒加载/预加载

 \* pwa



### 1.oneOf

优化生产环境的打包构建速度。

没有使用oneOf的情况下，打包构建模块时每一个文件都会被所有的loader过一遍。可以使用oneOf[]来指定只匹配一个loader.匹配到就退出。

```js
   oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          }
        
        ]
```

### 2.缓存

1.bable缓存

第二次打包构建速度更快。

可以使用bable缓存，当某个js模块改变时，第二次打包构建时会读取缓存，只修改改变的模块。使得构建速度更快。



2.文件资源缓存。

让上线后的在客户端的缓存更好使用。

这个其实就是浏览器的强缓存。

如果在浏览器强缓存时候，服务端发现客户端强缓存的文件有bug，修改bug后但是浏览器因为强缓存仍然在使用有bug的文件。可以通过给构建后的文件的文件名加哈希值来使得浏览器去重新请求相应更新后的资源。

   1.hash 

  构建后**所有的**css和js都会共享同一个hash值。如果只改一个文件也会使得所有强缓存失效。

   2.chunkhash:根据chunk生成hash值。如果打包来源属于**同一个chunk**，那么hash就一样。

​    chunk的概念：当入口文件引用的了其他文件被，其他文件和入口文件一起被打包构建成了同一个chunk. 

​     因为css还是在js中的，即使是使用插件MiniCssExtractPlugin将css单独提取处理，但本质上css和js还是属于同一个chunk的，所以chunkhash和上面的hash一样相同。

3.contenthash: 根据文件的内容生成hash值。**不同文件**hash值一定不一样

**总结：使用contenthash，当文件内容改变时，文件名也会改变，浏览器就会重新请求相应的资源**

![image-20211111212006493](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211111212006493.png)



### 3.树摇。tree-shaking

使用Es6Module化语法和开启production就会使用树摇，将没有使用的代码去除掉。

**test.js**

```js

export function mul(x, y) {
  return x * y;
}

export function count(x, y) {
  return x - y;
}

```

**index.js**

```js
//只引用了mul 没有count 
//开启 tree-shaking 会不将count函数打包在内

import { mul } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

```



### 4.代码分割。code split.

**好处：将一个大js文件分割成多个小的js文件，并行加载多个小的js文件提高加载文件的速度。**



####  1.声明多入口文件，打包构建后就会生成多个bundle

​	

```js
 entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
```

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112002243415.png" alt="image-20211112002243415" style="zoom: 80%;" />



#### 2.配置optimization

将第三方库的引用单独提出来成打包成一个chunk。这样做的好处是当多入口打包时可以将多入口文件的依赖文件提取出来单独打包成一个chunk，避免多模块重复打包第三方库的文件。

```js
//这就是对第三方库的引用
import $ from 'jquery';
```



```js
 /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */

optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```



#### 3.通过import()和optimization



**index.js**

```js
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'test' */'./test')
//webpackChunkName 指定单独打包的bundle名
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```

构建打包后

![image-20211112004435207](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112004435207.png)



### 5懒加载

通过在回调函数中调用 import() 实现懒加载 js文件

注意：import()导入的模块会被单独打包



**index.js**

```js

document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  import(/* webpackChunkName: 'test'*/'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};

```

浏览器运行时先不加载test.js,当点击按钮后才加载。

![image-20211112010335072](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112010335072.png)



<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112010422923.png" alt="image-20211112010422923" style="zoom: 80%;" />

懒加载会在需要懒加载时在html的head中插入<script>标签。

![image-20211112010709712](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211112010709712.png)

而预加载是浏览器有空就加载

```js
document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件 
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
```

 



### 6.cdn引入第三库，打包时不打包这些通过cnd引入的库

**index.js**

```js
//引入了jquery的库 可以通过 cdn引入
import $ from 'jquery';

console.log($);

```

**webpack-config-js**

```
externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
```



### 7.多进程打包

bable解析js文件时会耗费比较久的时间，可以通过 thread-loader 开启多进程打包，加快打包速度。

```js
  {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /* 
                开启多进程打包。 
                进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才需要多进程打包
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程2个
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: { version: 3 },
                        targets: {
                          chrome: '60',
                          firefox: '50'
                        }
                      }
                    ]
                  ],
                  // 开启babel缓存
                  // 第二次构建时，会读取之前的缓存
                  cacheDirectory: true
                }
              }
            ]
          }
```



### 8 dll（地耳）

将第三方库提取出来单独打包，后续构建打包项目代买只会打包我们项目本身的代买，不会编译打包第三方库，提高打包的速度。



将第三方库提取出来单独打包成多个chunk和manifest.json的第三库的映射文件。

配置webpack.config.js文件，指定哪些第三方库不打包，还有通过什么去引用。

在html中要手动引用第三方库的文件。



## 11.plugins



### 1.html-webpack-plugin

创建一个html（可以通过指定template来复制html）到输出目录，该html自动引入打包输出的资源.



## 12mode

`production`模式下会进行`tree shaking`(去除无用代码)和`uglifyjs`(代码压缩混淆)

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211111161327571.png" alt="image-20211111161327571" style="zoom:50%;" />

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211111161408776.png" alt="image-20211111161408776" style="zoom:50%;" />

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。 |
| none        | 不使用任何默认优化选项                                       |

- DefinePlugin：定义全局变量process.env.NODE_ENV，区分程序运行状态。
- FlagDependencyUsagePlugin：标记没有用到的依赖。
- FlagIncludedChunksPlugin：标记chunks，防止chunks多次加载。
- ModuleConcatenationPlugin：作用域提升(scope hosting)，预编译功能，提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
- NoEmitOnErrorsPlugin：防止程序报错，就算有错误也继续编译。
- TerserPlugin：压缩js代码。







## 13Vue的webpack配置文件分析

### 1.如何从vue脚手架中配置好的项目提取webpack配置文件？

![image-20211113004721918](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211113004721918.png)

### 2.开发环境的配置文件。

webpack.dev..js



module部分

```
module: {
//不解析
	noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,

}
```









### 3.生产环境的配置文件。

webpack.prod..js
