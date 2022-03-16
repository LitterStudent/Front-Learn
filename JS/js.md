##  0.1基础

js是动态类型的语言

js是一门基于原型的动态语言，主要独特的特性有this,原型和原型链

动态语言: 是运行时才确定数据类型的语言，变量在使用之前无需申明类型，通常变量的值是被赋值的那个值的类型

JS严格意义上分为：语言标准（ESMAScript）+宿主环境

宿主环境有浏览器的DOM+BOM 和Node.

### 1.值类型和引用类型

值类型存储在栈中，引用类型存储在堆中。这样设计是因为引用类型所占空间大，存储在堆中能提高性能。

常见的值类型： Number,String,Boolean,Undefined,Null,Symbol,BigInt

#### 1.undefined和null的区别？

undefined表示未初始化，变量通过 var声明后不赋值默认就未undefined。null是空对象指针，当要初始化对象时可以使用null赋值。

#### 2.类型的判断

typeof可以判断出所有的值类型。Number,Undefined,String,Symbol,BigInt,Boolean.除了Null. 能判断出函数。

instanceof 可以判断出引用类型。 [] instanceOf Array



#### 3.类型转换

强制类型转换即是 类型转换， 具体分为 显示类型转换 和 隐式类型转换。一般我们不能明显看出有类型转换的即为隐式类型转换。

1.  1+字符串    会转换成字符串
2.  == 
3. if()

**==在比   较时会进行强制类型转换，而=== 不允许**





#### 4.常见的类数组

argument,dom查询返回的dom元素列表



## 0.2浏览器

### 1.名词解释？

进程：**进程是cpu分配资源的最小单位。一个运行的程序对应一个进程，不同进程间的内容相互隔离。**一个进程包括运行中的程序和程序使用到的内存和系统资源。

[线程和进程](https://www.cnblogs.com/qianqiannian/p/7010909.html)

线程： 线程是进程下的执行者（程序运行单位），一个进程至少开启一个线程，也可以开启多个线程。同一个进程下的线程共享进程的内存空间和系统资源。同一个进程中的任意一线程执行出错，都会导致整个进程的崩溃。

同步：**程序发出调用时，一直等待直到返回结果。没有结果之前不会结束等待**。同步时调用者主动等待调用过程，且能立即得到结果的。**也就是必须一件一件事做等前一件做完了才能做下一件事**

异步：**程序发出调用时，不会等待结果返回，无法立即得到结果**。**需要额外的操作才能得到预期的结果。**



并行：指程序的运行状态。在同一事件内有多件事情并行处理。由于在同一时间内一个线程只能处理一件事件，所以并行需要**多个线程在一起同时执行多件事情**。

并发：指程序的设计结构。**多件事情被交替处理**，同一时刻只有一件事情在处理。单核结构的cpu实现多任务就是并发。



阻塞：阻塞指调用者（程序）在等待的返回结果的过程中线程被挂起。并在得到结果是返回。

非阻塞：非阻塞指调用者在等待返回的过程中线程没有被挂起，可以做其他事情。

单线程：从头到尾一行一行执行，如果有一行代码出错，后续的代码则不执行。同时代码容易阻塞。

多线程：各线程代码运行的环境不同，相互独立，避免阻塞。

### 2.浏览器进程

目前（截至2021年）的浏览器是多进程的：每当我们打开一个tab页，就是新建了一个独立的进程，该进程叫渲染进程。

浏览器包括的进程有：

1.**浏览器进程**：浏览器的主进程，只有一个。作用是管理各个tab页进程的创建和销毁；网络资源管理，下载；负责浏览器页面显示；

**2.渲染进程**：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎Blink和JavaScript引擎V8都是运行在该进程中，默认情况下，Chrome会为**每个Tab**标签创建一个渲染进程。

**3.GPU进程**：最多一个，负责3D绘制

**4.网络进程**。主要负责页面的网络资源加载

**5.插件进程**



总结来说，打开一个新页面采用的渲染进程策略就是：

- 通常情况下，打开新的页面都会使用单独的渲染进程；
- 如果从A页面打开B页面，且A和B都属于**同一站点**的话，那么B页面复用A页面的渲染进程；如果是其他情况，浏览器进程则会为B创建一个新的渲染进程。



**渲染进程内有多个线程**：

分为：1.GUI渲染线程：

​					1.解析html,css，构建dom树和cssom树和渲染树，布局，绘制等。

​	    	         2.当界面需要重绘或者回流时，该线程就会执行。

​					3.与js引擎线程互斥

​          2.js引擎线程：解析javaScript脚本并执行

​		  3.事件触发线程：处理DOM事件

​		  4.定时器触发线程：处理定时事件 

​         5异步http请求事件：处理http请求。

渲染线程和 JavaScript 引擎线程是 **互斥** 的。渲染线程在执行任务的时候，JavaScript 引擎线程会被挂起。因为 JavaScript 可以操作 DOM，若在渲染中 JavaScript 处理了 DOM，浏览器可能会不知所措了。



### 3.浏览器的v8引擎解析js代码的过程

![image-20211213225126970](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225126970.png)

![image-20211213225108548](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225108548.png)

1.当js代码执行时，js引擎首先会进行编译，编译的过程中，会创建执行上下文和可执行代码，执行上下文包含变量环境和词法环境，并将变量声明和函数声明放入到变量环境中（variable enviroment）,变量值设为undefined,函数值为堆内函数定义的地址。



![image-20211213225051274](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225051274.png)

执行上下文一般有三种，全局代码编译后产生的全局上下文，函数代码编译后产生的函数上下文，eval函数编译后产生的上下文。

**词法环境**

ES6 是支持块级作用域的，当执行到代码块时，如果代码块中有 let 或者 const 声明的变量，那么变量就会存放到该函数的词法环境中。对于上面这段代码，当执行到 bar 函数内部的 if 语句块时，其调用栈的情况如下图所示：

![image-20211213225018661](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225018661.png)

2.编译完成后，js引擎开始执行代码。js引擎会使用一个调用栈来压入执行上下文。当刚开始将全局上下文压入调用栈中，然后开始执行代码。当遇到函数调用时，会找到函数的代码进行编译，生成执行上下文后压入调用栈中然后再执行函数代码。



### 4.浏览器的渲染流程

#### 1.渲染流程

按照渲染的时间顺序，可以分为以下几个阶段：构建dom树，样式计算，布局阶段，分层，绘制，分块，光栅化和合成。

1.根据html解析生成dom树。

在控制台输入 documnet 可以查看 dom树

2.计算出dom节点中每个元素的具体样式

​			1.渲染引擎会先将收到的css文本数据转换称浏览器可以识别的数据结构，styleSheets. 可以通过document.styleSheets查看到.

 		   2.然后根据css的继承性和层叠性计算出每个dom节点的具体样式并保存到ComputedStyle中。

<!--源码中没有cssom这个词，所有很多文章说的cssom应该就是styleSheets，而且渲染树是16年前的说法，现在代码重构了，我们可以把 Layout Tree 看成是渲染树，不过还是有些区别的-->

3.创建布局树

​        1.根据dom树和ComputedStyle生成布局树。遍历dom树的可见节点，并将这些节点添加到布局树上 

​		2.在dom上不可见的元素如 head和其他 display:none 的元素不会出现在 布局树上

​		3.布局计算，计算布局树上每个节点的坐标位置。

4.分层

​			1.**根据布局树上的节点，为一些含有 层叠上下文的特殊节点生成专用图层，生成一颗对应的图层树。**如果一个节点没有图层就会从			属于父节点的图层。

​									1HTML根元素本身就具有层叠上下文。

​									2普通元素设置**position不为static**并且**设置了z-index属性**，会产生层叠上下文。

​									3元素的 **opacity** 值不是 1

​									4元素的 **transform** 值不是 none




![image-20211213200644741](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213200644741.png)

5.图层绘制

​			 1.将每一个图层的绘制步骤拆分成很多绘制指令组成的绘制列表

6.栅格化操作

<!--栅格化就是将图块转换成位图-->

​			 1.主线程将绘制列表提交给合成线程，合成线程将图层划分为图块，合成线程再选择视口附近的图块，把它交给栅格化线程池生成				位图。栅格化的过程会使用GPU来加速栅格化，生成的位图被保存在GPU内存中。（GPU是指GPU进程）

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213223254293.png" alt="image-20211213223254293" style="zoom: 80%;" />

7.合成和显示

所有图层的图块栅格化（光栅化）完成后，合成线程会发生‘DarwQuad'命令给浏览器进程，浏览器进程收到命令后将页面内容绘制到显卡的显存当中，最后显卡再将显存显示到屏幕上。

![image-20211214005221047](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214005221047.png)

#### 2.js阻塞dom树的解析

dom从页面的角度看是生成页面的基础数据结构。

​		从js的角度看，是浏览器提供的操作文档接口。



首先，html解析成dom树的这个过程是 html 边加载 边解析的，网络进程和渲染进程之间会建立一个共享数据的管道，网络进程加载多少数据后就会放到管道内，渲染进程则会在管道的一端不断读取数据并喂给 html解析器，从而实现 **边加载边解析**。

如果在解析dom树时发现了js脚本，就会停止dom树的解析，转而先加载并执行js脚本,因为js脚本可能修改dom树的结构。但是Chrome做了优化，会做预解析操作，渲染引擎收到字节流后，会开启一个预解析线程，解析html中需要加载的js,css资源，然后提前加载。而js引擎在解析js之前是不知道js是否操作了cssom的，所以渲染引擎会先加载解析css，再执行js脚本。

所以综上所述，js脚本会阻塞html的解析，而样式文件会阻塞js脚本的执行。



#### 3.css如何影响首次加载的白屏时间

当html没有js时，会先解析html构建dom,预解析会先加载css文件，当dom构建完成后就会开始构建cssom.(styleSheets).让js能操作样式表和给布局树提供样式信息。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214133757347.png" alt="image-20211214133757347" style="zoom:50%;" />



而当html中即有css,又有js时，会阻塞dom的构建，先构建cssom,再执行js，再构建dom

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214134158183.png" alt="image-20211214134158183" style="zoom: 67%;" />

所以为了缩短白屏时间：1.减少css文件的体积，将一个大的css文件通过媒体查询属性分为不同用途的css文件，不同场景下加载不同的											css文件。

​											2.压缩js文件

​											3.对于不需要html解析阶段使用的js可以使用 async或defer标签。

```js
1:<script src="foo.js" type="text/javascript"></script> // 会，因为加载了js文件
2:<script defer src="foo.js" type="text/javascript"></script> // 不会，因为是在DOM解析完成后， DOMContentLoaded 之前执行
3:<script sync src="foo.js" type="text/javascript"></script> // 会，因为加载后立即执行
4:<link rel="stylesheet" type="text/css" href="foo.css" /> // 会，因为需要生成CSSOM
5:<link rel="stylesheet" type="text/css" href="foo.css" media="screen"/> // 会，因为针对屏幕
6:<link rel="stylesheet" type="text/css" href="foo.css" media="print" /> // 不会，因为在打印机才生效
7:<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:landscape" /> // 会，因为横屏
8:<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:portrait" /> // 不会，因为竖屏
```

#### 4.DOMContentLoaded 和 Load

1.DOMContentLoaded，这个事件发生后，说明页面已经构建好 DOM 了，这意味着构建 DOM 所需要的 HTML 文件、JavaScript 文件、CSS 文件都已经下载完成了。

2.Load，说明浏览器已经加载了所有的资源（图像、样式表等）。

### 5.回流-重绘-合成

#### 1.回流（重排）

对dom修改引发了dom的几何尺寸的变化就会触发回流。

具体一点，有以下的操作会触发回流:

1. 一个 DOM 元素的几何属性变化，常见的几何属性有`width`、`height`、`padding`、`margin`、`left`、`top`、`border` 等等, 这个很好理解。
2. 使 DOM 节点发生`增减`或者`移动`。
3. 读写 `offset`族、`scroll`族和`client`族属性的时候，浏览器为了获取这些值，需要进行回流操作。
4. 调用 `window.getComputedStyle` 方法。

一些常用且会导致回流的属性和方法：

- `clientWidth`、`clientHeight`、`clientTop`、`clientLeft`
- `offsetWidth`、`offsetHeight`、`offsetTop`、`offsetLeft`
- `scrollWidth`、`scrollHeight`、`scrollTop`、`scrollLeft`
- `scrollIntoView()`、`scrollIntoViewIfNeeded()`
- `getComputedStyle()`
- `getBoundingClientRect()`
- `scrollTo()`



依照上面的渲染流水线，触发回流的时候，如果 DOM 结构发生改变，则重新渲染 DOM 树，然后将后面的流程(包括主线程之外的任务)全部走一遍。

![img](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/1732ec388e85bd2d%7Etplv-t2oaga2asx-watermark.awebp)

#### 2.重绘

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：`color`、`background-color`、`visibility`等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

根据概念，我们知道由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，从而省去布局的过程，流程如下：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/8/1732ec3b24ec43c9~tplv-t2oaga2asx-watermark.awebp)



跳过了`布局树`和`建图层树`,直接去绘制列表，然后在去分块,生成位图等一系列操作。

可以看到，重绘不一定导致回流，但回流一定发生了重绘。



#### 3.合成

还有一种情况：就是**更改了一个既不要布局也不要绘制**的属性，那么渲染引擎会跳过布局和绘制，直接执行后续的**合成**操作，这个过程就叫**合成**。

举个例子：比如使用CSS的transform来实现动画效果，**避免了回流跟重绘**，直接在非主线程中执行合成动画操作。显然这样子的效率更高，毕竟这个是在非主线程上合成的，没有占用主线程资源，另外也避开了布局和绘制两个子阶段，所以**相对于重绘和重排，合成能大大提升绘制效率。**

利用这一点好处：

-  合成层的位图，会交由 GPU 合成，比 CPU 处理要快
-  当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
-  对于 transform 和 opacity 效果，不会触发 layout 和 paint



#### 实践意义

-  使用`createDocumentFragment`进行批量的 DOM 操作
-  对于 resize、scroll 等进行防抖/节流处理。
-  动画使用transform或者opacity实现
-  将元素的will-change 设置为 opacity、transform、top、left、bottom、right 。这样子渲染引擎会为其单独实现一个图层，当这些变换发生时，仅仅只是利用合成线程去处理这些变换，而不牵扯到主线程，大大提高渲染效率。
-  rAF优化等等



```css

.box {
will-change: transform, opacity;
}
```

这段代码就是提前告诉渲染引擎 box 元素将要做几何变换和透明度变换操作，这时候渲染引擎会将该元素单独实现一层，等这些变换发生时，渲染引擎会通过合成线程直接去处理变换，这些变换并没有涉及到主线程，这样就大大提升了渲染的效率。这也是 CSS 动画比 JavaScript 动画高效的原因。

如果涉及到一些可以使用合成线程来处理 CSS 特效或者动画的情况，就尽量使用 will-change 来提前告诉渲染引擎，让它为该元素准备独立的层。但是凡事都有两面性，每当渲染引擎为一个元素准备一个独立层的时候，它占用的内存也会大大增加，因为从层树开始，后续每个阶段都会多一个层结构，这些都需要额外的内存，所以你需要恰当地使用 will-change。总结



### 6浏览器面板功能

![image-20211214142754526](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214142754526.png)

### 7.优化浏览器页面

从两个层面优化，首次加载和加载完后与用户交互的时候。

1.加载阶段

​	   1.减少加载资源的个数，可以将 css和js 改为内联的形式，或者如果js没有dom操作可以添加defer或async标签，或者使用媒体查询		来取消某些css文件的加载

​		2.减少加载资源的大小，压缩css和js文件，删除内部的注释等。

​		3.引用cdn来减少资源的请求时间。

![image-20211214151802759](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214151802759.png)

2.交互阶段

交互阶段的优化其实就是优化渲染进程渲染帧的速度，渲染进程渲染帧的速度决定了交互的流畅度。和加载阶段不同的是，在交互阶段通常都是由js来触发动画的。![image-20211214172231344](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211214172231344.png)

1.避免强制同步布局。避免js强制将计算样式和布局操作提前到当前的任务中

2.合理使用css合成动画，因为合成动画是在合成线程上执行的，不会主线程阻塞。

3.避免频繁的垃圾回收。频繁的垃圾回收会占用主线程从而影响其他任务的执行。



减少重排和重绘的操作。



## 0.3 js执行原理

作用域是指执行上下文中定义变量（变量命和函数名）的合法使用范围。作用域规定了上下文如何查找变量。

var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”.

**函数声明和函数表达式**

函数声明会提升，且比变量提升优先级高。

```
//函数声明语句写法function test(){}; test();  
//函数表达式写法var test = function(){}; test();
```



### 1.执行上下文和作用域

#### 1.作用域

javaScript是词法作用域，即静态作用域。函数的作用域在函数定义时就决定了。

```js
// 题目一
function bar() {
  var myName = ' 极客世界 '
  let test1 = 100
  if (1) {
    let myName = 'Chrome 浏览器 '
    console.log(test)
  }
}
function foo() {
  var myName = ' 极客邦 '
  let test = 2
  {
    let test = 3
    bar()
  }
}
var myName = ' 极客时间 '
let myAge = 10
let test = 1
foo()  // 1
```

```js
// 题目二
var bar = {
  myName: 'time.geekbang.com',
  printName: function () {
    console.log(myName)
  },
}
function foo() {
  let myName = ' 极客时间 '
  return bar.printName
}
let myName = ' 极客邦 '
let _printName = foo()  // 注意这里赋值操作，重新生成函数的词法作用域
_printName()
bar.printName()
```

es6之前只有函数作用域和全局作用域。es6之后新增了块级作用域。

全局作用域内定义的变量在任何位置都能访问。

函数作用域定义的变量只有函数内部能够访问。函数执行结束后会被销毁。

块级作用域即{}。判断语句，循环语句，甚至单独的一个{}.

```js
function bar() {
  var myName = ' 极客世界 '
  let test1 = 100
  if (1) {
    let myName = 'Chrome 浏览器 '
    console.log(test)
  }
}
function foo() {
  var myName = ' 极客邦 '
  let test = 2
  {
    let test = 3
    bar()
  }
}
var myName = ' 极客时间 '
let myAge = 10
let test = 1
foo()
```

**词法环境**

ES6 是支持块级作用域的，当执行到代码块时，如果代码块中有 let 或者 const 声明的变量，那么变量就会存放到该函数的词法环境中。（关于词法环境，在下面的ES5执行上下文中还会有说明）对于上面这段代码，当执行到 bar 函数内部的 if 语句块时，其调用栈的情况如下图所示：



![image-20211213225230580](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225230580.png)

变量提升。

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}
```

![image-20211213225243702](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225243702.png)



#### 2.ES3执行上下文

当js引擎刚开始执行全局代码时，会创建全局执行上下文压入执行栈中，直到全局代码执行完成后才弹出。 当**执行一个函数**的时候，就会创建一个**执行上下文**，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

1.**三个重要属性**：    

对于每个执行上下文，都有三个重要属性

- **变量对象**(Variable object，VO)

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。不同执行上下文下的变量对象稍有不同.

全局执行上下文的变量对象是window,

函数执行上下文的变量对象会用当前函数的参数列表先初始化，函数代码块中声明的变量和函数也会被添加到变量对象上。

- **活动对象**(activation object，AO)

函数进入执行阶段，原本不能访问的变量对象会被激活称为一个活动对象，自此我们可以通过活动对象访问到各种属性。

- **作用域链**(Scope chain)

一条变量对象的链条。包含了当前的变量对象以及父级上下文的变量对象，直到全局对象。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链

- **this**

  当前执行上下文的调用者。

**2.执行上下文的创建过程**

1.函数被调用

2.执行具体的代码前，创建相应的执行上下文

3.进入执行上下文的创建阶段：

​			1.初始化作用域链条

​			2.通过函数参数创建 argument objects 

​			3.扫描上下文找到所有的函数声明和 var 变量声明

​					根据声明在变量对象中创建相应的属性，如果是函数声明，则值为指向堆内存的地址。如果是变量声明则为undefined.

4.进入执行上下文的执行阶段

​             执行函数内的代码，为变量对象内的属性赋值。



#### 3.ES5执行上下文

ES5规范中上下文和ES3相比，删除了变量对象和活动对象，新增了 **变量环境**（variable enviroment）和 **词法环境**（lexical enviroment）**词法** 环境和 **变量** 环境的区别在于前者用于存储**函数声明和变量（ `let` 和 `const` ）**绑定，而后者仅用于存储**变量（ `var` ）**绑定。



**This Binding**

**全局**执行上下文中，`this` 的值指向全局对象，在浏览器中`this` 的值指向 `window`对象，而在`nodejs`中指向这个文件的`module`对象。

**函数**执行上下文中，`this` 的值取决于函数的调用方式。具体有：默认绑定、隐式绑定、显式绑定（硬绑定）、`new`绑定、箭头函数。



**词法环境两个组成部分：**

  			1.环境记录：存储变量声明（ `let` 和 `const` ）和函数声明的位置。函数中还包含arguments对象。

​			  2.对外部环境的引用：可以访问其外部的词法环境

**变量环境两个组成部分：**

​			  1.环境记录：存储变量声明（ var）.

​			  2.对外部环境的引用：可以访问其外部的变量环境

```js
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
//执行上下文如下所示
```

```js
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
   
  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}

```

### 2.原型

原型（prototype）：为其他对象提供共享属性的对象。原型本身也是一个对象。每一个对象上都有一个隐式引用指向它的原型。所谓的隐式，是指不是由开发者亲自创建的。

原型链：原型对象上也有隐式属性指向它的原型或者null，这样就构成了原型链。在访问一个对象的属性时，实际上就是在查询原型链。这个对象是原型链的第一个元素，先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。



#### 1.原型的继承方式

显示继承和隐式继承

**显示继承**：通过调用 Object.setPrototypeOf(son,father) 或者 Object.create( father ).

**隐式继承**：通过 构造函数， new 出 一个对象实例。该实例就会有一个原型，该原型为一个以 Object.prototype 为原型的对象。如下图

![](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225256739.png)



#### 2.内置构造函数的隐式继承

JavaScript 的主流继承方式，选择了隐式原型继承，它提供了几个内置的 constructor 函数，如 Object, Array, Boolean, String, Number 等。

```js
let obj = new Object() //默认会使用 Object.prototype 对象 作为obj的原型
obj.firstname = 'd'
obj.lastname = 'e'

// 语法糖写法
// 等价继承原型
obj = {
    firstname = 'd',
    lastname = 'e'
}

// 同样，数组写法也是

let arr = new Array(1,2,3);
// 
let arr = [1,2,3]

```

#### 3.Object和Function的原型

**最后总结： ** **先有Object.prototype（原型链顶端），Function.prototype继承Object.prototype而产生，最后，Function和Object和其它构造函数继承Function.prototype而产生。**

![image-20211213144404079](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/zvIC4OwQhEcq2J7.png)

## 0回调

### 1.什么是回调？

回调是js中实现异步逻辑的一种方式。可以为某些异步操作添加后续任务。例如事件监听，ajax事件，定时器。



### 2.回调的缺点

1.多层的回调会使得代码嵌套再一起，从而使得阅读理解起来很困难，俗称回调地狱。

2.在某些第三方库使用的回调会使得我们编写一部分程序的控制权转移给了第三方。导致信任问题。回调在第三方的调用过程中可能会出现错误。







## 1promise

[好文](https://juejin.cn/post/6844903775329583112#heading-19)



### 1.为什么js要有异步？

js是单线程的，某些代码如i/o（文件读取，输出等），ajax网络请求会消耗较长的时间，如果是同步的话就会阻塞后面代码的执行过久。所以需要异步先将这些任务挂起，到后续执行。



### 2 .js为什么是单线程的？

js的主要用途是用户交互和处理dom.这决定了它只能是单线程。否则多个线程同时操作dom时会让浏览器难以协调。

但html5提出了 WebWorker标准，允许js 创建多个子线程，但子线程完全由主线程控制，且不能操作dom.



### 3.promise的特点

js解决异步任务的一种方案。将执行异步任务的代码和处理结果的代码清晰的分离了。可以将要异步操作的执行代码放在 new promise((resolve,rejected)=>{ })构造函数内，将处理异步操作结果的代码放在promise.then内。

将异步回调的控制权转移到了promise的手中而不是像封装完ajax第三方库的手中。

promise可以处理将以往的异步执行的回调地狱转换成了可以通过.then来链式执行的代码。可维护性以及可阅读性都得到了增强。



一个promise的状态已经确定下来后，该promise的后续的then的调用都会在下一个的异步时间点上执行。



### 4.promise API

调用完res()后,res()后面的代码仍可以执行. 如果return 了的话就不会执行

```javascript
new Promse((resolve, reject)=>{ resolve(1);console.log(11)})         //会
new Promse((resolve, reject)=>{ return resolve(1);console.log(11)})  //不会
```

resolve()内传入的可以是普通的数据类型也可以是promise。当传入的是promise时，则会直接返回该promise,该promise的状态可以是fulfill 完成，或者 reject 拒绝。

```javascript
const p1 = new Promise(function (resolve, reject) {
    reject("dd")
})

const p2 = new Promise(function (resolve, reject) {
    resolve(p1) // 传入拒绝状态的promise
})

p2
  .then(result => console.log('res',result))
  .catch(error => console.log('err',error)) // err dd
///////////////////////////////////////////////////////////////////
const p1 = new Promise(function (resolve, reject) {
    resolve("dd")
})

const p2 = new Promise(function (resolve, reject) {
    resolve(p1) //传入 完成状态的promise
})

p2
  .then(result => console.log('res',result))  // res dd
  .catch(error => console.log('err',error))
```

reject()内传入的为promise,则返回的promise会被包裹一层reject状态的promise。

```js
const p1 = new Promise(function (resolve, reject) {
    resolve("dd")
})

const p2 = new Promise(function (resolve, reject) {
    reject(p1)
})

p2
  .then(result => console.log('res',result)) 
  .catch(error => console.log('err',error))// err Promise {<fulfilled>: 'dd'}
///////////////////////////////////////////////////////////////////
const p1 = new Promise(function (resolve, reject) {
    reject("dd")
})

const p2 = new Promise(function (resolve, reject) {
    reject(p1)
})

p2
  .then(result => console.log('res',result))  
  .catch(error => console.log('err',error))     // err Promise {<rejected>: 'dd'}
```



即使没有用.catch或者.then的第二个参数去指定处理错误的回调函数，promise**内部发生的错误不会影响promsie外部代码的执行。**

```javascript
const someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
            // 下面一行会报错，因为x没有声明
            resolve(x + 2);
        });
    };

    someAsyncThing().then(function () {
        console.log('everything is great');
    });

    setTimeout(() => { console.log(123) }, 2000);   //这句代码仍会执行
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```





.then() 内的执行函数如果最后返回的不是promsie,就会被Promise.resolve。如果不返回值，则返回 promise fulfilled 'undefined' 

**throw new Error()** 和 **return new Promise.reject(new Error('error'))** 和 **return new Promise.reject(‘ddd')** 和 **内部发生错误 （例如调用没有声明的函数）**是一样的，都会被.then的第二个参数或者.catch()捕获。

```javascript
let p = new Promise((res)=>{
	a();  //这里发生错误  然后返回的promise 会因为这个错误 而 rejected 
    res();//这一句不会执行到
})

setTimeout(()=>{
    console.log(p)  //p 是 rejected 的状态
})
```

.then()的第二个函数的返回任意不是promsie的值也都是用 Promse.resolve()去包装的。

`catch`不管被连接到哪里，都能捕获上层未捕捉过的错误。



.**Promise.resolve()**:当传入一个promise时会返回这个promise.是rejected状态就返回 rejected。resolve状态就返回 resolve.

​                              :当传入不为promise时，就会被 resolve包装





.then 和 .catch 希望传入的是函数，传入其他的会发生透传。如果不传任何值也会发生透传，即promise不改变传到下一个then.

.finally()内的执行函数不会接受任何参数。它用于在最后执行特定操作。执行完后返回的promise还是上次传入的promise,即使返回promsie也不会替换上次传入的promise.



Promise.all()

1.传入的参数可以不是数组，但必须实现了Iterator接口，且每个成员实例都是promise，如果不是promise实例，则会先调用Promise.resolve()转为实例.

2.数组内所有的promise都为 resolved 时，Promise.all()返回的promise才是resolved,值为所有promise的值的数组.只要有一个为rejected，则Promise.all返回的就是rejected，值为rejected的promise的值.



Promise.race()

```javascript
let p = Promise.race([
fetch(url),
new Promise((res,rej)=>{
    setTimeout(()=>{
        rej("")
    },4000)
})
])
p.then((res)=>{
    console.log(res);
})
 .catch(err=>{
    console.log(err)
})
```

Promise.any()

只要有一个promise为fulfilled,则返回的包装实例的状态也时fulfilled.只有所有的promise都为rejected，返回的promise才是rejected.

```javascript
ar resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42           就返回一个成功的值
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]      返回的是一个错误内容数组
});
```



```javascript
async function async1 (){
console.log("async1 2")
await async2()
    //这里第三次加入微任务
console.log("async1 end 6")
}
console.log("scripts start 1")
async1()
async function async2() {
 await console.log("async2 2.5")
    //这里第一次加到微任务
}
new Promise((resolve,reject)=>{
  console.log("promise1 3")
  resolve()
}).then(()=>{
    //第二次加入到微任务
  console.log("promise2 5")
})
setTimeout(()=>{
  console.log("setTimeout 7")
})
console.log("scripts end 4")
```



```javascript
async function async1 (){
console.log("async1 2")
await async2()
    //第一次加入微任务
console.log("async1 end 5")
}
console.log("scripts start 1")
async1()
async function async2() {
 return 1
}
new Promise((resolve,reject)=>{
  console.log("promise1 3")
  resolve()
}).then(()=>{
    //第二次加入微任务
  console.log("promise2 6")
})
setTimeout(()=>{
  console.log("setTimeout 7")
})
console.log("scripts end 4")
```



```javascript
  console.log('script start 1')

async function async1() {
    await async2()
    console.log('async1 end 8') //第4个
}
async function async2() {
    console.log('async2 end 2')
    return Promise.resolve().then(()=>{
        console.log('async2 end1 5')  //第一个入微任务队列
    }) 
}
async1()

setTimeout(function() {
    console.log('setTimeout 11')
}, 0)

new Promise(resolve => {
    console.log('Promise 3 ')
    resolve()
})
.then(function() {
    console.log('promise1 6') //第二个入微任务队列
})
.then(function() {
    console.log('promise2 7') //第3个入微任务队列
})
.then(function() {
    console.log('promise2 9') //第5个
})
.then(function() {
    console.log('promise2 10') //第6个
})

console.log('script end 4')
```





### 5.如何判断一个对象是不是promise

判断该对象是否有定义属性名为then的方法。

promise instanceof Promise这样只能判断 es6 标准的 promise 实例，无法判断 Bluebird 等的第三方 promise 实现



### 6.promise如何停止链式调用

1..在then()中返回一个pending的promise。

return new Promise(()=>{});

2.



## 2 async 和 await

async 和 await 能进一步改善promise的链式调用，**使得异步代码看起来更像是同步代码，用同步的语法实现异步代码**。

**async函数的返回值为 promise.**一个函数如果加上async ,那么该函数就会返回一个状态为fulfilled的promise，**除非async函数内抛出的错误或者await后面的promsie状态变为rejected.** 

当函数体执行时，一旦遇到await就会先返回，让出线程，跳出函数体。 等到触发的异步操作完成时，才有机会执行函数体后面的语句。await 后面一般跟着一个promise。await下一行的语句就和.then里的语句一样，`（会在promise状态确定下来后加入到微任务队列当中）`，得等await 等待的Promise状态确定后才会继续执行下去。



在async函数中，await规定了异步操作只能一个个排队执行，从而达到同步的方式执行异步操作。

`async/await` 在底层转换成了 `promise` 和 `then` 回调函数。也就是说，这是 `promise` 的语法糖。
 每次我们使用 `await`, 解释器都创建一个 `promise` 对象，然后把剩下的 `async` 函数中的操作放到 `then` 回调函数中。
 `async/await` 的实现，离不开 `Promise`。从字面意思来理解，`async` 是“异步”的简写，而 `await` 是 `async wait` 的简写可以认为是等待异步方法执行完成。

async函数返回的promise对象，必须等待内部所有的await命令的promise对象都执行完成，才会发生状态的改变。**除非遇到return语句或者 抛出错误。**即抛出错误时会提前终止async函数的后续执行。

await命令正常情况下后面是一个promise对象。但如果不是的话，就直接返回该值。

```javascript
async function f() {
  // 等同于
  // return 123;
  //不会阻塞
  return await 123;
}

f().then(v => console.log(v))
// 123
```



**如果async函数中某处的await返回了reject的promise,则后面的代码不会执行。**

**如果想是错误的地方能被捕获不影响后续代码的执行可以使用 try 和catch捕获错误，或者在await的promise的后面增加一个.catch.**



#### 1.使用注意

1. async 函数中，将await语句放入到 try catch 中。如果await的promise变为 rejected时，可以在catch中捕获到。
2. 多个await命令后面的异步操作如果没有关联关系。就可以抽离出来，使用promise.all让它们同时触发，节省时间。  



#### 2async，await是如何实现的？

[好文](https://juejin.cn/post/7007031572238958629#heading-6)

async/await 其实就是 generator函数的语法糖。generator函数内部通过 yield字段(一耳)来暂停执行，一般yield字段后面跟通过在new Promise(）函数内部添加异步操作，next()方法执行到yield暂停处即返回的未确定状态promise处，为未确定状态的promsie添加.then来添加完成异步操作后的回调。



#### 3.forEach的使用

```
promiseArr.forEach(async(item)=>{
 await item(); //无效异步  因为forEach内部的实现是通过遍历调用回调实现的。
})
.map .filter 


for(let i=0; i<lenght ;i++){
  await promiseArr[i]; //有效异步
}
for of 中 使用也有效
```





## 3 var let const 

使用 var声明的变量会提升到作用域的首部。被提升的是变量声明部分。

而使用let和const声明的变量则不会被提升。所以let 和const 声明的变量不能提前使用，有暂时性死区的说法。

var在全局作用域中声明的变量会被挂载到全局对象window上(不论是否严格模式)，而let和const不会。

var 在函数中使用会声明函数作用域变量，函数外访问不到。而let和const还可以声明块级作用域变量。块级外访问不到。





## 4函数提升和变量提升

使用var声明的变量会被提升，但是被提升的只是变量声明的那部分。

而函数声明也会提升，提升的是整个函数。所以可以在声明整个函数之前直接调用这个函数。





## 5继承

ES5的继承有很多种

1. 原型链继承。通过将父类的实例赋予子类构造函数的原型。缺点：子类实例都共享同一父类实例。
2. 道用构造函数继承。通过在子类的构造函数中调用父类的构造函数来实现对父类实例属性的继承。缺点：无法获取父类的原型。
3. 组合继承，即在子类中调用父类的构造函数也将子类的构造函数的原型指向父类实例。缺点：子类实例的属性会和子类的原型上的属性有重合。
4. 寄生组合继承。通过在子类的构造函数中调用父类的构造函数，同时也将子类的原型的原型指向父类，实现对父类原型的继承。

```js
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}

```

![](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225325661.png)

ES6的继承是通过 Class  Extends 语法糖实现的，本质上还是原型链实现的继承。（大概吧）

类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。

class 中的 constructor（类构造函数） 就是ES5中的构造函数。虽然使用  instanceof 去判断时为false .但是在使用 类创建实例时可以直接将constructor（类构造函数）当做构造函数。可以通过在constructor 内声明 类实例的属性。

在class 内 声明的普通方法 ，都会添加到 该类的原型上。

使用static作为前缀的声明的方法会被当做静态方法。

ES6通过 extends字段 声明继承父类 和在类构造函数 constructor中使用 super调用父类的构造函数，完成对this的塑型从而实现继承。内部实现原理还是 es5的寄生组合继承。





## 6 new 构造函数 的过程

生成一个空对象，空对象的隐式指针指向构造函数的原型。执行构造函数并且将构造函数的this指向 新生成的空对象。执行完构造函数，函数内的属性添加到了空对象上。最后 如果构造函数的执行结果没有返回一个对象，那就直接返回之前生成的对象。否则就返回构造函数返回的对象。







## 7事件循环

DOM事件：用户在界面上进行一些操作触发的响应。

事件监听器：onclik 或 addEventListener() 添加事件监听器。事件监听器上绑定的回调函数又可以叫消息。

事件循环 **Event Loop是浏览器为解决单线程执行js代码而不引起阻塞的机制。为了协调事件，用户交互，ui渲染，网络请求。**

事件循环是异步回调的实现原理。

事件循环的机制是由宿主环境来决定的，在浏览器运行环境中是由浏览器内核引擎决定的。在NodeJS中是由libuv引擎实现的。

**当js引擎执行栈为空时会先，执行微任务，再尝试dom渲染。然后才执行宏任务。**

**1.先把Call Stack清空**
**2.然后执行当前的微任务**
**3.接下来DOM渲染（dom渲染是否执行是由浏览器来决定的，如果浏览器在后台执行，则不会进行dom渲染，还有其他情况，虽然我不知道）**
**微任务在dom渲染`之前`执行，宏任务在dom渲染`之后`执行**。



**为什么微任务比宏任务先执行？**

微任务时ES6语法规定的，宏任务时由浏览器规定的，会经常 使用Web APIs。

**为什么要有微任务？**

按照官方的设想，任务之间是不平等的，有些任务对用户体验影响大，就应该优先执行，而有些任务属于背景任务（比如定时器），晚点执行没有什么问题，所以设计了这种优先级队列的方式



事件轮询会一直存在，等待回调函数推入任务队列当中 **Callback Queue**. Callback Queue是宏任务队列。

![image-20211208212138574](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211208212138574.png)

dom事件也是基于 事件循环实现的。当添加dom事件时，会将相应事件和回调添加到 WebAPIs中，当WebAPIs监听到特定事件时就会将回调添加的任务队列 Callback Queue中。但是如果是通过 disptchEvent 和 buttonElement.click() 这两种方式去触发事件的回调，不会被加入到任务队列当中，而是顺序执行。（至于为什么，应该是定义就是如此）

```js
document.body.addEventListener('click', _ => console.log('click'))

document.body.click()
document.body.dispatchEvent(new Event('click'))
console.log('done')

// > click
// > click
// > done
```



（单线程）**js引擎在执行代码时**，通过将不同的执行上下文压入执行栈中来保证代码的有序执行。在执行代码的时候，如果遇到了异步任务，js 引擎并不会一直等待其返回结果，而是会将这个异步任务交给特定线程处理，继续执行执行栈中的其他任务。当异步任务执行完毕后，**再将异步任务对应的回调加入到**（与当前执行栈中不同的另一个）**任务队列中等待执行**。任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011450750.png?token=AP3MTU6V37H6OC5NBMLSIR3BU4NXU" alt="image-20211026152035189" style="zoom:50%;" />

 先执行script脚本，执行过程中遇到微任务加入微任务队列，遇到宏任务加入宏任务队列。当script脚本执行完也就是js执行栈为空的时候，就会去清空微任务队列。当微任务队列执行，再取出宏任务队列的第一个任务执行。直至两个队列的所有任务都执行完。

宏任务：<script> setTimeout setInerval  requestAnimationFrame，,Ajax,**dom事件** 

requestAnimationFrame：希望在下一次浏览器重绘之前执行动。浏览器重绘是在微任务结束之后，所以 requestAnimationFrame 会在微任务结束之后，宏任务开始之前执行。

`requestAnimationFrame`姑且也算是宏任务吧，`requestAnimationFrame`在[MDN的定义](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame)为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行。

告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒60次。

当使用 setTimeout执行指定的动画时，执行的频率难以控制。我们知道定时器的最小时间间隔为 4ms，所以最多每秒执行250次。但是即使能够每秒执行250次，250次修改样式，浏览器也不会每秒重新渲染页面250次，所以一些样式的修改是不会被渲染到页面上，这样就造成了一些操作的。浏览器会自动选择合适的时机渲染。一般与显示器的刷新频率一致，60Hz.每秒刷新60次。16.6ms刷新一次。







**setImmediate**(node):

微任务： promise.then catch finally ，async  await ; **MutationObserver**

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011451103.png?token=AP3MTU3NI5CYO4PMLTH4FDLBU4N2I" alt="image-20211016193053562" style="zoom:50%;" />

### 1.MutationObserver

监听DOM树的变化。

MutationObserver 将响应函数改成异步调用，可以不用在每次 DOM 变化都触发异步调用，而是等多次 DOM 变化后，一次触发异步调用加入到微任务队列当中，并且还会使用一个数据结构来记录这期间所有的 DOM 变化。这样即使频繁地操纵 DOM，也不会对性能造成太大的影响。



## 8  this的指向

this 就是当可执行代码的调用者。

函数内的this的指向是函数被调用  的时候决定的。



this一般有几种调用场景

var obj = {a: 1, b: function(){console.log(this);}}

0.在全局中，不论是否严格模式，this都指向全局对象。

1、作为对象调用时，指向该对象 obj.b(); // 指向obj

2、作为函数调用, var b = obj.b; b(); // 指向全局window，严格模式下为undefined

3、作为构造函数调用 var b = new Fun(); // this指向当前实例对象

4、作为call与apply调用 obj.b.apply(object, []); // this指向当前的object

5.在Dom中事件处理函数中，this指向触发事件的元素 e.currentTarget

6.箭头函数本身没有this,是通过父级上下文获取的this。如果在对象中定义箭头函数，通过对象obj.a，来访问箭头函数时，它的this指向全局上下文。如果时在函构造中定义箭头函数，它的this指向实例的this.

7.在函数A内部再**单独调用函数B**，即使函数A有相应的this,但是函数B内的this还是指向window.就像2.一样。作为一个函数调用。默认指向全局，严格模式下指向window.即嵌套函数不会从调用它的函数中继承 this。

```javascript
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)} //window
    bar()
  }
}
myObj.showThis()


document.querySelector('input').addEventListener('input',function(e){
    console.log(this);
    debouceAjax();      //内部的this还是window
})

```

所以一般都这样解决，或者通过箭头函数来获取父级上下文的this

```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var self = this
    function bar(){
      self.name = " 极客邦 "
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```



在标准函数和箭头函数中有不同的指向。

在标准函数中，this 引用的是把函数当成方法调用的上下文对象







## 9箭头函数

1.在箭头函数中，没有this. 它的this通过外层上下文获取到的。箭头函数的this取决包裹箭头函数的第一个普通函数的this.

2.箭头函数没有自己的 arguments

3.箭头函数不能作构造函数，使用new会出错。

4.箭头函数没有原型。prototype.

5.let a = (a,b)=>{return a+b} 等于 let a = (a,b)=>a+b 没有{ }不用写return

6.箭头函数可以使用apply,call,bind. 但是传入的this会被忽略，只有传入的参数有用。

## 10 函数

1. 普通函数（非箭头函数）都有 prototype（原型）,length(形参个数)
2. 在严格模式下，直接调用函数，函数内的this不会指向windows。二是undeined.

函数也是对象，也可以拥有属性和方法。

```javascript
// add(1)(2)(3)....function add(...args){ 
let allArgs = args  
let fn = function(...args2){ 
    allArgs = [...allArgs,...args2]; 
    return fn;   
}    // js是词法作用域 函数的作用域在函数定义时就决定了 
fn.toString = function(){
    // 通过作用域链攀升获得变量 allArgs        
    return allArgs.reduce((sum,value)=>{return sum+value},0)   
}    
fn.dd = 'dd'    
return fn;
}
let a = add(1)(2)(3)
console.log(a);
```





## 11对象(Object)

### 1.常见api

Object.keys(obj):返回对象的key的数组.对象**自身可枚举**的属性。不会攀升原型。下面两个都不会。

Object.values(obj):返回对象的value的数组

Object.entires(obj):返回二维的数组

Object.assigin(traget,source1,source2):将source1和source2合并到target上

 Object.defineProperty(obj,{value: })：修改属性的默认特性，使用的方法

**Reflect.ownkys():**相当于Object.getOwnPropertyNames(target) concat(Object.getOwnPropertySymbols(target)

Object.getOwnPropertyNames():返回一个由指定对象的所有自身属性的属性名（**包括不可枚举属性但不包括Symbol值作为名称的属性**）组成的数组。

Object.getOwnPropertySymbols()方法返回一个给定对象自身的所有 Symbol 属性的数组。





### 2.遍历对象

for in + obj.hasOwnPrperty()



### 3判断一个对象是否为空

使用 Object 的 getOwnPropertyNames 方法，获取所有属性名，这样就算是不可枚举属性依然能够获取到，算是比较 ok 的方法。

```js
const isEmptyObj = object => {
    if (!!Object.getOwnPropertySymbols(object).length) {
        return false
    }
    if (!!Object.getOwnPropertyNames(object).length) {
        return false
    }
    return true
}
```




## 12window

### 1.sessionStorage,localStorage.

**setItem,getItem**

这两个window下的对象。都是key/value键值对的存储对象。大小为5m,不参与与服务端的通讯。

localStorage会被长久存储只要不手动删除。而sessIonStorage在页面关闭时就会消失。

对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。

一个源对应一个sessionStorage,localStorage.

### 2 cookie

cookie不是在window下，但也一起讲讲。

cookie一般由服务器生成，可以设置过期时间。大小为4k.每次都会http请求都会携带在 header 中，对于请求性能影响。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011451294.png?token=AP3MTU7UG5VM4OZBUPL7I5TBU4N36" alt="image-20211017001919692" style="zoom: 67%;" />





## 13闭包

[阮一峰的闭包说明](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

函数A内有函数B，函数B引用了函数A的变量，就形成了闭包。

闭包指的是一个函数有权访问另外一个函数内的变量。

javascript执行过程中，作用域链是由词法作用域决定的（当前执行上下文的作用域，父级上下文的作用域，都是词法作用域），即由函数声明的位置决定的。所以根据词法作用域的规则，函数总是能够根据外层函数中声明的变量，当调用一个外部函数返回一个内部函数后，即使外部函数已经执行结束，但是内部函数引用着外部函数的变量依旧会保存在内存当中，这就形成了闭包。

闭包的本质就是当前环境中存在指向父级作用域的引用

闭包的作用有两个：1.可以读取函数内部的变量。

​                                  2.将变量始终保存在内存中。

​								  3.当作私有变量使用



使用闭包会使得函数内的变量一直保存在内存当中，可能会导致内存泄漏。所以要谨慎使用。

不再用到的内存，没有被及时释放就叫做内存泄漏。

函数A执行后返回了函数B,函数B内存在对函数A内变量的引用，即使函数A执行结束后，被引用的变量仍然存在于内存当中，这就形成了闭包。



```js
function foo() {
  var myName = ' 极客时间 '
  let test1 = 1
  const test2 = 2
  var innerBar = {
    getName: function () {
      console.log(test1)
      return myName
    },
    setName: function (newName) {
      myName = newName
    },
  }
  return innerBar
}
var bar = foo()
bar.setName(' 极客邦 ')
bar.getName()
console.log(bar.getName())
```

当执行到 bar.setName 方法中的 myName = "极客邦"这句代码时，JavaScript 引擎会沿着“当前执行上下文–>foo 函数闭包–> 全局执行上下文”的顺序来查找 myName 变量

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211211003240422.png" alt="image-20211211003240422" style="zoom:50%;" />

通过“开发者工具”来看看闭包的情况，打开 Chrome 的“开发者工具”，在 bar 函数任意地方打上断点，然后刷新页面，可以看到如下内容：

![image-20211213225403642](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225403642.png)

## 14 隐式转换和显示转换

一般非基础类型，进行转换时都会调用 valueOf,如果valueOf无法返回基础类型则调用toString

js  加或减 比较时 如果是不同类型就会进行隐式转换

+的话有一个操作数位字符串就都转为字符串，

\- 的话有一个操作数为数字则都转为数字

< > == 也都是先转为数字	





## 15事件的传播机制。

从根元素到目标节点，期间流经过的各个DOM节点都会被触发捕获事件。事件到达目标节点后**先执行捕获后执行冒泡**。然后事件向上冒泡，**其他元素冒泡阶段事件** 。

Onclick 和 addEventListener() 默认都是冒泡阶段执行事件，但是addEventListener()第三个参数设置为ture时则是捕获阶段执行事件。



DOM事件对象

event. target

返回触发事件的元素



event. currentTarget

返回绑定事件的元素

在DOM合规的浏览器中，event 对象是传给事件处理程序的唯一参数。不管以哪种方式（DOM0或DOM2）指定事件处理程序，都会传入这个event 对象。

```js
let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
console.log(event.type); // "click"
};
btn.addEventListener("click", (event) => {
console.log(event.type); // "click"
}, false);

```

在事件处理程序内部，this 对象始终等于**currentTarget** 的值，而target 只包含事件的实际

目标。

如果事件处理程序直接添加在了意图的目标，则**this、currentTarget 和target** 的值是一样

的。

```js
let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
console.log(event.currentTarget === this); // true
console.log(event.target === this); // true
};

```

如果这个事件处理程序是添加到按钮的父节点（如document.body）上，那么它们的值就不一样了。

这种情况下点击按钮，this 和currentTarget 都等于document.body，这是因为它是注册事件

处理程序的元素。而target 属性等于按钮本身，这是因为那才是click 事件真正的目标。由于按钮本身并没有注册事件处理程序，因此click 事件冒泡到document.body，从而触发了在它上面注册的处理程序。

```js
document.body.onclick = function(event) {
console.log(event.currentTarget === document.body); // true
console.log(this === document.body); // true
console.log(event.target === document.getElementById("myBtn")); // true
};

```

**preventDefault()**方法用于阻止特定事件(标签)的默认动作。

**stopPropagation()**方法用于立即阻止事件流在DOM结构中传播，取消后续的事件捕获或冒泡。

```js
let link = document.getElementById("myLink");
link.onclick = function(event) {
event.preventDefault();
};


let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
console.log("Clicked");
event.stopPropagation();
};
document.body.onclick = function(event) {
console.log("Body clicked");
};

```





执行事件回调的对象是 相应的元素节点。

```javascript
document.querySelector('input').oninput =  function (e) {
 {
    console.log(this);
}
} 
document.querySelector('input').addEventListener('input',function(e) {
    console.log(this);
})
```

![image-20211025210120858](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011452511.png?token=AP3MTU3HGADJLGUAFPL5RUDBU4N5C)

而当使用箭头函数时，this的执行为父级上下文的this.一般都是window

```javascript
document.querySelector('input').oninput =  (e)=> {
 {
    console.log(this);
}
} 
document.querySelector('input').addEventListener('input',(e)=>{
    console.log(this);
})
```

### 事件代理

在父元素上绑定事件。      



## 16对js的了解





## 17如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？

不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象






## 18获取当前日期

```
function formatDate(dt) {
  if (!dt) {
    dt = new Date();
  }
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  return year + '-' + month + '-' + date;
}

var nowDate = new Date();
var formatDate = formatDate(nowDate);
console.log(formatDate);
```



## 19模块化

[模块好文](https://juejin.cn/post/6844903744518389768#heading-2)

### 1.什么是模块？

模块就算将复杂的代码分块，每个模块的内部变量是私有的。对外只暴露方法。



## 20.不同的模块化规范

#### 1.common.js 

每个文件就是一个模块，都有自己独立的作用域。内部的变量和函数都是私有的，对其他文件不可见。



通过 module.exports .xxx = xx 导出模块 通过 require(xxxx)导入模块

```javascript
// example.js  导出
var x = 1;
var addx = function(value){
  return value+x;  
};
module.exports.name = x;
module.exports.addx = addx
```

```javascript
//导入
var example = require('./example.js');
console.log(example.name);
console.log(example.addx);
```



common.js的加载机制：**CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值**



#### 2.Es6模块化



1.ES6 Module是静态的，也就是说它是在编译阶段运行，和var以及function一样具有提升效果（这个特点使得它支持tree shaking）

2.**自动采用严格模式**（顶层的this返回undefined,不应该在顶层代码中使用this.）（变量必须声明后才能使用）.这个严格模式跟我们直接使用‘use strict'的严格模式不太一样。我们直接使用’use strict'声明的严格模式，顶层的this指向window。

3.ES6 Module支持使用export {<变量>}导出具名的接口，或者export default导出匿名的接口

4.import  导入的如果是值的话,不能修改.如果是对象,则可以修改对象属性.不能修改对象的引用

```javascript
import {a} from './1.js'  //a是一个对象
console.log(a);   //{name:"1"}
a.name ="dd"    //可以修改到
console.log(a);  //{name:"dd"}  再次访问,对象值改变
a = {}           //抛出错误,如果是值这样修改也错误
```

5import 是静态执行，所以后面不能跟表达式和变量，这些只会在运行时得到结果。

```
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

6也可以export default  xxx  ,导入的时候 import  可以随意命名。

```javascript
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };
/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}
```



7.**import()** 允许你在运行时动态地引入 ES6 模块，

ES6 模块在编译时就会静态分析，优先于模块内的其他内容执行，所以导致了我们无法写出像下面这样的代码：

```javascript
if(some condition) {
  import a from './a';
}else {
  import b from './b';
}

// or 
import a from (str + 'b');
```

因为编译时静态分析，导致了我们无法在条件语句或者拼接字符串模块，因为这些都是需要在运行时才能确定的结果在 ES6 模块是不被允许的，所以 动态引入 **import()** 应运而生。

`import()`返回一个 Promise 对象。可以在promise内执行模块内容。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

import()可以实现（1）按需加载。（2）条件加载（3）动态的模块路径

```js
//按需加载。
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
//条件加载
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
//动态的模块路径生成
import(f())
.then(...);
```

[好文](https://zhuanlan.zhihu.com/p/33843378)



#### 3.浏览器加载(ES6)

1.浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。

```html
<script type="module" src="./foo.js"></script>		
```

2.`type="module"`默认异步加载模块。不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

3一旦使用了`async`属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

```html
<script type="module" src="./foo.js" async></script>
```

4ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```js
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```



#### 4CommonJS和ES6module的区别

**① CommonJS 模块输出的是一个值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块输出的是值的引用。**（ES6 Module通过export {<变量>}输出的是一个变量的引用,变量如果改变的话,我查看的到变化,export default输出的是一个值）

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

**② CommonJS 模块是运行时加载，即代码执行到那一行才回去加载模块.ES6 模块是编译时输出接口**。

因为common.js加载的是一个对象（即module.exporys属性），该对象只有在脚本运行完才会生成。

而es6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析节点就会生命。  

**3.CommonJs在第一次加载的时候运行一次并且会生成一个缓存,之后加载返回的都是缓存中的内容**

4.CommonJs的require()是同步加载模块，ES6的import是异步加载模块，有一个独立解析的过程。



## 21可迭代对象

[迭代器好文](https://juejin.cn/post/6844903775329583112#heading-7)

**实现了[Symbol.iterator]接口的数据结构称为可迭代对象。**

一个**数据结构**只要具有[Symbol.iterator]属性，就称为可迭代的。Symbol.iterator属性本身是一个函数，**是迭代器生成函数**。调用后返回迭代器。迭代器内有一个可调用的方法 next(). 调用后返回一个当前成员信息的对象 {value:  xxx, done:boolean}。至于属性名Symbol.iterator本身Symbol对象的一个属性值，预先定义好的。



具备 iterator接口的数据结构：

Array

Map

Set

String

arguments

NodeList对象



#### 1.自定义可迭代对象的数据结构

可以通过对数据结构定义Symbol.iterator来实现迭代器的定义。

```javascript
//实现指针结构

function Obj(value) {
        this.value = value
        this.next = null;
    }

    Obj.prototype[Symbol.iterator] = function () {
        let current = this;
        return {
            next: function () {
                if (current === null) {
                    return { done: true }
                }
                else {
                    let res = { value: current.value, done: false };
                    current = current.next;
                    return res;
                }

            }
        }
    }

    var one = new Obj(1);
    var two = new Obj(2);
    var three = new Obj(3);

    one.next = two;
    two.next = three;

    for (var i of one) {
        console.log(i); // 1, 2, 3
    }
```



#### 2.调用Symbol.iterator接口的场合

1.解构赋值和扩展运算符

```javascript
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];

// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

2.for .. of   内部调用 Symbol.iterator 接口

```javascript
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}
```

3.Array.from()

4.Map(),Set(),WeakMap(),WeakSet()

5.Promise.all()  

6.Promise.race() 

以上这些函数都允许传入 可迭代器对象。



ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

- `entries()` 返回一个遍历器对象，用来遍历`[键名, 键值]`组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用`entries`方法。
- `keys()` 返回一个遍历器对象，用来遍历所有的键名。
- `values()` 返回一个遍历器对象，用来遍历所有的键值。

而**Object.keys()，Object.entries,Object.values()返回的是数组**

```javascript
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用`Array.from`方法将其转为数组。

```javascript
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}
```



## 22 循环

1.for (iterator of arr) ：ES6新增的语法，for..of 循环首先向遍历的对象请求一个迭代器对象，通过调用迭代器对象的next()方法来遍历所有返回值。只能用于可迭代的对象，即实现了迭代接口的对象。obj[Symbol.iterator]

2.for (key in obj ) 遍历对象及其原型链获取可枚举的属性，当对象的属性描述符 enumerable: false 时，该属性不可遍历。一般用该于遍历对象，不用于遍历数组，而且遍历出的顺序是不确定的。要相遍历出只在对象上的属性( 不遍历原型 )可以调用 **Object.prototype.hasOwnProperty.call(obj,key)**,或**Object.keys(obj)**:返回对象所以所有可枚举属性,

**Object.getOwnPropertypeNames(obj)**:返回对象所有属性（可枚举 + 不可枚举）。



### 3.forEach

这是 es5的新增的规范。

以下的数据结构实现了forEach，按升序遍历。



![image-20220105003952588](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105003952588.png)



![image-20220105041615953](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105041615953.png)



`forEach()` 遍历的范围在第一次调用 `callback` 前就会确定。调用 `forEach` 后添加到数组中的项不会被 `callback` 访问到。如果已经存在的值被改变，则传递给 `callback` 的值是 `forEach()` 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)），之后的元素将被跳过

```js
let arr = [1,2,3,4,5]


arr.forEach((item,index,arrT)=>{
    if(index == 1){
        // 已存在的元素被修改，后续遍历到的是修改后的值
        arrT[index+1] = 'change'
        // 新增加的元素后续不会被遍历
        arr.push('nihao')
        // 被删除的元素后续也不会被遍历
        delete arr[4] 
    }
    console.log(item);
})

```

通过查看源码可知，forEach 遍历时没有拷贝副本，直接遍历的是原数组，遍历前已经确定了遍历的范围。

![image-20220105043628704](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105043628704.png)



下面的例子会输出 "one", "two", "four"。当到达包含值 "two" 的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four" 正位于在数组更前的位置，所以 "three" 会被跳过。 `forEach()` 不会在迭代之前创建数组的副本。

```js
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
```





除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。

若你需要提前终止循环，你可以使用：

- 一个简单的 [for](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 循环
- [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) / [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环

这些数组方法则可以对数组元素判断，以便确定是否需要继续遍历：

- [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

只要条件允许，也可以使用 [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 提前过滤出需要遍历的部分，再用 `forEach()` 处理。



如果使用 promise 或 async 函数作为 `forEach()` 等类似方法的 `callback` 参数，最好对造成的执行顺序影响多加考虑，否则容易出现错误。

```js
let ratings = [5, 4, 5];

let sum = 0;

let sumFunction = async function (a, b) {
    return a + b;
}

ratings.forEach(async function(rating) {
    sum = await sumFunction(sum, rating);
})

console.log(sum);
// Expected output: 14
// Actual output: 0
```

Array,Map,Set,NodeList 的forEach 应该都是一样的，不赘述。



### 4.Array.prototype.map

这是数组原型上的方法。

```js
 // 在字符串上使用
 Array.prototype.map.call("Hello World", function(x) {
  return x.charCodeAt(0);
})
```

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

`map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)）组合起来形成一个新数组。 `callback` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。

![image-20220105044441973](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105044441973.png)

`map` 方法处理数组元素的范围是在 `callback` 方法第一次调用之前就已经确定了。调用`map`方法之后追加的数组元素不会被`callback`访问。如果存在的数组元素改变了，那么传给`callback`的值是`map`访问该元素时的值。在`map`函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到。**这和forEach类似。**

```js
// 求数组中每个元素的平方根
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]





// 使用 map 重新格式化数组中的对象
var kvArray = [{key: 1, value: 10},
               {key: 2, value: 20},
               {key: 3, value: 30}];

var reformattedArray = kvArray.map(function(obj) {
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});

// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}],

// kvArray 数组未被修改:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
```

```js
["1", "2", "3"].map(parseInt); //[1, NaN, NaN].
// parseInt(string, radix) -> map(parseInt(value, index))
/*  first iteration (index is 0): */ parseInt("1", 0); // 1
/* second iteration (index is 1): */ parseInt("2", 1); // NaN
/*  third iteration (index is 2): */ parseInt("3", 2); // NaN


// 解决方案：
function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// Actual result is an array of numbers (as expected)

// Same as above, but using the concise arrow function syntax
['1', '2', '3'].map( str => parseInt(str) );

// A simpler way to achieve the above, while avoiding the "gotcha":
['1', '2', '3'].map(Number); // [1, 2, 3]

// But unlike parseInt(), Number() will also return a float or (resolved) exponential notation:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]
// For comparison, if we use parseInt() on the array above:
['1.1', '2.2e2', '3e300'].map( str => parseInt(str) ); // [1, 2, 3]
```

```js
//当返回undefined 或没有返回任何内容时:
var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function(num, index) {
  if(index < 3) {
     return num;
  }
});
// filteredNumbers is [1, 2, 3, undefined]
```



### 5.Array.prototyp.filter

`filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)的元素创建一个新数组。`callback` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 `callback` 测试的元素会被跳过，不会被包含在新数组中。

`filter` 遍历的元素范围在第一次调用 `callback` 之前就已经确定了。在调用 `filter` 之后被添加到数组中的元素不会被 `filter` 遍历到。如果已经存在的元素被改变了，则他们传入 `callback` 的值是 `filter` 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。 这跟 forEach,map 一样。

```js
// 筛选排除所有较小的值
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];


//filter() 根据搜索条件来过滤数组内容。
/**
 * Array filters items based on search criteria (query)
 */
const filterItems = (query) => {
  return fruits.filter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']
```



## 23 ES6新增语法

1.promise

2.module   exports {}  import {} fromxxx

3.扩展运算符

4.箭头函数

5.let const

6.迭代器

7.Object.assign

### 8.Proxy 代理

代理就是捕拦截**对象**的一些操作(查找、赋值、枚举、函数调用等)，并对外界对对象的操作进行过滤和改写等。捕获对象操作的方法叫捕获器。有13种捕获器。几乎涵盖了所有可以修改对象的情况。

proxy的基本使用如下

13种记不住的，记得 get set has delete getPrototype apply constructor 应该差不多了。

![image-20220105142230672](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105142230672.png)

```js
let proxy = new Proxy(target,handler)  //traget 被代理的目标对象  handler 处理程序对象  内部可以设置要拦截目标对象的什么操作


// handler 如果是空对象，相当于不对对象操作进行拦截
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

// 同一个拦截器函数，可以设置拦截多个操作。
// 拦截函数操作
var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  fproxy(1, 2) // 1
  new fproxy(1, 2) // {value: 2}
  fproxy.prototype === Object.prototype // true
  fproxy.foo === "Hello, foo" // true


```



#### 1.get

```javascript
const target = {
foo: 'bar'
};
const handler = {
get() {
return Reflect.get(...arguments);
}
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar


// get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
const proxy = new Proxy({}, {
    get: function(target, key, receiver) {
      return receiver;
    }
  });
proxy.getReceiver === proxy // true
```

#### 2.set

```js
let validator = {
    set: function(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
  
      // 对于满足条件的 age 属性以及其他属性，直接保存
      obj[prop] = value;
      return true;
    }
  };
  
  let person = new Proxy({}, validator);
  
  person.age = 100;
  
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
```

```js
// 只要读写的属性名的第一个字符是下划线，
// 一律抛错，从而达到禁止读写内部属性的目的。
const handler = {
    get (target, key) {
      invariant(key, 'get');
      return target[key];
    },
    set (target, key, value) {
      invariant(key, 'set');
      target[key] = value;
      return true;
    }
  };
  function invariant (key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
  }
  const target = {};
  const proxy = new Proxy(target, handler);
  proxy._prop
  // Error: Invalid attempt to get private "_prop" property
  proxy._prop = 'c'
  // Error: Invalid attempt to set private "_prop" property
```

```js
// set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，
//  一般情况下是proxy实例本身，请看下面的例子。
const handler = {
    set: function(obj, prop, value, receiver) {
      obj[prop] = receiver;
      return true;
    }
  };
  const proxy = new Proxy({}, handler);
  const myObj = {};
  Object.setPrototypeOf(myObj, proxy);
  
  myObj.foo = 'bar';
  myObj.foo === myObj // true
```

#### 3.apply()

`apply`方法拦截函数的调用、`call`和`apply`操作。

`apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

```js
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};
```





#### 4.has()

`has()`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。

`has()`方法可以接受两个参数，分别是目标对象、需查询的属性名。

```js
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

```js
// 虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。
// has()拦截只对in运算符生效，对for...in循环不生效
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99
```

#### 5.constructor()

`construct()`方法用于拦截`new`命令，下面是拦截对象的写法。

`construct()`方法可以接受三个参数。

- `target`：目标对象。
- `args`：构造函数的参数数组。
- `newTarget`：创造实例对象时，`new`命令作用的构造函数（下面例子的`p`）。

```js
const handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
```



```js
// 由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。
const p = new Proxy({}, {
  construct: function(target, argumentsList) {
    return {};
  }
});

new p() // 报错
// Uncaught TypeError: p is not a constructor
```



#### 6.getPrototypeOf()

`getPrototypeOf()`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

```js
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```





#### .proxy对象可以解构成普通对象

```js
const obj = {name:'xiaoming'};
    let proxy = new Proxy(obj,{

    })
    console.log(proxy)
    console.log({...proxy})
```

![image-20211226011416319](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211226011416319.png)

### 9.Reflect

#### 1.前言

在国内的技术文章中你去搜索"JS 反射"得到的大部分的内容都是在说“利用JS的for(…in…)语句实现反射机制”，但其实反射机制在如今的ES6中可以得到更大的延伸以及运用的，这个在后续会讲解。不过这些文章都用一句比较通俗的话来说什么叫**反射机制**:

**反射机制指的是程序在运行时能够获取自身的信息**



#### 2.如何使用

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[proxy handlers (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同`Reflect`并非一个构造函数，所以不能通过[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)对其进行调用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。

#### 设计目的：

1.将  Object 对象一些内部的方法（Object.defineProperty) 放到 Reflect对象上。

2.修改某些Object方法的返回结果，使其变得更合理。比如 Object.defineProperty(obj,key,value)无法定义属性时会抛出一个错误，而Reflect.defineProperty()返回false。我们可以不用进行try catch 去捕获错误

3.让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为

4.Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

![image-20220105201113051](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220105201113051.png)

### 10.Set  和Map

ES6 提供了新的数据结构 Set 和 Map。

Set 可以存储任何类型的唯一值，无论是原始值还是对象引用。

常用API

```javascript
const set1 = new Set() //初始化
const set2 = new Set(["a","b","c","d","d","e"]); //遍历数据元素初始化，set2.size 为 6

set2.add("f");  //因为.add 会返回原set对象，所以可以链式添加
set2.add("g").add("h").add("i").add("j").add("k").add("k");

set2.has("a") // true

set2.size // returns 10

set2.clear(); //清空

set2.delete('a') //删除特定值

set2.keys()  //返回一个迭代器对象，可以用for of 遍历
```

**WeakSet**

与 `Set` 类似，也是不重复的值的集合。但是 `WeakSet` 的成员只能是对象，而不能是其他类型的值。`WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet`对该对象的引用。

```javascript
let map = new Map([[key1,value1],[key2,value2]]) //可以添加二维数组来初始化 map
map.set(key,value)
map.get(key)
map.delete(key)
map.has(key) 
```

弱引用：就是当该对象的引用只剩下这个弱引用时，该对象就会被下次垃圾回收给清理掉。



**Map**

Map和对象类似，也是键值对集合，但是Map可以的使用所有类型（包括对象）的键。



WeakMap

直接受 对象 作为键名，且是弱引用。









## 24.严格模式

严格模式用于选择以更严格的条件检查JavaScript 代码错误，**可以应用到全局，也可以应用到函数内部。**严格模式的好处是可以提早发现错误。

```javascript
//例如在函数内部时这样的
function doSomething() {
"use strict";
// 其他代码
}
```



1.不能意外创建全局变量.

```javascript
"use strict" 
a =2  //这样会抛出错误
this.a = 2  //这样才能定义全局变量
```

2.严格模式下全局中的this,指向window.和非严格模式一样

```javascript
"use strict" 
console.log(this) // window
```

3.**严格模式下函数中的this,指向undefined.**

```javascript
"use strict";
function f1(){
 console.log(this); //undefined
}
```

4.使用函数的apply()或call()方法时，在非严格模式下null 或undefined 值会被强制转型为全局对象。在严格模式下，则始终以指定值作为函数this 的值，无论指定的是什么值。

```javascript
// 访问属性
// 非严格模式：访问全局属性
// 严格模式：抛出错误，因为this 值为null
let color = "red";
function displayColor() {
alert(this.color);
}
displayColor.call(null);
```



## 25.encodeURI 和 encodeURIComponent 的区别

[好文](https://www.zhihu.com/question/21861899)



**二、最常用的encodeURI和encodeURIComponent**

对URL编码是常见的事，所以这两个方法应该是实际中要特别注意的。

它们都是编码URL，唯一区别就是编码的字符范围，其中

encodeURI方法***不会***对下列字符编码  **ASCII字母  数字  ~!@#$&\*()=:/,;?+'**

encodeURIComponent方法***不会***对下列字符编码 **ASCII字母  数字  ~!\*()'**

所以encodeURIComponent比encodeURI编码的范围更大。

实际例子来说，encodeURIComponent会把 http://  编码成  http%3A%2F%2F 而encodeURI却不会。



**三、最重要的，什么场合应该用什么方法**

**1、如果只是编码字符串，不和URL有半毛钱关系，那么用escape。**

**2、如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。**

**如果你需要使用编码后的URL,就使用encodeURI**

比如

```js
encodeURI("http://www.cnblogs.com/season-huang/some other thing");
```

编码后会变为

```js
"http://www.cnblogs.com/season-huang/some%20other%20thing";
```

其中，空格被编码成了%20。但是如果你用了encodeURIComponent，那么结果变为

```js
"http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2Fsome%20other%20thing"
```

看到了区别吗，连 "/" 都被编码了，整个URL已经没法用了。

**3、当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。**

```js
var param = "http://www.cnblogs.com/season-huang/"; //param为参数
param = encodeURIComponent(param);
var url = "http://www.cnblogs.com?next=" + param;
console.log(url) //"http://www.cnblogs.com?next=http%3A%2F%2Fwww.cnblogs.com%2Fseas
```



## 26.DOM

![img](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/-kIwpgj_QBCyWAGSgvb65g)

### 0.什么是 DOM

- 从页面的视角来看，DOM 是生成页面的基础数据结构。
- 从 JavaScript 脚本视角来看，DOM 提供给 JavaScript 脚本操作的接口，通过这套接口，JavaScript 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容。



### 1.property和attributes的区别 

[haowen](https://www.jb51.net/article/50686.htm)

 attributes是dom元素节点上的一个属性，是一个类数组容器，存放了html的中标签的属性。 

```js
<div class="box" id="box" gameid="880">hello</div>

// 该节点的attributes如下
[ class="box", id="box", gameid="880" ]
```

node.setAttribute() ，node.getAttribute() 等待

很多attribute节点还有一个相对应的property属性，比如上面的div元素的**id和class**既是attribute，也有对应的property.

```js
console.log( elem.getAttribute('id') ); // box
console.log( elem.id ); // box
elem.id = 'hello';
console.log( elem.getAttribute('id') ); // hello
```

但是对于自定义的attribute节点，或者自定义property，两者就没有关系了。

```js
console.log( elem.getAttribute('gameid') ); // 880
console.log( elem.gameid ); // undefined
elem.areaid = '900';
console.log( elem.getAttribute('areaid') ) // null
```



 property是dom节点元素对象上的属性。

可以直接通过元素节点 直接访问到 node.style.with  node.style.color 等等。

```
<div id="div1" class="divClass" title="divTitle" title1="divTitle1"></div>
 
var in1=document.getElementById("div1");
console.log(in1)
```

![image-20211208000509708](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112080005126.png)



### 2.常见dom的方法

```js
//获取节点
document.getElementById('id')
document.getElementsByClassName
document.getElementsByTagName
document.querySelector

//获取父，子节点。
node.childNodes
node.parentNode

//插入节点
node.appendChild(node2)
//删除节点
node.removeChild(node2)
```



### 3.dom的性能优化

频繁操作dom会消耗较多性能，所有应该尽量减少操作dom

1.对dom查询进行缓存。

 

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011452199.png?token=AP3MTU3F3JP7BFJOCOQD2VLBU4OAA" alt="image-20211129012840426" style="zoom:50%;" />

2.将频繁操作改为一次性操作，例如要插入多个元素时可以使用doucumentFragement()来实现一次性插入。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011453597.png?token=AP3MTU34HOFCERQWRHJ66JTBU4OAY" alt="image-20211129013148467" style="zoom:67%;" />



## 27. BOM

**brower object model**

常用api  navigator screen location history  

![image-20211229151125231](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211229151125231.png)

`HTML5` 新增的 `history API` 。**具体如下表：**

| API                                       | 定义                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| history.pushState(data, title [, url])    | pushState主要用于**往历史记录堆栈顶部添加一条记录**。各参数解析如下：**①data**会在onpopstate事件触发时作为参数传递过去；**②title**为页面标题，当前所有浏览器都会忽略此参数；③**url**为页面地址，必须与当前页面的URL同源，可选，缺少时表示为当前页地址 |
| history.replaceState(data, title [, url]) | 更改当前的历史记录，参数同上； 上面的pushState是添加，这个更改 |
| history.state                             | 用于存储以上方法的data数据，不同浏览器的读写权限不一样       |
| window.onpopstate                         | 响应pushState或者replaceState的调用                          |

**window.onpopstate**：调用`history.pushState()`或者`history.replaceState()`**不会**触发popstate事件. `popstate`事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用`history.back()、history.forward()、history.go()`方法)，此外，a 标签的锚点也会触发该事件.

**window.onhashchange**：当 一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 **hashchange** 事件。



navigator.userAgent(UA )

screen.width screen.height



## 28.前端性能优化

### 1.让加载更快

1.减少资源体积，压缩代码

2.减少访问次数：合并代码，http缓存。

3.使用更快的网络：CDN

4.服务端渲染：将网页和数据一起加载，一起渲染。



### 2. 让渲染更快

1.css 放在head中，js放在body下面

2.在DOMContentLoaded后执行js

3.懒加载图片等

4.对dom查询进行缓存

5.频繁dom操作合并到一起插入dom结构

6.节流 throttle 防抖 debounce.





## 29. 如何防止表单重复提交？



1.服务器端根据会话生成一个唯一的token保存在session中同时发送给浏览器，浏览器提交表单时携带该token.就算提交了多次表单，服务器也会依据唯一的token值去除掉重复的提交。



## 30.V8引擎

V8是谷歌使用C++开发的开源 javascript 虚拟机引擎，运用于Chrom浏览器和node上。

因为 V8 并不是一个完整的系统，所以**宿主和 V8 共用同一套内存空间**，在执行时，它要依赖于由**宿主提供的基础环境**(类似于寄生关系)，大致包含了我们熟悉的**全局执行上下文、事件循环系统、堆栈空间、宿主环境特殊定制的 API**等。除了需要宿主提供的一些基础环境之外，V8 自身会使用创建好的堆和栈并提供 JavaScript 的核心功能(Object、Function、String)以及垃圾回收(GC)。

### 垃圾回收

**前言**

在JavaScript中，数据类型分为两类，**简单类型和引用类型**，对于简单类型，内存是保存在栈（stack）空间中，复杂数据类型，内存是保存在堆（heap）空间中。

- 基本类型：这些类型在内存中分别占有**固定大小的空间**，他们的值保存在栈空间，我们通过按**值**来访问的
- 引用类型：引用类型，值大小不固定，栈内存中存放**地址**指向堆 内存中的对象。是按引用访问的。

而对于栈的内存空间，只保存简单数据类型的内存，由操作系统自动分配和自动释放。而堆空间中的内存，由于大小不固定，系统无法无法进行自动释放，这个时候就需要JS引擎来手动的释放这些内存。

**Chrome 垃圾回收算法：采用标记清除算法**

**v8引擎将堆主要分为两个区域 新生代和老生代**。新生代中存放着生存时间短的对象，老生的中存放着生存时间旧的对象。

新生代通常只支持1-8M的容量，而老生代支持的容量就大很多了。

对新老生代的垃圾回收，v8采用了两个垃圾回收器管控。新生代的垃圾回收使用副垃圾回收器，老生代的垃圾回收使用主垃圾回收器。



**新生代的scavange算法**（丝给vnG）

该算法将新生代区域分为两部分，一个是属于使用状态的区域，我们称之为**使用区**，另一个是属于空闲状态的区域，我们称之为**空闲区**.  **当开始垃圾回收时**（使用区快满时），副垃圾回收器会将新生代区域中的对象分别标记，标记出活动对象和非活动对象。从活动区域复制活动对象到空闲区并排序，随后进入垃圾清理阶段，释放使用区数据对象所占的内存，将使用区和 空闲区角色互换。

当一个对象经过两次垃圾回收都还存在就会被晋升到老生代区域。还有当使用区复制对象到空闲区时，如果空闲区的占用超过25%时，也会直接将使用区的对象晋升到老生代。因为空闲区后续要转为使用区，继续进行对象的分配。必须预留一定的空间。

<!--在javaScript中，任何刚被分配内存的对象都会放置到新生代nursery区域。 如何下一次垃圾回收该对象还在的话就会被移动到 intermediate 区域，再经过一次垃圾回收 该对象还在新生代中，副垃圾回收器就会将该对象移动到老生代中，这个移动的过程就被称为晋升。-->



**老生代垃圾回收** **Mark-Sweep Mark-Compat**

老生代的主垃圾回收器会先标记老生代中的对象，然后直接清除非活动对象，释放内存。但是这样会导致内存碎片化问题。

然后为了解决清除非活动对象后造成的内存碎片化，主垃圾回收器会将活动对象往堆内存的一端进行移动解决碎片化问题。



老生代和新生代的标记方法：从一组根元素（例如window）开始，递归遍历这组根元素，遍历过程中能到达的元素称为活动对象，没有到达的元素就可以判断为非活动对象。

> 以下几种情况都可以作为根节点：
>
> 1. 全局对象
> 2. 本地函数的局部变量和参数
> 3. 当前嵌套调用链上的其他函数的变量和参数



并行回收：新生代对象空间就采用并行策略，在执行垃圾回收的过程中，会启动了多个线程来负责新生代中的垃圾清理操作，这些线程同时将对象空间中的数据移动到空闲区域，这个过程中由于数据地址会发生改变，所以还需要同步更新引用这些对象的指针，此即并行回收.

![image-20211213225509919](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225509919.png)





增量标记与懒性清理

<!--并行策略虽然可以增加垃圾回收的效率，对于新生代垃圾回收器能够有很好的优化，但是其实它还是一种全停顿式的垃圾回收方式，对于老生代来说，它的内部存放的都是一些比较大的对象，对于这些大的对象 `GC` 时哪怕我们使用并行策略依然可能会消耗大量时间-->

<!--所以为了减少全停顿的时间，在 2011 年，V8 对老生代的标记进行了优化，从全停顿标记切换到增量标记-->

GC ：垃圾回收

增量就是将一次 `GC` 标记的过程，分成了很多小步，每执行完一小步就让应用逻辑执行一会儿，这样交替多次后完成一轮 `GC` 标记.

![](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211213225520943.png)

**三色标记法和写屏障**：由于增量标记的使用V8增加了三色标记和写屏障。

三色标记：对象可以被标记为三种颜色 白 灰 黑，最开始所有对象都被标记为 白色，代表回收器还未标记它们。然后从根数组开始递归遍历，首先将根数组的对象都标记为灰色并推入标记工作表，当标记工作表弹出对象并访问它的引用对象时，将其自身由灰色转为黑色，并将自身的下一个引用对象标记为灰色。就这样一直走下去，直到没有对象可以变成灰色，就是没有可达对象。剩下的白色对象就可以被回收。采用三色标记法可以使得增量标记时，当在回复执行标记过程时可以很容易找到上次增量标记中断的对象的位置，就是灰色的对象。

写屏障：当由增量标记切换到程序执行时，如果程序修改了对象的引用，将原本没有被引用的白色对象变成被引用对象，此时V8就会通过写屏障机制将引用的白色对象改为灰色对象，确保下次增量回收能够正确标记。

**懒性清理**：增量标记后，v8对非活动对象的清理采用懒性清理。即当增量标记完成后，如何内存剩余空间足够大能让程序顺利运行，就将清理过程稍微延迟一下，让代码先执行。垃圾清理时也不用一次性清理所有非活动对象，可以按需逐一进行清理直到所有活动对象内存清理完毕。



并发回收：老生代垃圾回收中，主要采用并发标记，主线程在开始执行js时，辅助线程同时也执行标记操作，标记完成后，再执行并行操作。（即主线程在执行清理操作时，多个辅助线程也同时执行清理操作。）



### 如何避免内存泄漏

1.尽量少的使用全局变量。（在全局中 var 和不用 var let const 声明变量和在函数中不使用 var let const声明变量 会被挂载到 window上）当 必须使用全局变量时，应该在不使用后将其置为null.

2.手动清除定时器。

3.少用闭包。

4.清除DOM引用

```js
const elements = {
    button: document.getElementById('button')
};
// button 不用时可以置为 NULL
```

5.弱引用。 weakMap 和 WeakSet. 其键值的对象引用是弱引用，垃圾回收时不会将该键值的对象引用考虑进去。



### 编译器和解析器：V8 如何执行一段 JavaScript 代码的

- 计算机语言可以分为两种：编译型和解释型语言。编译型语言经过编译器编译后保留机器能读懂的二进制文件，比如 C/C++，go 语言。解释型语言是在程序运行时通过解释器对程序进行动态解释和执行，比如 Python，JavaScript 语言。
- 编译型语言的编译过程：编译器首先将代码进行词法分析、语法分析，生成抽象语法树（AST），然后优化代码，最后生成处理器能够理解的机器码；
- 解释型语言解释过程：解释器会对代码进行词法分析、语法分析，并生产抽象语法树（AST），不过它会再基于抽象语法树生成字节码，最后根据字节码执行程序；
- AST 的生成：第一阶段是分词（词法分析），将一行行源码拆解成一个个 token（语法上不可再分、最小单个字符）。第二阶段是解析（语法分析），将上一步生成的 token 数据，根据语法规则转为 AST，这一阶段会检查语法错误；
- 字节码存在的意义：直接将 AST 转化为机器码，执行效率是非常高，但是消耗大量内存，从而先转化为字节码解决内存问题；
- 解释器 ignition 在解释执行字节码，同时会手机代码信息，发现某一部分代码是热点代码（HotSpot），编译器把热点的字节码转化为机器码，并保存起来，下次使用；
- 字节码配合解释器和编译器的计数实现称为即时编译（JIT）。