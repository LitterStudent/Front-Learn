## 1.联友 10/19

·1.问项目  音乐网站发送的请求是否有token,没有  ad后台的量点 通过vuex管理用户登录状态 动态生成路由表 通过路由表生成侧边栏

侧边栏通过递归可以无限嵌套  。有没有实现单点登录。没有。单点登录的思路：通过tokenl来辨识唯一用户，用户发送请求是要携带token.后端验证，后端验证token无效就返回错误。前端vuex在将token删除。全局前置路由发现没有token就会将用户登录状态清除。返回登录页面。

2.forEach 可以实现 .map .filter 的功能，为什么还要有.map和.filter这些api

.map 是用来映射数组，将数组的数据做相应的修改。 .filter用于过滤数据



3.ajax内部如何请求



4.闭包占有的内存如何清除 。将指针指向null



5如何防止用户重复提交表单。防抖。或者清除内容。

服务器返回表单页面时，会先生成一个subToken保存于session，并把该subToen传给表单页面。当表单提交时会带上subToken，服务器拦截器Interceptor会拦截该请求，拦截器判断session保存的subToken和表单提交subToken是否一致。若不一致或session的subToken为空或表单未携带subToken则不通过。

首次提交表单时session的subToken与表单携带的subToken一致走正常流程，然后拦截器内会删除session保存的subToken。当再次提交表单时由于session的subToken为空则不通过。从而实现了防止表单重复提交。



6.let const  



7 vue的生命周期



8反转字符串



## 2.字节 11/1

1.输入一个url到页面呈现有哪些

2.tcp/ip 网络结构

3.4次挥手是否可以三次挥手实现？

4.http缓存

5.403 是什么 前端发起跨域请求，服务端拒绝，返回403

6同源策略

7如何实现跨域

8.dom树和cssom树是并行渲染还是串行

9.css 左中右布局, 1. flex  2.浮动

10.移动端的适配，rem

11.call,apply,bind

12.position的属性，relative不脱离标准流。

13

```js
   var name = 'windom';
var obj = {
    name:'obj',
    say(){
        console.log(this.name)
    },
    say1:()=>{
        console.log(this.name);
    }
}
obj.say();
obj.say1();
var fn = obj.say;
fn();
var fn1 = obj.say1;
fn1()
```

1



## 3去哪儿 10/21

1.渲染树和dom树的区别

2.vue的生命周期，什么时候会用到这些生命周期函数。

3.v-if和v-show的区别.什么时候用

4.手写promsie.all

5.http2.0的多路复用

6.vue 的响应式原理

7.https的加密过程

8 V8的垃圾回收。









## 4深信服 10/18 挂

1.项目

2.http状态码

3http缓存

4.进程和线程的区别

进程描述了 CPU 在**运行指令及加载和保存上下文所需的时间**，放在应用上来说就代表了一个程序。线程是进程中的更小单位，描述了执行一段指令所需的时间。

5.时间循环

6.http1.0和http1.1和https的区别

7promise的链式调用如何停止

8ES6语法





## 5 10/29 转转  1面 

1.v-for  key的作用

2.如何将 if else 转为 prosmie

3.vue中  .nextTick()

4.写一个vue组件，button组件等。

5.http缓存

6http2

7判断完全平方数

8判断一个对象的最长键值 {a:{b:{c:{d:1}}}}

9.css实现一个动画





## 6字节2面 11/4