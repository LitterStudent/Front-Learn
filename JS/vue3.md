该文档是关于vue3的学习文档

# 1.基础（composition API)

组合式API

## 1.setup

### 1.基础

vue2的变量在data中声明赋值，methods中定义赋值方法，

vue3的setup用于代替methods和data.并且需要使用 ref来包装数据 为 refernceImplment对象实例，即引用对象实例。这样定义的数据才是响应式的。

![image-20211216150623567](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216150623567.png)

**ref()**可以包装 原始类型 和 引用类型 为一个 RefImpl 实例，需要通过.value 访问属性。原始类型仍然式通过 Object.definProperty的 get和 set实现的数据劫持（即响应式），而引用类型式通过 一个 新方法  reactive（）内部通过 proxy 代理实现响应式。**一般用于定义 原始类型数据**。

但是，在模板中使用 ref对象的值时不需要添加.value,vue自动帮我们解析了，再setup中就需要了。

![image-20211225202606566](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225202606566.png)

**reactive()** 可以直接包装 引用类型 为 proxy 实现响应式。我们实现引用类型的响应式可以直接使用 reactive, 因为使用 ref 要多用.value去获取值。**一般用于定义对象或数组类型数据。**

![image-20211216155115605](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216155115605.png)



### 2.两个注意点

1.在beforecreate 前执行

2.接收两个参数，props  和 context()

两种写法： **setup(props,context)    解构写法：setup(props,{ attrs, slot, emit }) 或者 使用下划线进行占位 setup(_,context)** 

context 如下，含有 attrs ,emit,slot 对应 vue2组件实例上的 $emit, $slot,$attrs

atrrs:非props的attributes

slot:父组件传递过来的插槽内容，渲染函数返回时有用。

emit: 组件内部发出事件

![image-20211216222145802](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216222145802.png)

vue2中的 组件实例

![image-20211216212954005](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216212954005.png)

3.setup中的this为undefined

![image-20211225194450776](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225194450776.png)

4.setup 函数的返回值 类似 vue2中的 data,但是优先级比data高，当两者都存在时，data失效。



## 2.vue3响应式原理 

通过 Proxy： 拦截对象的任意属性的变化，包括值的读写，删除，添加

通过 Reflect ： 对被代理的对象进行操作 （Reflect 的好处操作后不会报错，不用写 try catch 去捕获错误 ，会返回一个布尔值代表操作成功还是失败）



## 3.计算属性

computed 返回的是一个 ref对象。所以获取值时要加上 **.value**

```js
import {computed} from 'vue'

setup(){
    // 简写
    let fullname = computed(()=>{
        return person.firstName+person.lastName
    })
    // 完整
    let fullName = computed({
        set(value){
            const arr = value.split('-')
            person.firstName = arr[0];
            person.lastName = arr[1];
        },
        get(){
        return persion.firstName+'-'+person.lastName
    	}
    })
}

```



## 4.监听属性

```js
import {watch,ref,reactive} from 'vue'
// 本质上还是通过 watch 函数去监听 refImol 对象或者 proxy对象

export default {
    setup(){
        let sum = ref(12);
        let msg = ref('msg');
        let obj = reactive({
            name:'xiaoming',
            age:12,
            job:{
                type:'A',
                slary:'22k'
            }
        })
        // 监听 ref定义的普通属性
        watch(sum,(newValue,oldValue)=>{
            console('sum改变了',newValue) // 输出的式 refImpl 对象
        }，{immediate:true});
        watch([sum,msg],(newValue,oldValue)=>{
            conslole.log("数组内的数据改变了")
        },{immediate:true})
        
        //监听 reactive所定义的对象
        // 1.默认开启 deep 深度监视
        // 2.无法获得 oldValue的值 bug 获得的式 新旧一样的proxy对象 
        watch(obj,(newValue,oldValue)=>{
            ......// 输出的式 proxy 对象
        })
        // 监听 reactive 对象内的某个属性
        watch(()=>obj.name,(newValue,oldValue)=>{ 
            ......
        })
        // 如果监听reactive 对象内的某个属性式对象的话，需要手动配置深度监听
        watch(()=>obj.job,(newValue,oldValue)=>{
            ......
        },{deep:true})
        
        // 可以对proxy对象进行解构，从而监听变化后获取普通对象
        watch(()=>{
            return {...obj.job}
        },(newValue,oldVaue)=>{
            ...
        })
        
       return {
           sum,
           msg,
           obj
       }
    }
}
```



### 2.watchEffect

一个新的api .可以监听函数内部有调用的值，该函数会被**立即调用**，因为要通过执行一次函数来收集对变量的依赖。只有收集的依赖发送变化时，watchEffect传入的函数才会执行。

```vue
<template>
  <div>
    <h3>name:{{myname}}</h3>
    <button @click="myname = myname+='--'">修改name</button>
     <button @click="myobject.age++">修改obj</button>

    <hr>
    <h2 ref="nihao">nihao</h2>
  </div>
</template>

<script>
import { ref,watchEffect,reactive} from 'vue'
  export default {
    setup(){
      const myobject = reactive({age:12})
      console.log(myobject)
      const myname = ref('xiaoming')
      const nihao = ref(null)
      watchEffect(()=>{
          // 注意 要调用值，调用引用的话监听后 一般不变的
        const n = myobject.age
        console.log(n)
        console.log(nihao.value)
          // flush 可以延迟回调函数的调用，从而正确获取 dom。而不用在第一次dom还未挂载时立即调用 
      },{flush:'post'})
      return {
        nihao,
        myname,
        myobject
      }
    }
  }
</script>
```

watchEffect 第二个参数：配置项。传入一个对象。

该对象的值有： flush:  watchEffect 第一个参数（回调函数的调用时机）pre(默认)元素挂载前执行， post 元素挂载后执行。

用例：在侦听函数的中需要用到dom中的内容，通过ref获取，需要配置 flush:post.

![image-20211226002346086](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211226002346086.png)



watchEffect 默认返回一个关闭函数，调用后可以停止监听

![image-20211225233211844](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225233211844.png)

 watchEffect清除副作用

![image-20211226001419722](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211226001419722.png)





## 5.生命周期



生命周期中的钩子函数：在Vue源码内部的某个时间会被调用的函数。

![](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211217154730879.png)

1. 可以通过组合式api来使用生命周期钩子函数。即在 setup()内部通过特定的函数来指定生命周期钩子函数。

   beforeCreate Created  ====> setup 

   beforeMount ====> UnBeforeMount

   Mounted ====> OnMounted

   beforeUpdate ====> OnBeforeUpdate

   **注意，没有beforeDestory 和 destoryed** 

   beforeUnmount====>OnbeforeUnmount

   Unmounted====> OnUnmounted

2. 组合式api和配置项 使用生命周期钩子都是可以的。

   该图没有写出配置项的配置

![image-20211217155515375](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211217155515375.png)



## 6 自定义 hook 函数

什么是 hook?

本质是一个函数，把setup使用的 composition API（ref  reactive watch computed 生命周期等 ）提取出来封装。让setup的逻辑更清晰。

![image-20211218093311337](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211218093311337.png)

```js
// pointEventHandler.js
import { reactive } from '@vue/reactivity'
import { onBeforeUnmount } from '@vue/runtime-core'
export default function(){
    const point = reactive({
        x:0,
        y:0
    })
    let pointEventHandler = (e)=>{
        point.x = e.pageX
        point.y = e.pageY
        console.log(e.pageX);
    }
    window.addEventListener('click',pointEventHandler)
    onBeforeUnmount(()=>{
        window.removeEventListener('click',pointEventHandler)
    })

    return  point
}
```

```vue
// Test2.vue
<template>
  <h1>点击出现坐标</h1>
  <h2>x:{{point.x}}y:{{point.y}} </h2>
</template>

<script>
import pointEventHandle from '../hooks/pointEventHandler'

export default {
    setup(){
       const point = pointEventHandle();
       
       return {
           point
       }
    }
}
</script>

<style>

</style>
```

## 7.toRef 

作用：创建一个 ref对象，其值指向另一个reactive对象的某个属性，并且是响应式的。

```js
const person = reavtive(person)
const name = toRef(person,'name')  // name的修改可以更新到 person上 person的修改也会更新到 name上
```

toRef 的 value 可能是 原始值 或者 proxy对象。

![image-20211218102856057](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211218102856057.png)

![image-20211218102806882](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211218102806882.png)

toRefs类似

```js
const person = reactive(person);
const person = toRefs(person);
return {
 person,
 ...person
}

// 后面的模板语法就可以直接使用 person内的属性， name, age,job等。不同添加 person前缀

<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <h2>{{ job.type  }}</h2>
</template>
```



## 8 其他 composition API

### 1.shallowRef 和shallowReactive ，triggerRef

shallowReactive: 只对对象的最外层属性做响应式。如果一个对象结构比较深，但是只有最外层的数据会改变就可以使用。

shallowRef:只对 值类型数据 做响应式，引用类型不做响应式处理。如果有一个对象，后续操作不会修改对象内的某个属性，而是直接替换掉该对象，就可以使用。

triggerRef:手动触发和 shallowRef 相关联的不修改的模板。

```vue
<template>
<h2>{{ info }}</h2>
<button @click="changeInfo">修改</button>
</template>

<script>
 import { ref, shallowRef, triggerRef } from 'vue'
const info = shallowRef({name: "why"})
const changeInfo = ()=>{
    info.value.name = "nihao";
    triggerRef(info) // 通知dom更新
}
return {
    info,
    changeInfo
}
</script>
```





### 2.readonly 和 shallowReadonly

作用：都是让属性只可读，不可以修改。

![image-20211225202951601](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225202951601.png)

readinly: 可以接收 ref对象或者 reactive 对象，生成后的对象上的属性都不能更改，只可读。**(深只读)**

作用：可以通过给readonly函数传入一个 reactive|| ref 对象生成一个只读的对象给子组件，这样子组件就不能修改父组件传递的数据，而父组件可以通过原理的 reactive|| ref 对象来修改数据。



shallowReadOnly: 可以接收 ref对象 或者 reactive 对象，生成的对象的属性上只有最外一层只可读，不可修改，深层的属性可以修改。**（浅只读）**

```js
let sum = ref(0);

let person = reactive({
	name:'xiaoming',
	age:19,
	job:{
	 j1{
	   salary
	 }
	}
})

person = readonly(person) 
// person = shallowReadonly(person)

```



### 3.toRaw 和 markRaw 

toRaw: 可以将 reactive 定义的响应式对象转换为 普通对象，

​     应用场景：对普通对象的操作不会改变响应式对象。



markRaw: 标记一个对象，使其永远不会称为响应式对象。

​	 应用场景：1.第三方类库等，不应该被设置成响应式。2.当渲染不可变数据源的大数据列表时，跳过响应式转换能提高效率。 



### 4.customRef

作用：实现一个自定义的 ref, 并对其依赖项跟踪和更新触发进行显示控制

```js
<template>
  <input type="text" name="" id="" v-model="value">
  <h2>{{value}}</h2>
</template> 

setup(){
        function myRef(value){
            return customRef((track,trigger)=>{
                let timmer;
                return {
                    set(Newvalue){
                        console.log("设置数据");
                      if(timmer)
                      clearTimeout(timmer);
                      timmer =  setTimeout(()=>{
                            value = Newvalue;
                            trigger();  //通知解析模板
                        },500)
                    },
                    get(){
                        console.log("获取数据");
                        track(); //通知Vue追踪value的变化
                        return value;
                    }
                }   
            })
        }
        let value = myRef('hello');
        return {
            value
        }
    }
```

 

### 5.provide 和 inject

![image-20211218195705839](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211218195705839.png)

作用：实现跨级组件通信，隔一代或者多代。

1. 祖组件

   ```js
   setup(){
       ......
   	let car = reactive({
   		name:'benchi',
   		price:40
   	})
   	provide('car',car)
       .......
   }
   ```

   2.孙组件

   ```js
   setup(){
    let car = inject('car');
    return {car}
   }
   ```


#### 1.optionsApi写法

```vue
<script>
export default {
        // 写法一 写成对象形式
    provode{
    	name: 'why',
    	age:18,
    	length: this.names.legnth // 注意，对象形式无法获取到this,这里的this是 script标签的 this 为 undefined
	},
    // 写法二 函数形式
    provide(){
        return {
            name: "why",
            age: 18,
            length: this.names.length  // 注意看这里，使用到了this,所以provide应该使用函数形式才能获取到vue实例的作为										  //this
        }
    },

    data(){
        return {
            names:["a","c","b"]
        }
    }
}
</script>
```



### 6.响应式数据的判断

isRef: 检测 一个对象为是否为一个 ref对象

isReactive:检测 一个对象是否为 reactive 创建的对象

isReadonly: 检查 一个对象是否为readOnly 创建的对象

isProxy: 检查一个对象是否为 reactive或 readonly 创建的对象



## 9  composition API 的优势

### 1.OptionsAPI中存在的问题

使用vue2的optionsApi中，新增或者修改一个功能，就需要分别在data ,methods，computed中修改。 同一个功能的逻辑被拆的太分散。



### 2.组合式api的优势：

可以将同一功能的 data,methdos，computed等属性写在一起，提取到单独的一个hook中，更优雅和有序地组织我们的代码和函数。

Vue Composition API (**VCA)**

## 10新的组件

### 1.Fragment

在vue3中，组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟标签中。

好处：减少标签层级，减少内存占用。



### 2.Teleport

能够将我们定义的组件的html结构 移动到指定位置。

使用场景： 定义 dialog 时，浮现的对话框的操作可能是由层级很深入的后代组件完成的，但是弹出弹框的位置是在屏幕正中间，此时就可以通过 Teleport 将弹框组件的html结构传送到body标签，并定位到中央。

```html
<teleport to="移动的位置">
    <div>
        <h3>
            我是一个弹框
        </h3>
    </div>
</teleport>
```



### 3.Susbpense 

作用：当我们异步引入组件时，可以让用户有更好的体验。

```vue
<template>
  <div id="app">
    我是父组件
      <child></child>
  </div>

</template>
  <!--在组件中使用异步引入的组件，在网络请求中，如果网速过慢，异步引入的组件还未加载出来，就会默认先显示父组件，等异步组件加载出来后再将子组件渲染出来，这就会导致用户的页面突然渲染出其他组件，体验不好-->

<script>
import { defineAsyncComponent } from 'vue'
const child = defineAsyncComponent( ()=>import('./components/Child') )

export default{
    components:{
        child
    }
}
</script>
```

 vue_cli在打包时默认会将我们编写的代码打包到 app.js内，第三方依赖库打包到 chunk-vendors.js内，当异步导入Child 组件时，Child 组件就会被单独打包为一个文件，chunk.[chunkhash].js. 这样 就可以使得该组件要显示时才下载相应的文件，提高首屏加载速度。

![image-20211223225334751](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223225334751.png)

```vue
<template>
  <div id="app">
    我是父组件
      <child></child>
  </div>

</template>

<script>
import Loading from "./Loading.vue"
import { defineAsyncComponent } from 'vue'
const child = defineAsyncComponent({
    //defineAsyncComponent函数的传入值还可以是对象，可以通过loadingComponent指定 加载时显示的组件
     ()=>import('./components/Child') ,
      loadingComponent: Loading，
      // 在显示组件前，等待多长时间
      delay:2000
})

export default{
    components:{
        child
    }
}
</script>
```

Suspense是一个全局内置的组件，目前（2021-12-24）是一个还在实验当中，API可能会改。

 该组件有两个插槽， defult: 默认显示内容， fallback: default还未加载出来时显示的内容

```vue
<template>
  <div id="app">
    我是父组件
      <Suspense>
    	<template v-slot:default>
            <child></child>
		</template>
		<template v-slot:fallback>
			加载中.......
		</template>
    </Suspense>
  <!--所以在异步导入的组件中使用 Suspense标签，Suspense标签内部使用插槽，当异步组件还未加载出来时，先加载fallback插槽内的信息，等异步组件加载完毕后再更换插槽，跟用户看到有一个加载的过程-->
  </div>

</template>

<script>
import { defineAsyncComponent } from 'vue'
const child = defineAsyncComponent( ()=>import('./components/Child') )

export default{
    components:{
        child
    }
}
</script>
```



## 11.组件

1.事件





## 12.事件总线

vue3的实例移除了 $on,$off和$once 方法，所以使用全局事件总线得采用和vue2不同的方式。可以通过第三方库。

vue3官方推荐 **mitt 库**

 

1.npm install mitt

2.定义一个工具文件夹编写 eventbus.js

![image-20211223163533947](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223163533947.png)

3.在父组件引入。通过on,定义事件和事件回调。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223163754310.png" alt="image-20211223163754310" style="zoom:67%;" />

4.在后代组件中，通过 emit,触发事件，并传入相应参数。

5.可以通过 off(事件名称，回调名称)，来取消某一个事件的回调。

6.可以通过  **.all.clear()**的方式清除空事件总线。



## 13引用元素

1.vue3中 $refs绑定到组件上时，输出的为一个 proxy对象

![image-20211224113538908](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211224113538908.png)



2. $root 和 $parent 也都是 prxy对象
3. VUE3移除了$children属性





## 14 表单绑定

#### 1.标签元素上的 v-model

标签上的表单绑定 和 vue2 一样， 不赘述。



#### 2.组件上 的 v-model.

 在组件上，表单绑定更改 为

- **非兼容**：用于自定义组件时，v-model 

  prop 和事件默认名称已更改：

  - prop：`value` -> `modelValue`；
  - 事件：`input` -> `update:modelValue`；

- **非兼容**：`v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除，可在 `v-model` 上加一个参数代替；

- **新增**：现在可以在同一个组件上使用多个 `v-model` 绑定；

- **新增**：现在可以自定义 `v-model` 修饰符。





## 15.Mixin

![image-20211225143025846](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225143025846.png)

### 1.vue3 的 全局混入。 

 **但是 vue3中 因为有了composition API， mixin用的比较少**

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// 为自定义的选项 'myOption' 注入一个处理器。
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

// 将myOption也添加到子组件
app.component('test-component', {
  myOption: 'hello from component!'
})

app.mount('#mixins-global')

// => "hello!"
// => "hello from component!"
```



# 2.vite

官方定位：下一代的前端开发与构建工具。

 vite由两个部分组成： 一个开发服务器，它基于原生的ES模块提供丰富的内建功能，HMR的速度非常块

​										一套构建指令，它使用 rollup打开我们的代码，并且是预配置的，可以输出生成环境的优化过的静态资源。



## 1.前言

现代浏览器虽然默认支持 ESmodule,但是不支持 ts,vue 文件的识别，还有当引用文件的依赖过多时，浏览器需要发送过多的网络请求。vite就是想利用浏览器esmodule的特点，在开发阶段不对文件进行打包，而是将代码进行简单转换，转换成EsModule的代码，直接将资源运行在浏览器上，节省构建时间，而在项目开发完成时再将代码进行打包构建。 



**直接在浏览器使用ESmodule的弊端：**

1.导入文件时必须指定后缀名 （js,css,等），引入第三方库时必须指定完整路径，过于繁琐。

![image-20211222150830317](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222150830317.png)

2.引入第三方库时，如果一个文件依赖过度需要浏览器去逐一请求，消耗性能过大。

 如上图请求 lodash 库时，该文件有两百多个js依赖需要浏览器去逐一请求。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222151204980.png" alt="image-20211222151204980" style="zoom: 50%;" />

## 2.起步

vite 依赖于node 12版后。

### 1.安装： npm install vite -D

### 2.启动： npx vite 目录如下

![image-20211222203052073](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222203052073.png)

### 3.使用vite后，文件引入的可以不用把路径写全，也可以不用后缀名，网络请求时也不会请求第三方库过多的依赖文件。

![image-20211222203920625](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222203920625.png)

![image-20211222203928796](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222203928796.png)



### 4.vite对css的处理当导入普通css时，不需要添加任何loader，vite自动帮我们解析完成。

![image-20211222204830186](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222204830186.png)

​	但是不能解析less文件，解析less时需要添加  npm install less -D 

![image-20211222205525568](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222205525568.png)

![image-20211222205516042](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222205516042.png)

css的兼容性处理需要添加相应的第三方库。

​		npm install postcss -D

​		npm install postcss-preset-env -D

​		配置postcss.config.js 

![image-20211222210110026](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222210110026.png)

兼容性如下

![image-20211222210411377](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222210411377.png)

### 5.默认对typescript的支持



### 6.对vue的支持

1.安装 Vue3 npm install  vue@next -D  vue的核心代码

![image-20211222223314600](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222223314600.png)

2. 安装  @vite/plugin-vue 让vite能够支持vue
3. 配置 vite.config.js 文件

![image-20211222234716829](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222234716829.png)

4.安装 npm install @vue/compiler-sfc -D  负责对vue文件进行解析

### 7.vite的预打包

vite会对第三方库进行预打包存放到/node_modules/vite/ 文件夹下。 因为第三库的文件我们只是引用，不会去修改，所以可以预打包,预打包后下次重新使用vite加载时就可以减少项目的启动时间。

![image-20211222235215400](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222235215400.png)







## 3.vite的原理

内部搭建的一个服务器 Connect(Conntect服务器非常容易做请求的转发 )，将请求的资源以esmodule的格式返回。 

![image-20211222222336241](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222222336241.png)

![image-20211222211619901](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222211619901.png)



## 4.vite 打包

1.npx vite build 进行打包

![image-20211222235701939](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222235701939.png)

2.npx vite preview 对打包后的文件进行预览

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222235756742.png" alt="image-20211222235756742" style="zoom: 80%;" />

3. 对package.json 内的 script 进行配置， 可以不加 npx ,就去 node_modules/bin 下找相应的启动文件

![image-20211223000013115](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223000013115.png)

## 5.ESBuild

vite是基于ESBuild的

![image-20211223001243365](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223001243365.png)



## 6.vite脚手架

在开发中，我们可以不用从零开始使用vite去搭建项目，可以通过vite脚手架搭建 

1.安装 npm install @vitejs/create-app -g  

2.创建项目 create-app 项目名称

3.npm install  安装依赖



创建完成的项目目录

![image-20211223002144698](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223002144698.png)

运行脚本

![image-20211223002204419](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223002204419.png)
