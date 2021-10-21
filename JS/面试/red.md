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



## 2.字节 10/20



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