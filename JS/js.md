## 1promise

[好文](https://juejin.cn/post/6844903775329583112#heading-19)

js解决异步任务的一种方案。将执行异步请求的代码和处理结果的代码清晰的分离了。可以将要异步请求的执行代码放在 new promise((resolve,rejected)=>{ })构造函数内，将处理异步请求结果的代码放在promise.then内。

将异步回调的控制权转移到了promise的手中而不是像封装完ajax第三方库的手中。

promise可以处理将以往的异步执行的回调地狱转换成了可以通过.then来链式执行的代码。可维护性以及可阅读性都得到了增强。



.then() 内的执行函数如果最后返回的不是promsie,就会被Promise.resolve。 

.then 和 .catch 希望传入的是函数，传入其他的会发生透传。

.finally()内的执行函数不会接受任何参数。它用于在最后执行特定操作。

执行完后返回的promise还是上次传入的promise,即使返回promsie也不会替换上次传入的promise.



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



## 2 async 和 await

async 和 await 能进一步改善promise的链式调用，用**同步的方式，执行异步操作**。

一个函数如果加上async ,那么该函数就会返回一个promise.async函数会将返回值使用Promise.resolve()包装成promise.

await 等待一个promise。await后面的语句就像.then里的语句一样，得等await 等待的Promise状态确定后才会继续执行下去。

如果async函数中某处返回了reject的promise,则后面的代码不会执行。

如果想是错误的地方能被捕获不影响后续代码的执行可以使用 try 和catch捕获错误，或者在await的promise的后面增加一个.catch.







## 3 var let const 

使用 var声明的变量会提升到作用域的首部。被提升的是变量声明部分。

而使用let和const声明的变量则不会被提升。所以let 和const 声明的变量不能提前使用，有暂时性死区的说法。

var在全局作用域中声明的变量会被挂载到全局对象window上，而let和const不会。

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



ES6的继承是通过 Class  Extends 语法糖实现的，本质上还是原型链实现的继承。（大概吧）

class 中的 constructor（类构造函数） 就是ES5中的构造函数。虽然使用  instanceof 去判断时为false .但是在使用 类创建实例时可以直接将constructor（类构造函数）当做构造函数。可以通过在constructor 内声明 类实例的属性。

在class 内 声明的普通方法 ，都会添加到 该类的原型上。

使用static作为前缀的声明的方法会被当做静态方法。

ES6通过 extends字段 声明继承父类 和在类构造函数 constructor中使用 super调用父类的构造函数，完成对this的塑型从而实现继承。内部实现原理还是 es5的寄生组合继承。





## 6 new 构造函数 的过程

生成一个空对象，空对象的隐式指针指向构造函数的原型。执行构造函数并且将构造函数的this指向 新生成的空对象。执行完构造函数，函数内的属性添加到了空对象上。最后 如果构造函数的执行结果没有返回一个对象，那就直接返回之前生成的对象。否则就返回构造函数返回的对象。







## 7事件循环

事件循环 Event Loop是浏览器为解决单线程执行js代码而不引起阻塞的机制。

 先执行script脚本，执行过程中遇到微任务加入微任务队列，遇到宏任务加入宏任务队列。当script脚本执行完也就是js执行栈为空的时候，就会去清空微任务队列。当微任务队列执行，再取出宏任务队列的第一个任务执行。直至两个队列的所有任务都执行完。

宏任务：<script> setTimeout setInerval  requestAnimationFrame ：希望在下一次浏览器重绘之前执行动画 setImmediate(node)

微任务： promise.then all  race 

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211016193053562.png" alt="image-20211016193053562" style="zoom:50%;" />



## 8  this的指向

this 就是当可执行代码的调用者。

this的指向是函数被调用的时候决定的。



this一般有几种调用场景

var obj = {a: 1, b: function(){console.log(this);}}

\0. 在全局中，不论是否严格模式，this都指向全局对象。

1、作为对象调用时，指向该对象 obj.b(); // 指向obj

2、作为函数调用, var b = obj.b; b(); // 指向全局window，严格模式下为undefined

3、作为构造函数调用 var b = new Fun(); // this指向当前实例对象

4、作为call与apply调用 obj.b.apply(object, []); // this指向当前的object

\5. 在Dom中事件处理函数中，this指向触发事件的元素 e.currentTarget

6.箭头函数本身没有this,是通过父级上下文获取的this。如果在对象中定义箭头函数，通过对象obj.a，来访问箭头函数时，它的this指向全局上下文。如果时在函构造中定义箭头函数，它的this指向实例的this.

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



### 1.执行上下文和作用域

作用域是指上下文中定义变量（变量命和函数名）的区域。作用域规定了上下文如何查找变量。

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

Object.keys(obj):返回对象的key的数组.对象自身可枚举的属性。

Object.values(obj):返回对象的value的数组

Object.entires(obj):返回二维的数组

Object.assigin(traget,source1,source2):将source1和source2合并到target上

 Object.defineProperty(obj,{value: })：修改属性的默认特性，使用的方法



### 2.原型

 原型就一个为其他对象提供共享属性访问的对象。在创建对象时每个对象都有一个隐式属性指向它的原型或者null.

原型也是对象，所以原型也有自己的原型。这样就构成了原型链。



### 3原型链

对象实例在访问属性时就是在攀升原型链。当前对象是原型链的第一个元素，当属性在这个对象找不到时，就回去访问它的原型，一直攀升原型链直至找到。



### 4.遍历对象

for in + obj.hasOwnPrperty()



## 12window

### 1.sessionStorage,localStorage.

这两个window下的对象。都是key/value键值对的存储对象。大小为5m,不参与与服务端的通讯。

localStorage会被长久存储只要不手动删除。而sessIonStorage在页面关闭时就会消失。

对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。

一个源对应一个sessionStorage,localStorage.

#### 2 cookie

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

2.自动采用严格模式（顶层的this返回undefined）

3.ES6 Module支持使用export {<变量>}导出具名的接口，或者export default导出匿名的接口



export命令导出模块，import命令导入模块。

也可以export default  xxx  ,导入的时候 import  可以随意命名。

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

**① CommonJS 模块输出的是一个值的拷贝，ES6 Module通过export {<变量>}输出的是一个变量的引用,export default输出的是一个值**

**② CommonJS 模块是运行时加载，即代码执行到那一行才回去加载模块.ES6 模块是编译时输出接口**。

**3CommonJs在第一次加载的时候运行一次并且会生成一个缓存,之后加载返回的都是缓存中的内容**



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

**import()** 允许你在运行时动态地引入 ES6 模块，

[好文](https://zhuanlan.zhihu.com/p/33843378)

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211017170426471.png" alt="image-20211017170426471" style="zoom:67%;" />

## 21迭代器

[迭代器好文](https://juejin.cn/post/6844903775329583112#heading-7)

下次再写





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