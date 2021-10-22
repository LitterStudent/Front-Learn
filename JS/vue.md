## 1vue的理解

渐进式` JavaScript` 框架、核心库加插件、动态创建用户界面





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



1.props 和 $emit. 子组件通过props接收父组件传递的数据，然后$emit触发事件向父组件传递数据。

2.通过$parent和$children获取当前组件的父组件和组件

3.VueX状态管理。

4.父组件中通过**$ref**获取获取子组件实例的方法和属性。$ref是一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

5.事件总线 Event Bus.通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和注册监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。



## 5Vue的生命周期

vue的生命周期是 指 vue 实例的创建，初始化数据，编译模板，挂载Dom,渲染，更新，卸载的一系列过程。

​	beforeCreate()：vue实例刚创建，data和methods都未初始化，还不能使用

   created():vue实例已完全创建。data和methods可以使用。但是真正的dom还未生成。

   beforeMount:此时模板已经被渲染到内存当中，但未挂载到DOM

 mounted:模板挂载到DOM,如果操作dom,最早只能再mounted阶段

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

v-show :不管什么条件下，元素都会被渲染。并且只是简单css切换。



v-if有着更高的切换开销，v-show有着较高的初始化渲染开销。

如果需要频繁地切换，则应使用v-show.

如果运行时条件很少改变，则使用v-if.







## 7.V-model

v-model就是语法糖。内部是不同type的输入元素绑定不同的属性和监听不同事件。

例如 input  type 为 text 时 绑定的时 value和监听input事件。



## 8vue的内置命令



1.v-bind

2.v-model

3.v-on

4.v-if v-else

5.v-show

6.v-for  列表渲染



## 9 怎样理解 Vue 的单向数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。





## 10v-if 与 v-for 为什么不建议一起使用

v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。





## 11 computed 和 watch 

computed是计算属性，依赖于**其他值**计算得到结果。并且会对结果进行缓存。只有当依赖的数据变化时才会重新计算更新缓存。如果一个数据依赖于其他数据就可以使用computed

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

使用：当我点击一个

## 12v-for 为什么要加 key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速.



## 13 虚拟 DOM 是什么 	

Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。



## 14vue-router 动态路由是什么

把某种模式匹配到的所有路由，全都映射到同个组件。

```
 routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
```





## 15diff

![image-20211018005624667](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211018005624667.png)





