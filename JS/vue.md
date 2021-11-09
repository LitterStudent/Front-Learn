## 	1vue的理解

渐进式` JavaScript` 框架、核心库加插件、动态创建用户界面



## 1.5vue基础

### 1.组件的全局注册

```javascript
// 第一个参数组件名，就是我们在html了 使用的标签名

Vue.component('my-component-name',{
    template:'',
    data:function(){
        return {
            .......
        }
    },
    props:[],
    computed:{
        
    },
    methods:{
        
    },
    watch:{
        
    }
    
})

//全局注册后的组件，能够后面的new Vue() 创建的根实例种使用。
new Vue（{
 el:'',
 template:'',
 data:[],
 methods:{},
     ....
}）
```

### 2.局部注册

```javascript
//1.使用一个普通的对象来定义 一个组件
var component = {
    ...
}
//2.然后在new Vue() 的过程中加入进去，新生成的vue实例就可以在模板中使用设个组件
new Vue({
    el:'#app',
    components:{
    'conponent-name1':component
}
})

//使用ES6模块 看起来就是

import 'ComponentA' from './ComponentA.vue'

export default {
    components:{
        ComponentA
    }
}
    
```



## 2 MVVM

Model  View  ViewModel

`Model-View-ViewModel` ，` Model` 表示数据模型层。` view` 表示视图层，` ViewModel` 是` View` 和` Model` 层的桥梁。视图变化触发模型修改，用到的时事件监听。模型变化触发视图变化，用到的是数据绑定。

（1）View 层

```
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
```

（2）ViewModel 层

```
var app = new Vue({
    el: '#app',
    data: {  // 用于描述视图状态   
        message: 'Hello Vue!', 
    },
    methods: {  // 用于描述视图行为  
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;
        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                vm.message = res;
            }
        });
    }
})
```

（3） Model 层

```
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
```



## 3响应式原理（数据双向绑定）

[好文](https://juejin.cn/post/6844903903822086151#heading-1)

数据劫持+观察者模式

`第一种说法： Object.defineProperty` 重新定义` data` 中所有的属性，` Object.defineProperty` 可以使数据的获取与设置增加一个拦截的功能，**拦截属性的获取，进行依赖收集。拦截属性的更新操作，进行通知。**

第二种说法：对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。



第三种说法：每当new一个vue实例时，内部通过initData初始化数据，然后调用Observer对数据进行观察。如果数据是对象类型，就会通过遍历对象属性分别调用defineReactive方法。在defineReactive先生成一个dep订阅器实例，然后调用Object.defineProperty()来拦截数据,添加set和get分别对获取数据设置数据进行拦截。在获取数据时，初始化相应的订阅者实例watcher添加到dep订阅器实例中，当设置数据时，依赖收集器通知相应的订阅者对象实例watcher去进行相应的更新操作等（重新渲染dom等）。

Observer（观察者）：Observer观查传入的data对象。遍历data对象并通过defineProperty(obj,key,{get，set})去拦截每个数据的获取与设置。





<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211017212021275.png" alt="image-20211017212021275" style="zoom: 67%;" />



## 3为什么 data 是一个函数

组件中的data写成函数，数据以函数返回形式获取。这样每次**复用**一个组件时，都会获取到一份新的data.实现各自数据的独立。如果data是用对象写的话，所有的组件实例就会共用一个data对象。



## 4vue组件通讯的方式



1.props 和 $emit. 子组件通过props接收父组件传递的数据，然后$emit触发事件向父组件传递数据。 $emit(eventName,[...args])

2.通过$parent和$children获取当前组件的父组件和组件

3.VueX状态管理。

4.父组件中通过**$ref**获取获取子组件实例的方法和属性。$ref是一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

5.事件总线 Event Bus.通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和注册监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。



## 5Vue的生命周期

vue的生命周期是 指 vue 实例的创建，初始化数据，编译模板，渲染,挂载Dom,更新,渲染，卸载的一系列过程。

​	beforeCreate()：vue实例刚创建，data和methods都未初始化，还不能使用

   created():vue实例已完全创建。data和methods可以使用。但是真正的dom还未生成。

   beforeMount:此时模板已经被渲染到内存当中，但未挂载到页面上

 mounted:模板挂载到页面上,如果操作dom,最早只能再mounted阶段

beforeUpadte:数据更新完成时调用，虚拟dom重新渲染和打补丁之前。可以在这个时候对进一步修改数据，不会触发重新渲染

updated:Dom已经完成了跟新。这个不能再更新数据。因为可能导致无限循环跟新。

**beforeDestroy**： 实例销毁之前调用。在这一步，实例仍然完全可用。可以在这时进行善后收尾工作，比如清除计时器。

destroy：Vue 实例销毁后调用。

**activated** keep-alive 专属，组件被激活时调用

**deactivated** keep-alive 专属，组件被销毁时调用

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\16ca74f183827f46_tplv-t2oaga2asx-watermark (1).png" alt="16ca74f183827f46_tplv-t2oaga2asx-watermark (1)" style="zoom:200%;" />

异步请求在哪一步发起？

可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面  loading 时间；
- ssr  不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；



## 6.v-if 和 v-show 的区别

v-if:是**“真正”的条件渲染**，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被**销毁**和**重建**。而且是惰性的，如果初始化渲染时条件值为假。则不什么也不做。直到为真时才渲染条件块。

v-show :下的元素始终都会被渲染。并且只是简单css切换。



v-if有着更高的切换开销，v-show有着较高的初始化渲染开销。

如果需要频繁地切换，则应使用v-show.

如果运行时条件很少改变，则使用v-if.



当v-if指令附属于普通元素时，v-if指令状态变化会使得父组件的dom发生变化，父组件将会更新视图，所以会触发父组件的beforeUpdate和updated钩子函数。

当v-if指令令附属于组件时，v-if指令状态变化对父组件的影响和上一条一致，但是对于本身组件的生命周期的影响是不一样的。

1. v-if从false切换到true时，会触发beforeCreate，created，beforeMount，mounted钩子。 2.v-if从true切换到false时，会触发beforeDestroy和destroyed钩子函数。







## 7.V-model

v-model就是语法糖。内部是不同type的输入元素绑定不同的属性和监听不同事件。

例如 input  type 为 text 时 绑定的时 value和监听input事件。



1.**将V-model绑定到组件上时，组件内部应该如何封装？**

在自定义组件内部可以通过model属性，来指定组件上v-model传入的值和监听的事件。

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```





## 8vue的内置命令



1.v-bind

2.v-model

3.v-on

4.v-if v-else

5.v-show

6.v-for  列表渲染



## 9 怎样理解 Vue 的单向数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

父组件通过props传递的数据如果发生改变时，子组件接收到数据也会发生改变，视图也会发生响应式变化





## 10v-if 与 v-for 为什么不建议一起使用

v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。





## 11 computed 和 watch 

computed是计算属性，依赖于**其他值**计算得到结果。并且会对结果进行缓存。只有当依赖的数据变化时才会重新计算更新缓存。如果一个数据依赖于其他数据就可以使用computed。

**使用方式**：和普通的data一样，直接通过 属性名访问即可。不用加（）。

**使用场景**：计算总价格，过滤某些数据；

为什么需要缓存？

可以优化性能，获取一个值可以不用每次都计算，直接拿缓存。而且因为响应式依赖，每次依赖更新的时候都会更新缓存。

```javascript
computed:{
	reverseMessage:funciton(){
	 return this.message.split("").reverse().join("")
	}
}
```

computed 默认只有getter，也可以设置getter

```
computed:{
   fullName:{
     set:function(){
     
     },
     get:function(){
     
     }
   }
}
```

wathc时监听**数据**变化而需要做一些事件，常用于异步或开销较大的操作。

使用场景：

```javascript
//1.监控路由对象
new Vue({
        el: '#app',
        router: router, //开启路由对象
        watch: {
          '$route': function(newroute, oldroute) {
            console.log(newroute, oldroute);
            //可以在这个函数中获取到当前的路由规则字符串是什么
            //那么就可以针对一些特定的页面做一些特定的处理
       }
    }
 })

//2.观察某个属性，弹出弹框
```

watch在最初为数据绑定监听器时是不会执行的。要等到观察的属性改变才会执行。可以通过对观察的属性增加**immediate**来使其绑定时执行。

```javascript
watch:{
 firstName:{
  handler(new,old){
    this.fulName = new + this.lastName;
  },
  immediate:true
 }
}
```

watch还有一个 deep属性。默认值时false.表示侦听器侦听的数据是对象时，只会侦听其引用。设置deep为true时，才会侦听对象内的属性。但这样开销很大，会一层层往下遍历，观察对象所以属性。也可以通过字符串来指定对象的某一属性。

```javascript
watch:{
    obj:{    // 'obj.a'
        handler(new,old){
            consloe.log(new)
        },
        deep:true
    }
}
```

**watch无法监听到数组的变化的情况(computed也不能吧)：**1.vm.items[indexofItem]=newValue 

​																  2.vm.items.length=newLength

​	**解决方案**：	把第一种情况写成this.$set(this.arr,0,1234)。第二种情况写成this.arr.splice(0,1)

使用：当我点击一个

## 12v-for 为什么要加 key

key作为列表渲染中元素的唯一标识，可以在列表更新的时候更好地复用旧的元素，提高列表渲染的效率。

key属性可以用来提升v-for渲染的效率！，vue不会去改变原有的元素和数据，而是创建新的元素然后把新的数据渲染进去

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速.



## 13 虚拟 DOM 是什么 （模板编译）

Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

DOM变为虚拟dom的过程即是模板编译。





## 14vue-router 

### 1动态路由是什么

把某种模式匹配到的所有路由，全都映射到同个组件。

```javascript
 routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
  
  // this.$route.params : {id:xxxx}
 //  this.$route.query
```

注意：当使用动态路由时，路径从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```javascript
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用全局前置路由

```javascript
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```



### 2.Router和Route的区别

**Router(路由器对象)**是VueRouter的一个对象。我们在new Vue()生成根实例时将Router实例注入进去。只要注入进去后，后续在使用都可以通过vue实例来获取Router对象：**this.$router**

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211024215848663.png" alt="image-20211024215848663" style="zoom: 67%;" />

**$router.push({path:'home'})**;本质是向history栈中添加一个路由，在我们看来是 切换路由，但本质是在添加一个history记录

**$router.replace({path:'home'})**;//替换路由，没有历史记录



**Route(路由)**

## 15diff

最小量更新算法。

新的虚拟dom和老的虚拟dom进行diff,算出应该如何最小量更新，最后反映到真实的dom上。

一个虚拟节点拥有的属性

![image-20211108205747320](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108205747320.png)

### 1.虚拟dom被h函数产生

h函数接收参数格式：

snabbdom中h函数的源码h.ts：主要就是通过**重载**来实现函数参数的可以是多种情况。

```js
//最常用的三种
// 节点标签类型   标签属性    标签的文本
h('a',{props:{href:'http://www.baidu.com',target:'_blank'}},'百度');
// 节点标签类型   标签属性    标签一个子元素
h('a',{props:{href:'http://www.baidu.com',target:'_blank'}},h('span',{},'子节点'))
//// 节点标签类型   标签属性    标签的子元素数组
h('a',{props:{href:'http://www.baidu.com',target:'_blank'}},[h('span',{},'子节点1'),h('span',{},'子节点2')])
```

调用完后生成的对象。

![image-20211108230132891](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108230132891.png)



<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108225632507.png" alt="image-20211108225632507" style="zoom: 67%;" />

![image-20211108225526942](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108225526942.png)

### 2.diff算法原理。

演示：当增加一个节点在尾部时是直接插入

![image-20211108233114327](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108233114327.png)

如果是增加在头部，后面的不会复用。但是如果虚拟节点内data对象有key值，则会被复用。

![image-20211108233244424](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108233244424.png)

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108233431224.png" alt="image-20211108233431224" style="zoom: 50%;" />



#### diff算法特点

1.最小量更新。依据唯一标识key.

2.只有该节点新旧虚拟dom中的同一虚拟节点**（选择器（h函数的第一个参数）和key相同即是同一个虚拟节点）**才进行比较，否则暴力删除旧的，插入新的。

3.只会同层级比较，不会跨层比较。以下代码vnode2新增了一层section，则旧节点被暴力删除，然后插入新的。



<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211108234149320.png" alt="image-20211108234149320" style="zoom:50%;" />



![image-20211018005624667](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211018005624667.png)



1.首先在patch方法，在patch方法内调用sameVNode方法判断新老虚拟dom是否为同一类型的节点

2.如果不是则直接更换跟新新虚拟dom

3.如果类型相同，则对新旧虚拟dom进行深层比较。调用patchVnode（oldVnode, newVnode）方法。

   3.1*如果新旧虚拟节点是同一个对象，则终止*

   3.2*如果新旧虚拟节点是文本节点，且文本不一样* *则直接将真实DOM中文本更新为新虚拟节点的文本*

​    3.3*否则* *新旧虚拟节点都有子节点，且子节点不一样* *对比子节点，并更新* 使用 updateChildren方法

​           a.方法内对新老虚拟dom都有两个头尾指针指向头尾孩子节点,头尾孩子节点两两比较，如果相同则指针移动，并将相同节点真实的dom

​			b如果以上逻辑都匹配不到，再把所有旧子节点的 `key` 做一个映射到旧节点下标的 `key -> index` 表，然后用新 `vnode` 的 `key` 去找出在旧节点中可以复用的位置。

 



## 16nextTick

vue更新dom的背景：

vue更新DOM是异步的。只要侦听到数据发生变化，vue就会开启一个缓冲队列，存入同一事件循环内所有的数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。然后在下一次事件循环“tick"中，vue刷新队列并执行相应工作。

nextTick的作用：当我们跟新数据时，dom会在下一次事件循环发送跟新渲染。如果我们要访问更新渲染后的dom进行相应操作的话，可以通过**this.$nextTick**内。



```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
```

因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用新的 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法完成相同的事情：

```javascript
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```



## 17 组件库

### 1.vue.extend与 $mount一起使用  

**vue.extend生成一个 vue构造函数。**通过接收一个对象来生成一个vue构造器 。

```javascript
<div id="mount-point"></div>

// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

### 2混入Mixin

1.在new Vue实例时，可以在mixin属性内添加要混入的属性。

2.各属性混入时一般会同名属性合并成一个对象，如果属性data混入时发生冲突，以vue实例的属性为准。

```javascript
//data 对象如此  同键名时以vue实例为准
const mixin = {
    data:funciton(){
    return {
      message: 'hello',
      foo: 'abc'
    }
 }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
}

//methods 方法也是如此
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"

        
//生命周期钩子函数也会合并
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"  
```

以上都是组件混入

也可以全局混入

```javascript
Vue.mixin({
created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

### 3.自定义指令

1.全局与局部

```javascript
//全局注册指令
Vue.directive('focus',{
  inserted:function(el){
     el.focus();
  }
})

//局部注册指令
new Vue({
  directives:{
      focus:{
          inserted:function(el){
              el.focus();
          }
      }
  }
})
```

2.钩子函数

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

updated:所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

componentUpdated：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

unbind:只调用一次，指令与元素解绑时调用。



**以上钩子函数都有以下参数**

el:指令绑定的元素，可以用来直接操作dom.

binding:一个对象

```
name：指令名，不包括 v- 前缀。
value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
```

vnode:虚拟节点

oldVnode:旧虚拟节点





### 4.如何开发一个组件库

通过封装成插件。一个js对象代表一个插件，该对象暴露一个install方法。该方法第一个参数是 Vue构造器，第二个参数是一个可选的选项对象。**在install方法内可以通过Vue构造器来注册组件。** 

还可以通过Vue构造器：1.添加全局方法或属性，2.通过Vue.directive()添加全局指令。 3.通过Vue.mixin混入



## 18keep-alive

缓存组件，不需要重复渲染.如多个静态Tab页的切换优化性能.

希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就可以用到keep-alive组件。





## 19事件修饰符

[好文](https://blog.csdn.net/weixin_46071217/article/details/108654509)

.stop 阻止事件继续传播
.prevent 阻止标签默认行为
.capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件将只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
123456789101112131415161718192021222324252627
```



## 20V-on事件监听

1.将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

2.vm.$listeners:里面包含了作用在这个组件上的所有监听器你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。