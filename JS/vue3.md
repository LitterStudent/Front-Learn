该文档是关于vue3的学习文档

# 1.基础（composition API)

组合式API

## 1.setup

### 1.基础

vue2的变量在data中声明赋值，methods中定义赋值方法，

vue3的setup用于代替methods和data.并且需要使用 ref来包装数据 为 refernceImplment对象实例，即引用对象实例。这样定义的数据才是响应式的。

![image-20211216150623567](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216150623567.png)

**ref()**可以包装 原始类型 和 引用类型 为一个 RefImpl 实例，需要通过.value 访问属性。原始类型仍然式通过 Object.definProperty的 get和 set实现的数据劫持（即响应式），而引用类型式通过 一个 新方法  reactive（）内部通过 proxy 代理实现响应式。**一般用于定义 原始类型数据**。

**reactive()** 可以直接包装 引用类型 为 proxy 实现响应式。我们实现引用类型的响应式可以直接使用 reactive, 因为使用 ref 要多用.value去获取值。**一般用于定义对象或数组类型数据。**

![image-20211216155115605](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216155115605.png)

### 2.两个注意点

1.在beforecreate 前执行

2.接收两个参数，props  和 context()

context 如下，含有 attrs ,emit,slot 对应 vue2组件实例上的 $emit, $slot,$attrs

![image-20211216222145802](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211216222145802.png)





vue2中的 组件实例

![image-20211216212954005](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211216212954005.png)





## 2.vue3响应式原理

通过 Proxy： 拦截对象的任意属性的变化，包括值的读写，删除，添加

通过 Reflect ： 对被代理的对象进行操作 （Reflect 的好处操作后不会报错，不用写 try catch 去捕获错误 ，会返回一个布尔值代表操作成功还是失败）



## 3.计算属性

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
        
       return {
           sum,
           msg,
           obj
       }
    }
}
```



### 2.watchEffect

一个新的api 

```js
import {wathceEffect} from Vue

export default {
    ...
    setup(){
    // 可以 获取 要监听的数据 ，然后在函数内统一进行逻辑处理
        watchEffect(()=>{
            const x1 = name;
            const x2 = person;
            console.log("书写监听到属性后的逻辑")
        })
	}
    
}
```



## 5.生命周期

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

### 1.shallowRef 和shallowReactive 

shallowReactive: 只对对象的最外层属性做响应式。如果一个对象结构比较深，但是只有最外层的数据会改变就可以使用。

shallowRef:只对 值类型数据 做响应式，引用类型不做响应式处理。如果有一个对象，后续操作不会修改对象内的某个属性，而是直接替换掉该对象，就可以使用。



### 2.readonly 和 shallowReadonly

作用：都是让属性只可读，不可以修改。

readinly: 可以接收 ref对象或者 reactive 对象，生成后的对象上的属性都不能更改，只可读。**(深只读)**

shallowReadOnly: 可以接收 ref对象 或者 reactive 镀锡，生成的对象的属性上只有最外一层只可读，不可修改，深层的属性可以修改。**（浅只读）**

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

   

### 6.响应式数据的判断

isRef: 检测 一个对象为是否为一个 ref对象

isReactive:检测 一个对象是否为 reactive 创建的对象

isReadonly: 检查 一个对象是否为readOnly 创建的对象

isProxy: 检查一个对象是否为 reactive或 readonly 创建的对象



## 9  composition API 的优势

1.OptionsAPI中存在的问题

使用vue2的optionsApi中，新增或者修改一个需求，就需要分别在data ,methods，computed中修改。



2.组合式api的优势：

可以将同一功能的 data,methdos，computed等属性写在一起，提取到单独的一个hook中，更优雅和有序地组织我们的代码和函数。



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

