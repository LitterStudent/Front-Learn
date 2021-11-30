##  0.1基础

js是动态类型的语言

### 1.值类型和引用类型

值类型存储在栈中，引用类型存储在堆中。这样设计是因为引用类型所占空间大，存储在堆中能提高性能。

常见的值类型： Number,String,Boolean,Undefined,Null,Symbol,BigInt

#### 1.undefined和null的区别？

undefined表示未初始化，变量通过 var声明后不赋值默认就未undefined。null是空对象指针，当要初始化对象时可以使用null赋值。

#### 2.类型的判断

typeof可以判断出所有的值类型。Number,Undefined,String,Symbol,BigInt,Boolean.除了Null. 能判断出函数。

instanceof 可以判断出引用类型。 [] instanceOf Array



#### 3.类型转换

1.  1+字符串    会转换成字符串
2.  ==   
3. if()



### 



## 0回调

### 1.什么是回调？

回调是js中实现异步逻辑的一种方式。可以为某些异步操作添加后续任务。例如事件监听，ajax事件，定时器。



### 2.回调的缺点

1.多层的回调会使得代码嵌套再一起，从而使得阅读理解起来很困难，俗称回调地狱。

2.在某些第三方库使用的回调会使得我们编写一部分程序的控制权转移给了第三方。导致信任问题。回调在第三方的调用过程中可能会出现错误。



## 1promise

[好文](https://juejin.cn/post/6844903775329583112#heading-19)

### 1.名词解释？

进程：进程是cpu分配资源的最小单位。一个运行的程序对应一个进程，一个进程包括运行中的程序和程序使用到的内存和系统资源。

[线程和进程](https://www.cnblogs.com/qianqiannian/p/7010909.html)

线程：线程是程序执行流的最小单元，是程序执行过程中一个单一的顺序控制流程，是处理器调度和派发的基本单位。 线程是进程下的执行者（程序运行单位），一个进程至少开启一个线程，也可以开启多个线程。同一个进程下的线程共享进程的内存空间和系统资源。

浏览器是多进程的：每当我们打开一个tab页，就是新建了一个独立的浏览器进程。

浏览器包括的进程有：

1.Browser进程：浏览器的主进程，只有一个。作用是管理各个tab页进程的创建和销毁；网络资源管理，下载；负责浏览器页面显示；

2.第三方插件进程

3.GPU进程：最多一个，负责3D绘制

4，浏览器渲染进程（即Render进程，内部是多线程的）：每个tab页一个，互不影响。主要的作用为：渲染页面；执行脚本；事件处理；

分为：1.GUI渲染线程：

​					1.解析html,css，构建dom树和cssom树和渲染树，布局，绘制等。

 		    	   2.当界面需要重绘或者回流时，该线程就会执行。

​					3.与js引擎线程互斥

​          2.js引擎线程：解析javaScript脚本并执行

​		  3.事件触发线程：处理DOM事件

​		  4.定时器触发线程：处理定时事件

​         5异步http请求事件：处理http请求。

​		





同步：**程序发出调用时，一直等待直到返回结果。没有结果之前不会结束等待**。同步时调用者主动等待调用过程，且能立即得到结果的。**也就是必须一件一件事做等前一件做完了才能做下一件事**

异步：**程序发出调用时，不会等待结果返回，无法立即得到结果**。**需要额外的操作才能得到预期的结果。**





并行：指程序的运行状态。在同一事件内有多件事情并行处理。由于在同一时间内一个线程只能处理一件事件，所以并行需要**多个线程在一起同时执行多件事情**。

并发：指程序的设计结构。**多件事情被交替处理**，同一时刻只有一件事情在处理。单核结构的cpu实现多任务就是并发。



阻塞：阻塞指调用者（程序）在等待的返回结果的过程中线程被挂起。并在得到结果是返回。

非阻塞：非阻塞指调用者在等待返回的过程中线程没有被挂起，可以做其他事情。



单线程：从头到尾一行一行执行，如果有一行代码出错，后续的代码则不执行。同时代码容易阻塞。

多线程：各线程代码运行的环境不同，相互独立，避免阻塞。



#### 1.浏览器线程

- **渲染引擎线程**：负责页面的渲染
- **Javascript引擎线程**：负责JS代码的解析和执行
- **定时触发器线程**: 处理定时事件，比如`setTimeout`,`setInterval`
- **游览器事件触发线程**：处理DOM事件
- **异步HTTP请求线程**：处理HTTP请求。

渲染线程和 JavaScript 引擎线程是 **互斥** 的。渲染线程在执行任务的时候，JavaScript 引擎线程会被挂起。因为 JavaScript 可以操作 DOM，若在渲染中 JavaScript 处理了 DOM，浏览器可能会不知所措了。





### 2.js要有异步？

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

resolve()内传入的可以是普通的数据类型也可以是promise。当传入的是promise时，则new Promise返回的promise则为传入的promsie.

```javascript
const p1 = new Promise(function (resolve, reject) {
        resolve("dd")
        setTimeout(() => reject(new Error('fail')), 3000)
    })

    const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000)
    })

    p2
      .then(result => console.log(result))
      .catch(error => console.log(error))
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
    let prototype = object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}

```



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

事件循环的机制是由宿主环境来决定的，在浏览器运行环境中是由浏览器内核引擎决定的。在NodeJS中是由libuv引擎实现的。

**当js引擎执行栈为空时会先，执行微任务，再尝试dom渲染。然后才执行宏任务。**

**1.先把Call Stack清空**
**2.然后执行当前的微任务**
**3.接下来DOM渲染**
**微任务在dom渲染`之前`执行，宏任务在dom渲染`之后`执行**。

为什么微任务比宏任务先执行？

微任务时ES6语法规定的，宏任务时由浏览器规定的。

（单线程）**js引擎在执行代码时**，通过将不同的执行上下文压入执行栈中来保证代码的有序执行。在执行代码的时候，如果遇到了异步任务，js 引擎并不会一直等待其返回结果，而是会将这个异步任务交给特定线程处理，继续执行执行栈中的其他任务。当异步任务执行完毕后，**再将异步任务对应的回调加入到**（与当前执行栈中不同的另一个）**任务队列中等待执行**。任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211026152035189.png" alt="image-20211026152035189" style="zoom:50%;" />

 先执行script脚本，执行过程中遇到微任务加入微任务队列，遇到宏任务加入宏任务队列。当script脚本执行完也就是js执行栈为空的时候，就会去清空微任务队列。当微任务队列执行，再取出宏任务队列的第一个任务执行。直至两个队列的所有任务都执行完。

宏任务：<script> setTimeout setInerval  requestAnimationFrame：希望在下一次浏览器重绘之前执行动。,Ajax,dom事件 

setImmediate(node)

`requestAnimationFrame`姑且也算是宏任务吧，`requestAnimationFrame`在[MDN的定义](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame)为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行。

告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒60次。

微任务： promise.then catch finally ，async  await ; **MutationObserver**

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211016193053562.png" alt="image-20211016193053562" style="zoom:50%;" />



## 8  this的指向

this 就是当可执行代码的调用者。

this的指向是函数被调用  的时候决定的。



this一般有几种调用场景

var obj = {a: 1, b: function(){console.log(this);}}

\0. 在全局中，不论是否严格模式，this都指向全局对象。

1、作为对象调用时，指向该对象 obj.b(); // 指向obj

2、作为函数调用, var b = obj.b; b(); // 指向全局window，严格模式下为undefined

3、作为构造函数调用 var b = new Fun(); // this指向当前实例对象

4、作为call与apply调用 obj.b.apply(object, []); // this指向当前的object

\5. 在Dom中事件处理函数中，this指向触发事件的元素 e.currentTarget

6.箭头函数本身没有this,是通过父级上下文获取的this。如果在对象中定义箭头函数，通过对象obj.a，来访问箭头函数时，它的this指向全局上下文。如果时在函构造中定义箭头函数，它的this指向实例的this.

7.在函数A内部再**单独调用函数B**，即使函数A有相应的this,但是函数B内的this还是指向window.就像2.一样。作为一个函数调用。默认指向全局，严格模式下指向window

```javascript
function name(params) {
    console.log(this);
     let b = function(params){
        console.log(this);      //window
    }
    b()
}
new name()

document.querySelector('input').addEventListener('input',function(e){
    console.log(this);
    debouceAjax();      //内部的this还是window
})

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
// add(1)(2)(3)....function add(...args){    let allArgs = args    let fn = function(...args2){        allArgs = [...allArgs,...args2];        return fn;    }    // js是词法作用域 函数的作用域在函数定义时就决定了    fn.toString = function(){        // 通过作用域链攀升获得变量 allArgs        return allArgs.reduce((sum,value)=>{return sum+value},0)    }    fn.dd = 'dd'    return fn;}let a = add(1)(2)(3)console.log(a);
```



### 1.执行上下文和作用域

作用域是指上下文中定义变量（变量命和函数名）的合法使用范围。作用域规定了上下文如何查找变量。

javaScript是词法作用域，即静态作用域。函数的作用域在函数定义时就决定了。



#### 1执行上下文

当**执行一个函数**的时候，就会创建一个**执行上下文**，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

对于每个执行上下文，都有三个重要属性：    

- 变量对象(Variable object，VO)

**变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明**。因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文下的变量对象和函数上下文下的变量对象

- 作用域链(Scope chain)

一条变量对象的链条。包含了当前的变量对象以及父级上下文的变量对象，直到全局对象。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链

- this

  当前执行上下文的调用者。



var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”.



2.**函数声明和函数表达式**

函数声明会提升，且比变量提升优先级高。

```
//函数声明语句写法function test(){}; test();  
//函数表达式写法var test = function(){}; test();
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



### 2.原型

 原型就一个为其他对象提供共享属性访问的对象。在创建对象时每个对象都有一个隐式属性指向它的原型或者null.

原型也是对象，所以原型也有自己的原型。这样就构成了原型链。



### 3原型链

对象实例在访问属性时就是在攀升原型链。当前对象是原型链的第一个元素，当属性在这个对象找不到时，就回去访问它的原型，一直攀升原型链直至找到。



### 4.遍历对象

for in + obj.hasOwnPrperty()



### 5判断一个对象是否为空

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

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211017001919692.png" alt="image-20211017001919692" style="zoom: 67%;" />





## 13闭包

[阮一峰的闭包说明](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

函数A内有函数B，函数B引用了函数A的变量，就形成了闭包。

闭包指的是一个函数有权访问另外一个函数内的变量。

闭包的本质就是当前环境中存在指向父级作用域的引用

闭包的作用有两个：1.可以读取函数内部的变量。

​                                  2.将变量始终保存在内存中。

​								  3.当作私有变量使用



使用闭包会使得函数内的变量一直保存在内存当中，可能会导致内存泄漏。所以要谨慎使用。

不再用到的内存，没有被及时释放就叫做内存泄漏。





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

![image-20211025210120858](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211025210120858.png)

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



js是一门基于原型的动态语言，主要独特的特性有this,原型和原型链

JS严格意义上分为：语言标准（ESMAScript）+宿主环境

宿主环境有浏览器的DOM+BOM 和Node.



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

**① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。**（ES6 Module通过export {<变量>}输出的是一个变量的引用,变量如果改变的话,我查看的到变化,export default输出的是一个值）

**② CommonJS 模块是运行时加载，即代码执行到那一行才回去加载模块.ES6 模块是编译时输出接口**。

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

1.for (iterator of arr) 只能用于可迭代的对象，即实现了迭代接口的对象。放回value

2.for (key in obj ) 遍历对象原型链获取键名



## 23 ES6新增语法

1.promise

2.module   exports {}  import {} fromxxx

3.扩展运算符

4.箭头函数

5.let const

6.迭代器

7.Object.assign





## 24 Set  和Map

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

Map和对象类似，也是键值对集合，但是Map可以的所有类型（包括对象）的键。



WeakMap

直接受 对象 作为键名，且是弱引用。



## 25 Proxy 代理

代理就是捕获**对象**的一些操作，再加上自定的行为。捕获对象操作的方法叫捕获器。有13种捕获器。几乎涵盖了所有可以修改对象的情况。

```javascript
let proxy = new Proxy(target,handler)  //traget 被代理的目标对象  handler 处理程序对象  内部可以设置要拦截目标对象的什么操作

```

1.get()

2.set()

3.has()

4.defineProperty()

5.getPrototypeOf()

6.setPrototypeOf()

7.apply()

8.constructor()







捕获器拦截到操作后进行一些列自己的操作，然后如果需要重调原始操作的话，可以通过反射Reflect。

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
```



## 26严格模式

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



## 27encodeURI 和 encodeURIComponent 的区别

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



## 28DOM

### 1.property和attribute的区别 

 property是dom节点的属性。

node.style.with  node.style.color 等待

 attribute是html的中标签的属性。 

node.setAttribute() ，node.getAttribute() 等待



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

 

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211129012840426.png" alt="image-20211129012840426" style="zoom:50%;" />

2.将频繁操作改为一次性操作，例如要插入多个元素时可以使用doucumentFragement()来实现一次性插入。

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211129013148467.png" alt="image-20211129013148467" style="zoom:67%;" />



## 29 BOM

**brower object model**

常用api  navigator screen location history 



navigator.userAgent(UA )

screen.width screen.height



## 30前端性能优化

### 1.让加载更快

1.减少资源体积，压缩代码

2.减少访问次数：合并代码，http缓存。

3.使用更快的网络：CDN

4.服务端渲染：将网页和数据一起加载，一起渲染。



### 2. 让渲染更快

1.css 放在head中，js放在body下面

2.在DOMContentLoaded后执行js。

3.懒加载图片等

4.对dom查询进行缓存

5.频繁dom操作合并到一起插入dom结构

6.节流 throttle 防抖 debounce
