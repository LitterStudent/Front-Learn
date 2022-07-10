## 	1vue的理解

渐进式` JavaScript` 框架、核心库加插件、动态创建用户界面

可以逐步构建应用，简单应用只需要一个轻量小巧的核心库，复杂应用可以引入各式各样的Vue插件。

刚开始可能只需要vue做一些基础的工作，如页面渲染，后续还可以再继续添加组件化，当页面变多时需要进行导航可以使用插件vue-router,需要统一的状态管理可以使用vuex。



**vue的特点**

1.组件化

2.响应式数据

3.虚拟dom和diff算法



## 2.vue基础

### 1.Vue实例上常用方法。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359898.png?token=AP3MTU7DGMYJC4SDW3F5GMDBU4HX2" alt="image-20211113171123378" style="zoom:80%;" />



原型上的方法

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359825.png?token=AP3MTU52JFBZARKRFXQHAB3BU4HYE" alt="image-20211113171155363" style="zoom: 80%;" />



### 2.数据代理和数据劫持

[好文](https://blog.csdn.net/weixin_44976833/article/details/104540455)

```js
{{name}}
//这样实际上是在访问vue实例vm上的属性
//但是vm上怎么会有data里面的每一个属性呢？
//答案就是数据代理

//data属性上的数据代理到了vm上
//访问的是vue实例，vm上的属性
//初始化vue实例vm时，传入的data会代理到vue实例vm上。

vm._data === data //同一个对象
```

vm_data = options.data

数据代理就是将 vm_data 中的数据,代理到 vm上。可以直接通过 vm.name 代替 vm._data.name 来访问。

数据劫持是通过Observer对象将data中的每一项数据的get和set进行劫持。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359538.png?token=AP3MTU5CWQU6FOQBSMBDS6TBU4HYI" alt="image-20211113174016175" style="zoom:67%;" />



### 3.事件处理

#### 1.可以使用 v-on，或者 @

#### 2.通过往方法中传入 $event 参数传递事件

#### 3.方法定义时，不应该使用箭头函数，这样this 才是 指向vm 或者 组件实例对象

```vue
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<script>
    // ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
</script>
```



#### 4.事件修饰符

[好文](https://blog.csdn.net/weixin_46071217/article/details/108654509)

.stop 阻止事件继续传播
.prevent 阻止标签默认行为
.capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件将只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为

```vue
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

什么是事件的默认行为？
当监听到 srcoll事件，默认行为就是滚动条下滑。

默认事件流会将监听事件的回调函数先执行完后再执行默认行为。
如果回调函数耗时过久，就可以使用passive来使得默认行为先执行。




```



#### 5.键盘事件

1.有keydown和keyup.一般用keyup. 

2.常见的键盘修饰符：keyup.enter .tab .space 等.只有tab一般搭配keydown.

3.可以通过event.key 来获取按键名



#### 6.组件事件

1.将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

2.vm.$listeners:里面包含了作用在这个组件上的所有监听器你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。





### 4样式绑定



通过  :class=" " 动态绑定样式

1.字符串

```vue
<div v-bind:class="str"></div>


<scrpit>
new Vue({
    data: {
  	str:'color'
  }
    })
</scrpit>
```

2.对象

```vue
<div v-bind:class="arr"></div>


<scrpit>
new Vue({
    data: {
  	obj:{
  	'active':true,
    'text-danger':false
  	}
  }
    })
</scrpit>
```

3.数组

```vue
<div v-bind:class="arr"></div>


<scrpit>
new Vue({
    data: {
  	arr:[ 'active',
         'text-danger']
  }
    })
</scrpit>

```





### 5.插槽

**概念：**

在开发过程中， 在封装组件的时候，使用元素<slot>可以为封装的组件开启一个插槽，插件插入什么内容取决于父组件如何使用。

 插槽可以让 开发者 决定 组件中的某一块区域到底存放什么标签元素。





#### 1.新语法：v-slot    

在组件上 通过 slot标签 声明name 指定插槽名 . 使用组件时通过<template>和v-slot指定插槽名称。还有默认插槽。

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

在组件上 通过 slot标签 声明name 指定插槽名 . 使用组件时通过<template>和v-slot指定插槽名称。还有默认插槽。

![image-20211223171502325](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223171502325.png)

#### 2.旧语法 ： slot:name

```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>

或者直接把 slot attribute 用在一个普通元素上：

<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

#### 3.作用域插槽

##### 1.前言：渲染作用域

vue中有渲染作用域的概念，父级模板里的所有内容都是在父级作用域中编译的，子模版的所有内容都是在子作用域中编译的。

![image-20211223172402430](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223172402430.png)

```vue
//子组件  show-name
<template>
	<div>
        <template v-for="(item,index) in names" :key="item">
			<slot name='haha' :item="item" :index="index"></slot>
		</template>
    </div>
</template>

// 父组件
<template>
	<show-name>
    	<template v-solt:haha='slotProps'>
            <button>
            {{slotProps.item}}-{{slotProps.index}}    
    		</button>
		</template>
    </show-name>
</template>

// 当子组件只有一个插槽时，父组件在调用时可以省略 <template> ,直接将 v-slot 添加到 子组件标签上
// 独占默认插槽
<template>
	<show-name v-solt:haha='slotProps'>
            <button>
            {{slotProps.item}}-{{slotProps.index}}    
    		</button>
    </show-name>
</template>
```



## 3.组件

组件的优点：可以复用组件代码，可以使得js，html，css的引用关系明确。



### 1.创建组件的两种方式

```js
//1. 使用Vue.extend,传入options，生成一个 vuecomponent构造函数，然后将该构造函数传入new Vue中，Vue实例会自动帮我们调用vuecomponent构造函数
 var component = Vue.extend({
 //name :'ddd' 可以在Vue.exntnd中定义name指定组件在开发者工具中的名字
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
    )
     
//2.直接定义成对象，但是vue实例内部接收到组件对象时会自动调用Vue.extend方法
var component = {
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
```



### 2.组件的全局注册

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

### 3.局部注册

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

### 4.组件开发层级



通过new Vue()生成 Root节点，

new Vue中只有一个组件app,app内再放入所有其他组件

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359481.png?token=AP3MTU7OSXL7RWEA7OLNZXLBU4HYU" alt="image-20211114195055825" style="zoom:50%;" />



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359664.png?token=AP3MTUZVR26O7SN2UFCLW7TBU4HYW" alt="image-20211114194942520" style="zoom:50%;" />



### 5.组件中的this指向

组件中的 methods中的函数,computed中的函数,watch中的函数,data中的函数，它们的this都是指向vueComponent



new Vue中的 methods中的函数,computed中的函数,watch中的函数,data中的函数，它们的this都是指向Vue实例



因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。



### 6.Vue.prototype

VueComponent.prototype.__proto __=== Vue.prototype

为了让vue组件的实例对象可以访问的vue原型上的方法。



![image-20211115000542851](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359840.png?token=AP3MTUZ2GLUFRK22Q2A2A63BU4HY4)

### 7.Vue文件编写

1.Vue文件命名开头要大写 HelloWorld.vue

2.Vue内的style标签可以通过 scoped属性将样式作用范围限制到该Vue文件内。否则所有Vue文件的样式都会汇总到一个css文件，可能会重名。

3.可以通过安装less-loader来是的<style lang='less'>可执行。npm i less-loader@7  指定安装版本7，因为Vue@cli的webapck版本是4,只能用版本7,less版本8和9是为webpack5服务。



### 8.attributes

通常往一个组件上 添加 attribute可以分为两类，一类是 可以作为 prop的attribute(即自定义的 attribute),另一种是非prop的attribute(即标签内置的 attribute 如 id class style). 可以作为 prop的attribute。

后者的继承默认是继承在组件的根标签上的attribute中。如果不希望根标签继承 attribute ,可以在组件中设置 inheritAttrs:false,然后使用$attrs, 将attribute 绑定到要继承的标签上。

```vue
// header组件
<template>
<div>
	<h2 v-bind="$attrs ">
    </h2>    
</div>    
</template>

<script>
export default {
    inheritAttrs: false,
    props:{
        ....
    }
    ....
}
</script>
```

当组件时有多个根时，我们需要通过 $attrs 来指定要绑定到哪个根标签上。  

```vue
// header组件
<template>
<div v-bind = "$attrs">
	<h2>
    </h2>    
</div>
<div>
	<h2>
    </h2>    
</div>    
</template>

```



## 4.Vue@CLI

Vue脚手架创建的项目中：

页面在public/index.html中，创建了id为app的容器

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359617.png?token=AP3MTUYRZSJNRPHHIYGGI3DBU4HY6" alt="image-20211115015114854" style="zoom:50%;" />

在入口文件src/main.js中，通过调用render函数的参数,creatElement()函数，将收到的App.vue编译成真正的DOM后挂载到了app上。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359071.png?token=AP3MTU2NXEVQSZJMYWGCLRDBU4HZC" alt="image-20211115015210797" style="zoom:50%;" />

1.import Vue from 'vue' ，通过ES6module语法导入的Vue是 vue.runtime.esm.js，没有解析模板的功能.无法像直接导入vue.js那样在new Vue的过程中直接通过 template 指定模板让vue编译。

2.导入残缺版的vue是因为后续webapck打包文件时会将Vue文件解析成浏览器识别的文件，不需要用到Vue.js的解析模板的功能。所以使用残缺版减少打包后的文件体积。

```
	关于不同版本的Vue：
	
		1.vue.js与vue.runtime.xxx.js的区别：
				(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
				(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

		2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
			render函数接收到的createElement函数去指定具体内容。
```

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359523.png?token=AP3MTU2FZZ7P4HPWOSRV7X3BU4HZE" alt="image-20211115015628620" style="zoom: 50%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359881.png?token=AP3MTUZEYQKEBSJCZKLBKRDBU4HZI" alt="image-20211115015500029" style="zoom: 80%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359864.png?token=AP3MTU6OCJUUKENG5KJHUCTBU4HZM" alt="image-20211115015929613" style="zoom:50%;" />



### 1.vue.config.js

默认配置可以通过命令输出

vue inspect > output.js  



可以在package.json同层下添加vue.config.js 配置文件

[官方配置文档](https://cli.vuejs.org/zh/config/#pages)

```js
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
   
  }
}
```



### 2.Vue中的webpack版本等信息

默认是4.46，稳定。

![image-20211115150954884](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359503.png?token=AP3MTU73MLMPVNV5EIZ7NCLBU4HZU)



### 3.跨域解决

在开发情况下解决跨域，可以通过vue脚手架配置 webpack 自带的代理服务器。

端口号4000是真正服务器请求的端口地址。通过代理服务器请求8080端口。

代理服务器的根目录就是public目录。

缺点：只能配置一个服务器的代理服务器，public下有的静态资源会被默认加载出来，不会再向服务器发送请求。

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  },
  port:8080
}
```



配置代理的第二种方式：

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {       //将带有api的路径 替换成空 ，再访问url
        target: '<url>',
        pathRewrite: {'^/api1':''}
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```



### 4. NODE_ENV

首先介绍 **process.env**.  **process.env**是Node.js中的一个环境变量对象。vue-cli是由 webpack搭建的，而webapck是用node写的。

所以vue中可以访问到 process.env.

当使用  npm run serve 启动时 可以看到process.env的默认值是这样的。

![image-20211130221514735](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011359976.png?token=AP3MTU5XWVCELUB6IS2VVLDBU4HZY)

vue-cli有三种模式。如图。

![image-20211130221628922](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400416.png?token=AP3MTU3YAU4NYH5GDKXCIULBU4HZ6)

所以我们可以通过在 .env.development 和.env.production 文件中分别配置不同的路径，例如BASE_URL。



### 5.执行原理

10集 开始

![image-20211222002035570](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222002035570.png)



执行 vue-cli-service serve 时，会到 node_modultes/bin 下找 vue-cli-service, 而 该文件是个软链接，真实地址是在 node_modules\@vue\cli-service\bin\vue-cli-service.js  下，

![image-20211222002728304](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222002728304.png)

所以会到 node_modules\@vue\cli-service\package.json 文件夹下执行bin 命令

![image-20211222004143983](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222004143983.png)

然后执行  node_modules\@vue\cli-service\bin\vue-cli-service.js  文件

command 就是 service 或者 build

![image-20211222004706763](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211222004706763.png)



### 6.historyApiFallback

vue_cli 已经为 history路由模式的映射配置 webapck 的 devServer。

historyApiFallback:true

当history 路由模式下刷新页面时 devServer 找不到页面会默认返回 index.html 就是首页的页面



## 5.Vue组件自定义事件



1.props可以传入接收到父组件的数据或者**方法**，当是方法时可以通过方法修改父组件的数据。

2.可以通过**v-on监听组件**抛出的自定义事件，从而子组件向父组件传递信息。

3.也可以在父组件中的mouted函数内通过this.$ref获取子组件实例调用.$on或者.$once来注册监听事件

```js
	<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
	    <Student @atguigu="getStudentName" @demo="m1"/>

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
		<Student ref="student" @click.native="show"/>
            
         mounted() {
			this.$refs.student.$on('atguigu',this.getStudentName) //绑定自定义事件
			// this.$refs.student.$once('atguigu',this.getStudentName) //绑定自定义事件（一次性）
		},
```

其中， 如果是在组件上，则$refs.名称 为 VueComponent 实例。如果在普通标签上，则输出的是普通标签。

![image-20211224094738058](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211224094738058.png)



4.可以通过this.$ref.student.off()来解绑自定义事件

```js
mouted(){
 this.$ref.student.$on('myEvent',myfunciton)
}
```

5.当子组件实例实例被销毁时，或则vm实例被销毁时。子组件自定义的事件就会失效。但是原生事件仍然有效。

6.自定义事件的回调中的this.

```js
mounted() {
    //这样写getStudentName内的 this 是指向 父组件实例
    //推荐这么写
			this.$refs.student.$on('atguigu',this.getStudentName)
    //这样写 this是指向子组件实例 student
           this.$refs.student.$on('atguigu',function(){
               console.log(this)
           })
			}

```

7.在组件上设置监听事件vue都默认将这些事件看做自定义事件，即不是原生事件，要想在vue组件上监听原生事件就得加.native.这样vue就会在组件的模板的根元素上添加原生事件监听。

```js
<student @click.natve = "myAction" />
```



## 6.Vue中的动画

通过 <transition> 标签将要使用动画的一个元素包裹在内，如果是多个元素要使用动画，可以使用<transition-group>包裹多个标签，同时需要在每个标签上添加key.



Vue的动画有6个状态, v-enter-from ,v-leave-to:刚进入, v-enter-to v-leave-from:刚要退出。当使用transition过度效果实现动画时就要用到这四个属性。

1. `v-enter-from`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter-from` 被移除)，在过渡/动画完成之后移除。
4. `v-leave-from`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave-from` 被移除)，在过渡/动画完成之后移除。

![image-20211224214336852](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211224214336852.png)

### 1.过渡动画

实现案例

```vue
<template>
  <div>
    <transition name='title2'>
      <h2 v-show="isShow">nihao</h2>
    </transition>
    <button @click="btnClick">显示|消失</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isShow:true
    }
  },
  components:{
  },
  methods:{
    btnClick(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>

.title2-enter-from,.title2-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
.title2-leave-from,.title2-enter-to {
  transform: translateX(0px);
  opacity: 1;
}
.title2-enter-active,.title2-leave-active {
  transition: all  2s ease;
}

</style>
```

实现原理：

当插入或删除包含在 transition 组件中的元素时，Vue会做以下处理：

1.自动嗅探目标元素是否使用了css过渡或者动画，如果有，那么在恰当的时机添加，删除 css 类名。

2.如果 transition 组件提供了 javaScript 钩子函数，这些钩子函数将在恰当的时机被调用。

![GIF2](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF2.gif)



![image-20211224221113919](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211224221113919.png)



![image-20211224220934406](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211224220934406.png)



### 2.关键帧动画 animation

但是我们直接使用 anmation 去指定动画 ，只使用另外两个属性就可: v-enter-active ,v-leave-active.

![image-20211224214336852](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211224214336852.png)

案例一

```vue
<template>
  <div>
    <!-- animation 动画 -->
    <button @click="btnClick">显示|消失</button>
    <transition name='title2'>
      <h2 v-show="isShow">nihao</h2>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      isShow:true
    }
  },
  components:{
  },
  methods:{
    btnClick(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>


.title2-enter-active {
  animation: bounce 1s ease;
}
.title2-leave-active {
  animation: bounce 1s ease reverse;
}


@keyframes bounce{
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

![GIF3](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF3.gif)

案例二

```js
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
```

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400016.png?token=AP3MTU6QVS2PPJRCLYWAIPDBU4H2M" alt="image-20211116150200322" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400483.png?token=AP3MTU2JY7DCYCTK5V75WQDBU4H2Q" alt="image-20211116150149154" style="zoom:50%;" />

### 3.transition标签额外属性

#### 1.mode

<transition>标签除了 name属性，比较常用的还有 mode属性。当标签内有两个以上的元素要切换时，一个会执行消失动画，一个会执行显示动画，默认情况下是两个元素同时执行的，如下面图一所示。然而如果把这些标签替换成组件的话，这样的显示就会看起来很乱。当我们使用动态组件，或者使用路由的时候，来回切换组件时，我们不希望切换的两个组件之间的消失和显示动画一起执行，而是先让当前组件先消失，切换到目标组件再出现。如下面的图二所示。

![GIF - 副本](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF%20-%20%E5%89%AF%E6%9C%AC.gif)

​								----------------------------------------------------------------分割线-----------------------------------------------------------

![GIF4](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF4.gif)

代码如下

```vue
<template>
  <div>
    <button @click="btnClick">显示|消失</button>
    <transition name='title2' >
      <h2 v-if="isShow">nihao2</h2>
      <h2 v-else>hello1</h2>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      isShow:true
    }
  },
  components:{
  },
  methods:{
    btnClick(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>

.title2-enter-from,.title2-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
.title2-leave-from,.title2-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.title2-enter-active,.title2-leave-active {
  transition: all  2s ease;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

而 <transition>标签上的 mode属性可以指定 哪一个动画（显示或者消失）先执行。

mode: out-in  先执行消失动画，再执行进入动画

​			in-out  先执行进入动画，再执行消失动画

这是 out-in 

![GIF4](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF4.gif)

这是 in-out

![GIF5](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF5.gif)

#### 2. appear

当我们希望第一次加载页面时就能显示动画，就可以 加上 appear标签。

![GIF6](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF6.gif)



#### 3.动画attribute

![image-20211225104901392](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225104901392.png)

![image-20211225104831661](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225104831661.png)



### 4.animate.css

1.导入 nm install animate.css 

2.在 main.js 导入 import './animate.css'

3.在 enter-active 和 leave-active 类上分别添加相反的 animation 动画

[animate.css官网](https://animate.style/) ，可以找到动画名称和效果

```css
.title2-enter-active {
  animation: backInDown  0.5s ease;
}
.title2-leave-active{
  animation: backInDown  0.5s ease reverse;
}
```

4.当使用<transition>标签上的attribute指定动画时，需要添加 **animate__animated**，这时一个基础样式。

![image-20211225104831661](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225104831661.png)

查看源代码可以看到，animated实现了 animation 的 时间间隔等的设置。

![image-20211225105813882](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225105813882.png)

### 5.gsap

某些情况下我们希望通过js来完成动画。可以使用 gsap 库。     

#### 1.transition的js钩子

![image-20211225112728935](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225112728935.png)



2.安装 gasp. npm install gasp 

3.在使用的 js 代码中 导入 import 'gsap'

4.一般都是在 enter 和 after中使用 gsap

![image-20211225112934901](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225112934901.png)



5.案例

![GIF7](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF7.gif)

```vue
<template>
  <div>
    <input type="number" step="100" v-model="counter">
    <h2>当前的number为 {{ showNumber.toFixed(0) }}</h2>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'App',
  data(){
    return {
      isShow:true,
      counter:0,
      showNumber:0
    }
  },
  components:{
  },
  watch:{
    counter(newValue){
      gsap.to(this,{ duration:1,showNumber: newValue});
    }
  },
  methods:{
    btnClick(){
      console.log(this.isShow)
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>

.title2-enter-active {
  animation: backInDown  0.5s ease;
}
.title2-leave-active{
  animation: backInDown  0.5s ease reverse;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



### 6.transition-group

当要使用列表（即多个元素）动画时，就得使用 transition-group.可以通过 tag 来声明 将 <transition-group> 替换成某个元素。

![image-20211225135936264](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225135936264.png)

当元素为块级元素时，无法显示完整动画，要显示动画效果的话，要display:inline-block

![GIF8](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF8.gif)

```vue
<template>
  <div>
      <div>
      <button @click="addNum">添加数字</button>
      <button @click="deleteNum">删除数字</button>
      </div>
      <transition-group name="dong" tag='p'>
        <span v-for="(item,index) in arr" :key='index' style="margin:10px;display:inline-block">{{item}}</span>
      </transition-group>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'App',
  data(){
    return {
      arr:[1,2,3,4,5],
      nowCount:5
    }
  },
  components:{
  },
  watch:{
    counter(newValue){
      gsap.to(this,{ duration:1,showNumber: newValue});
    }
  },
  methods:{
    addNum(){
      const random = (Math.random()*this.arr.length).toFixed(0)
      this.arr.splice(random,0,++this.nowCount)
    },
    deleteNum(){
      this.arr.splice(this.arr.length-1,1)
    }
  }
}

</script>

<style>

.dong-enter-from,.dong-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
.dong-enter-to,.dong-leave-from{
  opacity: 1;
}
.dong-enter-active,.dong-leave-active {
  transition: all 1s ease;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

进一步完善案例一：案例一中只有 新加入的元素有动画。

![image-20211225140423426](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225140423426.png)

所以只要加上这一项就会有动画,vue内部会自动帮我们完成 transform 的动画

```css
.dong-move {
  transition: transform 1s ease;
}
```

但是只有在加入新元素时，其他元素才有动画效果，删除时还是很生硬地瞬间移动。这是因为在原有元素被删除的动画执行的过程中，元素仍然占有位置，所以其他元素无法执行动画。

![GIF9](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF9.gif)



我们可以将要离开的元素声明，相对定位让其占有的空间释放，这样其他元素就能执行动画了。

```css
.dong-leave-active {
  position: absolute;
}
```

![GIF10](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF10.gif)

## 7.常用请求库 

[请求头content-type格式好文](https://blog.csdn.net/baichoufei90/article/details/84030479)

### 1.axios

```js
import axios from 'axios'

axios({
    url:'https://some-domain.com/api/',
    method:'post',//默认
     headers: { //请求头
          'Content-Type': 'application/json'  //默认值
    },
    params:{
      name:'xiaoming'   //请求参数
      age:12
    },
    data:{//请求体
       
    }
})

export default myAxios;
```

| 值                                | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。 |
| application/json                  | 作为请求头告诉服务端**消息主体是序列化的JSON字符串**。除低版本的IE，基本都支持。 |
| text/plain                        | 空格转换为 “+” 加号，但不对特殊字符编码。                    |



有时候后端要求Content-Type必须以application/x-www-form-urlencoded形式，那么通过上面传递的参数，后端是收不到的，我们必须对参数数据进行所谓的序列化处理才行，让它以普通表单形式(键值对)发送到后端，而不是json形式.

通过 `headers` 来指定Content-Type的形式，对于 `transformRequest` 就是允许在向服务器发送前，修改请求数据，但只能用在 'PUT'，'POST' 和 'PATCH' 这几个请求方法，且后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream，更多的还有 `transformResponse` 能在传递给 then/catch 前，允许修改响应数据，

```js
import myAxios from './axios';

export function loginAPI(paramsList) {
  return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ],
  });
}

```



### 2.封装axios

1.通过process.env环境变量对象来指定 axios 中的 baseUrl，对于不同模式（开发，生成，测试）下发送请求到不同的url。

2.通过 timeout 字段设置请求超时时间

3.通过withCredentials: true设置允许携带cookies

4.通过methods指定请求方法，params指定请求参数，data指定请求体数据

5.通过headers设置请求头 content-type等。'application/json; charset=utf-8' 'application/x-www-form-urlencoded; charset=utf-8' 'multipart/form-data'



### 3.`axios`取消原理

```js
 const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/get/server', {
  cancelToken: source.token
}).catch(function (err) {
  if (axios.isCancel(err)) {
    console.log('Request canceled', err.message);
  } else {
    // handle error
  }
});

// cancel the request (the message parameter is optional)
// 取消函数。
source.cancel('哎呀，我被若川取消了');



// source.cancel('哎呀，我被若川取消了');
// 点击取消时才会 生成 cancelToken 实例对象。
// 点击取消后，会生成原因，看懂了这段在看之后的源码，可能就好理解了。
var config = {
  name: '若川',
  // 这里简化了
  cancelToken: {
        promise: new Promise(function(resolve){
            resolve({ message: '哎呀，我被若川取消了'})
        }),
        reason: { message: '哎呀，我被若川取消了' }
  },
};
```

`axios`取消原理是：通过传递 `config` 配置 `cancelToken` 的形式，来取消的。判断有传`cancelToken`，在 `promise` 链式调用的 `dispatchRequest` 抛出错误，在 `adapter` 中 `request.abort()` 取消请求，使 `promise` 走向 `rejected`，被用户捕获取消信息。

## 







## 9.响应式原理（数据绑定实现原理）

### 0.数据的双向绑定

vue中数据的双向绑定指的是 视图变化触发数据更新，数据更新触发视图变化。其中视图变化触发数据更新依靠的是事件监听，而数据更新触发视图变化依靠的是响应式数据。vue内部通过数据劫持和发布订阅模式来实习响应式数据，具体如下。。。。

**MVVM**

Model  View  ViewModel

`Model-View-ViewModel` ，` Model` 表示数据模型层。` view` 表示视图层，` ViewModel` 是` View` 和` Model` 层的桥梁。视图变化触发模型修改，用到的时**事件监听**。模型变化触发视图变化，用到的是**数据绑定**。

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



[好文](https://juejin.cn/post/6844903903822086151#heading-1)

**数据劫持+观察者模式**

`第一种说法： Object.defineProperty` 重新定义` data` 中所有的属性，` Object.defineProperty` 可以使数据的获取与设置增加一个拦截的功能，**拦截属性的获取，进行依赖收集。拦截属性的更新操作，进行通知。**

第二种说法：对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。



第三种说法：每当new一个vue实例时，内部通过initData初始化数据，然后调用Observer对数据进行观察。如果数据是对象类型，就会通过遍历对象属性分别调用defineReactive方法。在defineReactive先生成一个dep订阅器实例，然后调用Object.defineProperty()来拦截数据,添加set和get分别对获取数据设置数据进行拦截。当vue内部解析模板数据时，会初始化相应的订阅者实例watcher，订阅者实例watcher有相应的更新视图的函数，watcher会访问相应的数据触发get拦截，在get拦截内watcher被添加到dep订阅器实例中。当设置数据时，触发相应的set拦截，依赖收集器通知相应的订阅者对象实例watcher去进行相应的更新操作等（重新渲染dom等）。

Observer（观察者）：Observer观查传入的data对象。遍历data对象并通过defineProperty(obj,key,{get，set})去拦截每个数据的获取与设置

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400959.png?token=AP3MTU25FWZNRK37KG774WDBU4H24" alt="image-20211017212021275" style="zoom: 67%;" />

### 1.Vue.set()

Vue 不允许动态添加根级别的响应式 property。所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值：

```js
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

//Vue 不允许动态添加根级别的响应式 property。
vm.b = 2
vm._data.b = 2
// `vm.b` 是非响应式的
```



#### 1.对于对象



但是，对于已经创建的实例，可以使用 `Vue.set(object, propertyName, value)` 方法向**data内的对象**添加响应式 property。

例如，对于：

```js
Vue.set(vm.someObject, 'b', 2)
Vue.set(vm._data.someObject, 'b', 2)
```

还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```js
//this 可以是在方法内
this.$set(this.someObject,'b',2)
```



#### 2.对于数组

Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的

//vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新：
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

vm.$set(vm.items, indexOfItem, newValue)

//这样可以过滤掉c
vm.items = vm.items.filter(item=>item!='c')
```





## 10.为什么 data 是一个函数

组件中的data写成函数，数据以函数返回形式获取。这样每次**复用**一个组件时，都会获取到一份新的data.实现各自数据的独立。如果data是用对象写的话，所有的组件实例就会共用一个data对象。



## 11.vue组件通讯的方式



1.props 和 $emit. 子组件通过props接收父组件传递的数据，然后$emit触发事件向父组件传递数据。 $emit(eventName,[...args])

2.通过$parent和$children获取当前组件的父组件和组件

3.VueX状态管理。

4.父组件中通过**$ref**获取获取**子组件实例**的方法和属性。$ref是一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

5.事件总线 Event Bus.通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和注册监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

通过 组件通过 $on 订阅事件名以及事件的回调，通过$emit发布事件并携带相关参数。一般是$emit传递出数据。

当子组件要改变父组件的值是可以在父组件中 $on 订阅事事件名，在回调中改变父组件的值。子组件通过$emit 发布事件并携带数据传入回调函数中。

两种方式添加事件总线：

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400073.png?token=AP3MTU6Q54BYEJ5MDLDJS7TBU4H3G" alt="image-20211115220810491" style="zoom:50%;" />



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400057.png?token=AP3MTUZRQUVXKGKUPMNWN53BU4H3I" alt="image-20211115224022809" style="zoom: 67%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400543.png?token=AP3MTU6QFNUUOHLUACEX3DTBU4H3K" alt="image-20211115220840076" style="zoom:50%;" />

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211115220848825.png" alt="image-20211115220848825" style="zoom:50%;" />

在组件中通过$on 注册事件，在组件销毁时 beforeDestroy()调用$off 来 取消事件注册。

![image-20211115222139776](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400263.png?token=AP3MTU56AA7IJBKWFRLCSALBU4H3S)



## 12.Vue的生命周期

vue的生命周期是 指 vue 实例的创建，初始化数据，编译模板，渲染,挂载Dom,更新,渲染，卸载的一系列过程。

1. new Vue 实后，初始化了一个空的Vue对象，该对象内只有一些默认的生命周期函数和默认事件。

   2.beforeCreate()：vue实例刚创建，data和methods都未初始化，还不能使用

   3.进行数据代理和数据劫持。将data数据代理到vm上。通过Obesever对象对data进行数据拦截，实现数据的响应式

   4.created():vue实例已完全创建。data和methods可以使用。

   6.vue开始编译模板，生成虚拟dom到内存当中。

   5.beforeMount:此时模板已经被渲染到内存当中，但未挂载到页面上

   6.将内存中的虚拟dom转换为真实的dom挂载页面

   7.mounted:模板挂载到页面上,如果操作dom,最早只能再mounted阶段 

   8.beforeUpadte:数据更新完成时调用，但是视图还未更新。可以在这个时候对进一步修改数据，不会触发重新渲染

   9.将新旧虚拟dom进行对比，然后更新到真实dom。

  10.updated:Dom已经完成了跟新。这个不能再更新数据。因为可能导致无限循环跟新。

  11.调用$destory函数，完全销毁vm实例，清除它与其他实例的连接，解绑它的全部自定义事件监听器和全部指令。

  12.**beforeDestroy**： 实例销毁之前调用。在这一步，实例仍然完全可用。在这时会进行善后收尾工作，比如清除计时器。

  13.**destroy**：Vue 实例销毁后调用。

**vue实例销毁后自定义事件会失效，但是原生dom事件依然有效。**

**activated** keep-alive 专属，组件被激活时调用。 因为使用 keep-alive 后的组件在切换的过程中不会触发其他生命周期钩子函数，但是我们确实希望监听到 进入组件和离开组件的时机。 所以有了这两个生命周期钩子函数。

**deactivated** keep-alive 专属，组件被销毁时调用

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400752.png?token=AP3MTU5PNC75XJSHRGHK2DDBU4H34" alt="16ca74f183827f46_tplv-t2oaga2asx-watermark (1)" style="zoom:200%;" />

异步请求在哪一步发起？

可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面  loading 时间；
- ssr  不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；



- 请问`methods`内的方法可以使用箭头函数么，会造成什么样的结果？

是不可以使用箭头函数的，因为箭头函数的`this`是定义时就绑定的。在`vue`的内部，`methods`内每个方法的上下文是当前的`vm`组件实例，`methods[key].bind(vm)`，而如果使用使用箭头函数，函数的上下文就变成了父级的上下文，也就是`undefined`了，结果就是通过`undefined`访问任何变量都会报错。



## 13.v-if 和 v-show 的区别

v-if:是**“真正”的条件渲染**，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被**销毁**和**重建**。而且是惰性的，如果初始化渲染时条件值为假。则不什么也不做。直到为真时才渲染条件块。

v-show :下的元素始终都会被渲染。并且只是简单css切换。



v-if有着更高的切换开销，v-show有着较高的初始化渲染开销。

如果需要频繁地切换，则应使用v-show.

如果运行时条件很少改变，则使用v-if.



当v-if指令附属于普通元素时，v-if指令状态变化会使得父组件的dom发生变化，父组件将会更新视图，所以会触发父组件的beforeUpdate和updated钩子函数。

当v-if指令令附属于组件时，v-if指令状态变化对父组件的影响和上一条一致，但是对于本身组件的生命周期的影响是不一样的。

1. v-if从false切换到true时，会触发beforeCreate，created，beforeMount，mounted钩子。 2.v-if从true切换到false时，会触发beforeDestroy和destroyed钩子函数。



```vue
// v-if 可以 搭配 tmeplate使用
// template标签不会被渲染出来，可以减少v-if上的标签

<template>
<template v-if="isShow">
 ......
</template>

<template v-else>
.....
</template>

</template>
```







## 14.V-model 

**单项数据流的过程，传入给子组件的值只能通过父元素来修改。**

v-model就是语法糖。内部是不同类型的输入元素绑定不同的property 和监听不同事件。

例如 input  type 为 text 时 绑定的时 value和监听input事件。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040101788.png" alt="image-20211204005358414" style="zoom: 80%;" />

常见的表单元素

1.**input**元素常用有4种：text文本框,checkbox复选框，ridio单选按钮，submit提交按钮。

2.**textarea** 元素

3.**select** 元素

text文本框 **textarea**文本域 输入时 会触发 input 事件

checkbox复选框， 点击复选框会触发 **change** 事件，改变 元素的 checked 值。复选框可以为一个也可以为一组。

![image-20211204010713582](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040150255.png)

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040127555.png" alt="image-20211204012732236" style="zoom:80%;" />

ridio 单选按钮通过name指定同一组单选按钮，也是点击复选框会触发 **change** 事件，改变 元素的 checked 值。单选按钮必须为一个以上。

![image-20211204013638059](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040150008.png)

select元素默认触发的时 change事件 ，改变 value 值获取的时option上的value.

![image-20211204014846074](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040150796.png)

![image-20211204015017926](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040150937.png)

### 1.基础

若<input type='text'>,v-model绑定的是value，是输入的值。

若<input type='radio'>,v-model绑定的是value，要给value指定值

![image-20211114131325660](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400337.png?token=AP3MTU3EXNAZYJNOJ2YDF23BU4H4G)

若<input type='checkbok'>,如何没有配置value,那么v-model收集的是checked（布尔值）,**而且v-model绑定的值只能在一个checkbox上**。

​                                                          如果配置了value,那么v-model收集的是value.且v-model绑定的应该是一个数组	

**单个复选框，绑定到布尔值。多个复选框，绑定到同一个数组：**

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400608.png?token=AP3MTUYCQZHLJGOPBYNXJSTBU4H4K" alt="image-20211114174035803" style="zoom:67%;" />

v-model的三个修饰符.  .trim 去除首尾空格, number：输入的只能是数字，lazy:失去焦点时再收集



**select** 单选时绑定字符串,多选时绑定数组。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112040152829.png" alt="image-20211204015221546" style="zoom: 80%;" />





### 2.**将V-model绑定到组件上时，组件内部应该如何封装？**

一个组件上的 `v-model` **默认会利用名为 `value` 的 prop 和名为 `input` 的事件**，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

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





## 15.vue的内置命令



1.v-bind

2.v-model

3.v-on

```js
// v-on 和 v-bind 的语法糖
// 当绑定的属性和监听的事件多时，可以使用对象

<div v-bind="{name: MyName , age: MyAge}" >
</div>

<div v-on={click:clickEvent , mousemove: mouseMove}>
</div>

```



4.v-if v-else

5.v-show

6.v-for  列表渲染



7.v-text:与插值语法类型,但是只将插入的内容当做文本插入，不会当作节点插入。插值语法插入的值可以被当作节点。

```html
<div v-text='str'></div>
<div> {{ str }}}<div>

str = '<div>你好</div>';
```

8.v-html：与插值语法类型，会当作节点插入。

9.v-cloak:在vue实例创建完成后就会删除该属性，可以通过该属性配合css样式解决网速慢出现插值语法{{}}的问题。

10.v-once所在的节点在初次动态渲染后就视为静态内容，后续数据改变不修改该节点的视图。

11.v-pre可以跳过指定节点的编译过程



## 16.怎样理解 Vue 的单向数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

父组件通过props传递的数据如果发生改变时，子组件接收到数据也会发生改变，视图也会发生响应式变化





## 17.v-if 与 v-for 为什么不建议一起使用

v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。





## 18. computed 和 watch 

1.原理：使用了发布订阅者模式。 computed内部初始化时会每个computed属性初始化一个 computed watcher,computed watcher内有一个dep发布者实例。当render函数执行时调用了computed属性的get,就会将此时的渲染watcher添加到dep发布者 实例中，即渲染watcher订阅了computed watcher的变化，当computed wather 更新时就会通过dep发布者实例去通知渲染wathcer去跟新。

watch原理：也是使用发布订阅模式。watch内部会为每个watch属性初始化一个 user Watcher,将相应的handler函数传入watcher的回调函数中。当数据变化时，dep就会触发watcher去重新执行回调函数。



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

## 19.v-for 为什么要加 key

key作为列表渲染中元素的唯一标识，可以在列表更新的时候更好地复用旧的元素，提高列表渲染的效率。

key属性可以用来提升v-for渲染的效率！，vue不会去改变原有的元素和数据，而是创建新的元素然后把新的数据渲染进去

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速.



## 20. 虚拟 DOM 是什么 （模板编译）

Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

DOM变为虚拟dom的过程即是模板编译。

 ![image-20211227000818847](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211227000818847.png)

![image-20211227001001232](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211227001001232.png)



## 21.vue-router 

路由：route,就是一组key，value的对应关系

vue 中的route 就是  key 和 组件的映射

### 0.history和hash

本质上都是通过监听事件来根据不同的路径重新渲染组件且不让浏览器因为路径改变而重新发送请求。

hash原理

通过在#号后面拼接路径。当井号 `#` 后面的路径发生变化时，浏览器并不会因为路径的改变重新发起请求，而是会触发 `onhashchange` 事件。

vue-router 通过监听 hashchange 事件来对 通过location.hash 获取路径值并重新渲染组件

```html
 <div id="app">
        <a href="#/home">home</a>
        <a href="#/about">about</a>
        <div class="content"></div>
    </div>
    <script>
        const contentEl = document.querySelector('.content');
        window.addEventListener('hashchange',()=>{
            switch(location.hash){
                case '#/home':
                    contentEl.innerHTML = 'Home';
                    break;
                case '#/about':
                    contentEl.innerHTML = 'About';
                    break;
                default:
                    contentEl.innerHTML = 'Default'
            }
        })
    </script>
```

history原理

通过使用H5的新特性 history API, 修改浏览器URL并且不发送请求。vue-router内部通过监听<router-link>的点击事件后通过 location.href 来获取 url然后重新渲染组件。

```html
<body>
    <div id="app">
        <a href="/home">home</a>
        <a href="/about">about</a>
        <div class="container">
        </div>
    </div>
    <script>
        const linkList = document.getElementsByTagName('a');
        console.log(linkList);
        const container = document.querySelector('.container')
        const changeContent = ()=>{
            switch(location.pathname){
                    case '/home':
                        container.innerHTML ="Home";
                        break;
                    case '/about':
                        container.innerHTML = 'About';
                        break;
                    default:
                        container.innerHTML = "Default"
                        break;
                }
        }
        for (const link of linkList) {
            link.addEventListener("click",e=>{
                console.log("object");
                e.preventDefault();
                const href = link.getAttribute('href');
                // 往 history 栈里 压入记录
                history.pushState({},'',href)
                changeContent();
            })
        }
        // 监听popstate，如果不监听，用户点击记录后退时无效
        window.addEventListener("popstate",changeContent)

    </script>
</body>
```



### 0.1 router插件

#### 1.版本

router 目前(2021/12/29)最新的版本是4, 在vue2中使用的大多是 3.

​	使用 npm install vue-router 安装的路由默认也是 3.

​	指定安装版本4: npm install vue-router@4

#### 2.插件内的组件

vue-router插件内包含的常用组件：<router-link>  <router-view>

<router-link> 常用属性有 

​		 **to**='/home',跳转地址，不赘述

​		 **replace**属性（history栈内的栈顶记录被替换）,

​		 **active-class**:指定当链接<a>激活时的样式属性名,m默认是router-link-active 。

​		 				   假设当前路径是 /home/user 时， /home 映射的组件和/home/user映射的嵌套组件都有 router-link-active 属性。

​							并且  /home 映射的组件没有 router-link-exact-active，/home/user映射的嵌套组件有 router-link-exact-active属性。

​		 当链接激活时的默认的样式属性名如下图。

![GIF11](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/GIF11.gif)

```html
// 指定active-class 效果如下图 
<router-link to="/home"  active-class="dong-active">home |</router-link>
  <router-link to="/about" active-class="dong-active"> about</router-link>
```

![image-20211229172948461](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211229172948461.png)

​		**exact-active-class:**只有链接精准激活时，应用于<a>的class,默认是 router-link-exact-active。



#### 3.vue-router 3和4

**vue-router3** 中  <router-link> 可以通过 tag 属性来指定<router-link>转为哪一种标签。

```html
<router-link to='home' tag='button'/>
```



**vue-router4** 中 <router-link>  新增了插槽，删除了 tag. router-link 默认是一个<a>标签，<router-link>标签内的内容会被包裹在<a>标签内，但通过 cusom 可以删除该<a>标签，只显示插槽内的元素，但是需要给插槽内的元素添加跳转操作。可以通过作用域插槽的 navigate函数来进行跳转。

可以直接通过插槽插入更多 自定义的元素。还可以通过**作用域插槽**获取数据。

```html
<!-- props: href 跳转的链接-->
<!-- props: route对象-->
<!-- props: navigate导航函数-->
<!-- props: isActive 是否当前处于活跃状态-->
<!-- props: isExactActive 是否当前处于精确的活跃状态-->
<router-link to='/home' v-slot='props' custom>
	<button @click="props.navigate">{{props.href}}</button>
</router>
```



**vue-router4**中 <router-view>也新增了作用域插槽。可以获取映射到的组件。可以通过获取到组件后进行 动画 或者 缓存。

还可以获取到 route，示例中未展示出来。

```html
<router-view v-slot='props'>
	<transition name="why">
    	<keep-alive>
            <!-- .Component 可以获取到组件实例-->
        	<component :is='props.Component'></component>
        </keep-alive>
    </transition>
</router-view>
```



### 1.Router和Route的区别

**Router(路由器对象)**是VueRouter的一个对象，一个单页面应用程序一般有一个router对象，里面包含了routes对象（组件和路径的映射关系）和其他的配置。我们在new Vue()生成根实例时将Router实例注入进去。只要注入进去后，后续在使用都可以通过vue组件实例来获取Router对象：**this.$router**

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400559.png?token=AP3MTU6VNMARBCEWY6VFRQDBU4H5A" alt="image-20211024215848663" style="zoom: 67%;" />

**$router.push({path:'home'})**;本质是向history栈中添加一个路由，在我们看来是 切换路由，但本质是在添加一个history记录

**$router.replace({path:'home'})**;//替换路由，没有历史记录

**Route(路由)是路由对象 ，是  路径和 组件的映射。**

![image-20211229202156090](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211229202156090.png)

#### 1.route对象的属性

```js
    {
        path:'/home',
        // component:Home
        component:()=>{
            return import(/*webpackChunkName: "home-chunk"*/'../components/Home')
        },
        name:'home',
        meta{  // 路由源信息
            time:30,
            role:'admin'
        }
    },
```

#### 2.默认路由

```js
{
        path:'/:pathMatch(.*)',
        component: () => {
            return import("../pages/Home")
        }
}
```



#### 3.vue3中获取 route 和 router对象

```js
import { useRoute, useRouter } from 'vue-router'

export default {
	setup(){
		const route = useRoute() // 获取当前组件的 route 对象
        const router = useRouter()
	}	
}
```







### 2.路由的映射方式：

1.<router-link to:name>：转换成a标签切换组件。可以指定 **active-class** 指定样式

2.编程式导航，通过按钮也可以切换组件。



### 3.常见规则

1.通过 <router-view>指定组件视图的显示位置。

2.route映射的组件通常放在 /src/views下，普通组件时放在/src/components/下

3.通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。

4.每个组件都有自己的```$route```属性，里面存储着自己的路由信息。

5.整个应用只有一个router，可以通过组件的```$router```属性获取到。



### 4.嵌套路由

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 5.query和params

![image-20211118112421924](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011400096.png?token=AP3MTU4Q7GIEC2BBAC2TG6LBU4H5I)

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

### 6命名路由

简化路径参数

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

3.其他API

```js
router.replace('/about')
router.go(-1);
router.go(1);
```



### 9.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：通过include指定要缓存的组件名称。多个可以写成数组。

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

### 10.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。



### 11.动态路由是什么

把某种模式匹配到的所有路由，全都映射到同个组件。

```javascript
 routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
  
  // this.$route.params : {id:xxxx}
 //  this.$route.query
```

![image-20211229202156090](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211229202156090.png)

注意：当使用动态路由时，路径从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，组件的beforeUpdate 和Updated 生命周期钩子函数会被调用**。

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







### 12.路由懒加载

使用 import() 语法。如下：

```js
  {
        path:'/home',
        // component:Home
        component:()=>{
            // 魔法注释
            return import(/*webpackChunkName: "home-chunk"*/'../components/Home')
        }
    },
    {
        path:'/about',
        // component:About
        component:()=>{
            // 魔法注释
            return import(/*webpackChunkName: "about-chunk"*/'../components/About')
        }
    }
```

使用懒加载后 webpack 进行打包时会将要懒加载的组件单独打包成一个文件，单独文件的命名可以在 import() 内 通过注释来实现。

上面代码打包后如下

![image-20211229190210411](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211229190210411.png)



### 13动态操作路由

#### 1.动态添加路由

通过 router.addRoute() 添加 **一条** 路由记录到现有的路由器内。

addRoute({ ... } )默认将路由添加到顶层路由组中，也可以通过第一个参数指定父路由的名称添加到指定的路由的子路由中。

addRoute(parent,{...})

```js
router.addRoute({
	path:'/order',
    component:() => import(...)
})


router.addRoute('orderFather',{
	path:'/order',
    component:() => import(...)
})
```

#### 2.动态删除路由

三种方式

```js
//1
router.addRoute({
    path:'/about', name:'about', component: About
})
router.addRoute({
    path:'/about', name:'about', component: Home
}) //直接覆盖
//2
router.addRoute({
    path:'/about', name:'about', component: About
})
router.removeRoute('about')
//3 通过回调函数删除路由
const removeRoute = router.addRoute({
    path:'/about', name:'about', component: About
})
removeRoute();
```

### 14路由导航守卫

#### 1.导航守卫

导航守卫可以通过跳转或者取消的方式的守卫导航，本质上就是路由跳转过程中的钩子函数，而且这些钩子函数还能改变跳转的结果，可以确认正确跳转，取消跳转，或者跳转到其他的路径。

导航守卫有三种 :全局（前置|解析）守卫 :beforeEach(),beforeResolve(), 全局后置钩子(不算守卫，不会改变导航结果) afterEach

​							 路由独享守卫 beforeEnter 守卫

​							 组件内的守卫：beforeRouteEnter beforeRouteUpdate,beforeRouteLeave



1. 导航被触发。

2. 在失活的组件里调用 `beforeRouteLeave` 守卫。

3. 调用全局的 `beforeEach` 守卫。

4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。

5. 在路由配置里调用 `beforeEnter`。

6. 解析异步路由组件。

7. 在被激活的组件里调用 `beforeRouteEnter`。

8. 调用全局的 `beforeResolve` 守卫(2.5+)。

9. 导航被确认。

10. 调用全局的 `afterEach` 钩子。

11. 触发 DOM 更新。

12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

    

#### 2.全局前置守卫

```js
router.beforeEach（(to,from)=>{
// 可以返回4种值
// fasle 取消导航
// string 重定向路径
// obj  携带query或parms的重定向路径
// true 或 undefined 确认导航，调用下一个守卫
}）
```

守卫传入的函数都是上面的形式，第一个参数是 目的路由（route）, 第二个是 起始路由（route), 第三个参数 next,现在不建议使用。vue2中通过 next 确认导航，但是经常被调用多次导致出错， vue3直接通过返回值来确认导航。

守卫的返回值都可以是以上的4种值。





## 22Vuex

Vuex是Vue中一个集中式状态管理的插件，将组件的内部状态抽离出来，以一个全局单例的方式管理。状态的修改可以被 devtools开发者插件观测到。这样数据的修改就可以被查看到。

多个组件的共享状态进行集中式管理，也是通信的一种方式，适用于任何组件间的通信。

![image-20211230235538072](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211230235538072.png)

### 1.什么时候使用Vuex? 

多个组件共享同一状态，不同组件的行为需要改变同一状态。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401241.png?token=AP3MTU736P7XCRYZ62W4PUDBU4H5Y" alt="image-20211117150030193" style="zoom:67%;" />

### 2.如何使用？

在 new  Vue({}) ,生成根组件实例的时候在options对象内传入配置选项**store**.然后Vue实例和VueComponent实例上都能访问的$store实例。

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401032.png?token=AP3MTU55O43IYRJ3F7OLSB3BU4H56" alt="image-20211117163117350" style="zoom:80%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401712.png?token=AP3MTU36EWRQ3F7VMISOJFLBU4H6K" alt="image-20211117163252920" style="zoom:80%;" />



 简写方式：

我们应该清晰地认识到，state 和 getters 是以**函数**的形式 映射到了 computed中，函数的返回值是state,而getter本身就是函数，所以应该是自身映射到了computed中。而mutation和action不是直接映射到methods中，如果mutation和action是直接映射到方法，那我们调用方法岂不是直接调用了 mutation 和 actions 函数，没有通过 $store.commit 和 $store.dispatch。 这是不对的，正确的想法应该是mutation和action是映射到方法中被包裹了一层函数，函数帮我们调用了 commit 和 dispatch.

![image-20211117174832400](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401056.png?token=AP3MTUZJGR3ZSI6V3JQCQ5DBU4H6W)

```js
// 还可以使用对象形式来更改名称
import { mapState， mapGetters } from 'vuex';

export default{
    computed: {
        ...mapState{
        // 写成函数形式
        	mySum: state => state.sum,
        	mySchool: state=> state.school
    	}，
    	...mapGetters({
    	// Getter 不用写成函数形式
    		myPrice:'price'
		})
    }
}
```

### 2.5 action

![image-20220103215944942](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220103215944942.png)



context对象包含的参数

![image-20220103221123334](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220103221123334.png)

#### 1.返回值

在组件中调用 action 操作后，如果想要 VueX 的action的异步请求完成时 通知回组件，我们可以这样操作：

​     在action中返回一个promise, 在组件中调用action时，接收返回值promsie，通过promise的链式调用去处理异步请求结果。

```js
// store.js
actions {
    getSomethingAction(context){
        return new Promise((reslove,reject) => {
            axios({
                ... //相应配置
            }).then((res)=>{
                // 提交相应的 commit 改变 state
                context.commit(...)
                resolve(value)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

// component.js

...
methods:{
    doAction(){
        const promise = this.$store.dispatch('getSomethingAction');
        promise.then(...) // 根据action返回的promise状态及value 进行操作
    }
}
...

```



### 3.module

由于vuex使用单一状态树，所有的共享数据都放到了store中会显得非常臃肿，所以vuex允许使用模块来对sotre进行分割，每个模块都有各自的 state,gettters,mutations,actions,甚至是嵌套的子模块

使用模块时，推荐加上命名空间。加上命名空间后，相当于在模块内定义的state,getters,mutations,actions，会被限制在模块的空间下，访问state,getters,mutations,actions时需要添加模块名前缀。如下图所示。其中前缀名等于 在 index.js 引入模块的名称。

```js
// /store/modules/home.js

const homeModule = {
 namespaced: true
}

// /store/index.js
import home form './modules/home'
const store = {
    module: {
        home:home // 后续的前缀名
    }
}
```

使用module时，引入的方式。state,mutation,action,getter的前缀不同。（personAbout即为模块）

![image-20211117211306238](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401049.png?token=AP3MTU5L5RUCEEKCUXJGK2DBU4H62)

模块下的 getters函数有 4个参数，比index.js的多出两个.当想获取根的 state或 getters时可以使用

```js
// /store/modules/home.js

const homeModule = {
    namespaced: true,
    ...
    getters: {
        getFullName(state, getters, rootState, rootGetters){
            ...
        }
    }
    ...
}
```

模块下的 actions函数

```js
actions {
	doSomethinsAction(context){
        // 使用本模块内的 mutations
       context.commit('doSomething')
        
        // 使用根组件的 mutations
       context.commit('doSometing',null,{root: true})
    }
}
```

1.使用module的辅助函数

![image-20220103233824943](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220103233824943.png)

![image-20220103233845957](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220103233845957.png)



### 4.namespace

当使用module时想在 mapState使用某一个模块的内容,可以在mapState添加该模块的指定名称，通过数组指定要提取的变量。 

![image-20211117205939828](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401384.png?token=AP3MTU7ZXKXQEZ4CQ6OVFSTBU4H66)

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401696.png?token=AP3MTU7S54W7TD63627K2VDBU4H7A" alt="image-20211117210127340" style="zoom: 80%;" />

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401847.png?token=AP3MTU7AFQGOIQVMQ4T33Y3BU4H7C" alt="image-20211117205809454" style="zoom:50%;" />



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401593.png?token=AP3MTU6HVI3RWYKQDNHYLU3BU4H7G" alt="image-20211117205824254" style="zoom:50%;" />





### 5.vue3使用vuex

安装最新版本 npm install vuex@next

```js
import { mapState, useStore} from "vuex";
import { computed, useInstance } from 'vue'

export default {
    setup(){
        const store = userStore() // 示范vue3中如何获取store示例
        
        const storeStateFunArr = mapState(['name','age','height']); // 返回一个对象 包含 key值 value:是函数
        
        const storeState = {}
        Object.keys(storeStateFunArr).forEach(fnKey => {
            const fn = storeStateFunArr[fnKey].bind({$store:store}); // 绑定this
            storeStatte[fnKey] = computed(fn)
        })
        
        return{
         ...storeState   
        }
    }
}
```







## 23.diff

[好文](https://blog.csdn.net/weixin_44972008/article/details/115620198)

最小量更新算法。

新的虚拟dom和老的虚拟dom进行diff,算出应该如何最小量更新，最后反映到真实的dom上。

一个虚拟节点拥有的属性

![image-20211108205747320](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401336.png?token=AP3MTUY2IAKBMGNDMX7JUQLBU4H7M)

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

![image-20211108230132891](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401921.png?token=AP3MTUYVG72UEUYZF63SEADBU4H7Q)



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401368.png?token=AP3MTUZ6NWEJ52LGMCIQGA3BU4H7U" alt="image-20211108225632507" style="zoom: 67%;" />

![image-20211108225526942](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401352.png?token=AP3MTU6HXK7L7JBIMWRYZTDBU4H7Y)

### 2.diff算法原理。



演示：当增加一个节点在尾部时是直接插入

![image-20211108233114327](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401065.png?token=AP3MTUZRFCC4KBNUQKETOBTBU4H74)

如果是增加在头部，后面的不会复用。但是如果虚拟节点内data对象有key值，则会被复用。

![image-20211108233244424](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401407.png?token=AP3MTU4BUTEGLCEE5JTTMNLBU4H76)

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401839.png?token=AP3MTUZGY22MQULZ2PUYUYLBU4IAC" alt="image-20211108233431224" style="zoom: 50%;" />

#### 为什么不用 index 作为 key值？

在 v-for 中 如果使用 index 作为key值时，如果在数组的首部插入一个元素，此时数组内所有元素的index都改变。两个不同的元素的key会相同，isSameNode方法会判断正确，后续会通过 pathVnode方法去跟新元素内的内容，无法让元素节点复用。降低性能。

如果不使用key,Vue会使用一张最大限度减少动态元素并且尽可能修改和复用同类型元素的算法，

而使用key时，vue会基于key的变化重新排列元素，并且会移除key不存在的元素。 





#### diff算法特点

1.最小量更新。依据唯一标识key.

2.只有该节点新旧虚拟dom中的同一虚拟节点**（选择器（h函数的第一个参数）和key相同即是同一个虚拟节点）**才进行比较，否则暴力删除旧的，插入新的。

3.只会同层级比较，不会跨层比较。以下代码vnode2新增了一层section，则旧节点被暴力删除，然后插入新的。



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401904.png?token=AP3MTU4CWJ5GEHBGQYWC6H3BU4IAO" alt="image-20211108234149320" style="zoom: 50%;" />

path函数有两个作用：1.patch(container, myVnode1) 将虚拟节点上树到container容器内，生成真正的dom节点。

​									  2.对比**当前同层**的虚拟节点是否为同一种类型的标签。

以下说明patch函数的作用都是说第二种。

patch函数内的

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401465.png?token=AP3MTU7BF2TE5GGGEXQL66DBU4IAS" alt="image-20211109131113009"  />

​                                              下图为精细化比较的过程 **patchVnode**

<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401489.png?token=AP3MTUY7XK3DRWDN77SEZ3TBU4IAW" alt="image-20211109160239786"  />

```typescript
function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数是 DOM节点 还是 虚拟节点
  if (oldVnode.sel == "" || oldVnode.sel === undefined) {
    // 说明oldVnode是DOM节点，此时要包装成虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(), // sel
      {}, // data
      [], // children
      undefined, // text
      oldVnode // elm
    );
  }
  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log("是同一个节点，需要精细化比较");
  } else {
    console.log("不是同一个节点，暴力 插入新节点，删除旧节点");
    // 创建 新虚拟节点 为 DOM节点
    // 要操作DOM，所以都要转换成 DOM节点
    let newVnodeElm = createElement(newVnode);
    let oldVnodeElm = oldVnode.elm;
    // 插入 新节点 到 旧节点 之前
    if (newVnodeElm) {
      // 判断newVnodeElm是存在的 在旧节点之前插入新节点
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm);
    }
    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm);
  }
}
```

如果新旧虚拟节点都有子节点，则设置4个指针分别指向新旧虚拟节点的第一个子节点和最后一个子节点。分别设这4个指针为旧前，旧后。新前，新后。通过4种命中查找来进行判断：

1.新前与旧前（如果命中，则这两个指针分别向下移动）

2.新后与旧后（如果命中，则这两个指针分别向上移动）

3.新后与旧前（如果命中，新后指向的节点插入旧后节点之后，然后将旧前节点置为undefined,最后移动新后指针和旧前指针）

4.新前与旧后（如果命中，新前指向的节点插入到旧前节点之前，然后将旧后节点置为undefined,最后移动新前指针和旧后指针）

如果上述4种情况都没有命中，则通过循环旧节点的子节点来进行查找与新前指针的节点或者旧后指针的节点进行比较，找到了就将旧节点的字节点置为undefined.然后移动新节点前指针或者后指针。





![image-20211018005624667](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/202112011401945.png?token=AP3MTU6G6RHXGE6DQOUNPS3BU4IA4)



**patch**方法：对比**当前同层**的虚拟节点是否为同一种类型的标签。

**sameVnode**方法：判断断是否为同一类型节点

**pathVnode**方法：真正更新dom的方法

**updateChildren**方法： 新旧虚拟节点的子节点对比，



1.首先在patch方法，对新旧虚拟节点进行同层级比较，在patch方法内调用sameVNode方法判断新老虚拟节点是否为同一类型的节点

2.如果不是则直接更换跟新虚拟节点到dom上。

3.如果类型相同，则对新旧虚拟节点进行深层比较。调用patchVnode（oldVnode, newVnode）方法。

   3.1*如果新旧虚拟节点是同一个对象，则终止*

   3.2*如果新旧虚拟节点是文本节点，且文本不一样* *则直接将真实DOM中文本更新为新虚拟节点的文本*

​    3.3*如果* *新旧虚拟节点都有子节点，* 使用 updateChildren方法传入新旧虚拟节点*对比并更新* 其子节点。

​           **a**.在方法内：

设置4个指针分别指向新旧虚拟节点的第一个子节点和最后一个子节点。分别设这4个指针为旧首，旧尾。新首，新尾。然后**依次**进行以下四种比较看**命中哪一次**：新前与旧前，新后与旧后，新后与旧前，新前与旧后，看命中

1.新首与旧首（如果命中，调用patchVnode（oldVnode, newVnode）进行更新，然后这两个指针分别向下移动）

2.新尾与旧尾（如果命中，调用patchVnode（oldVnode, newVnode）进行更新，然后这两个指针分别向上移动）

3.新尾与旧首（如果命中，调用patchVnode（oldVnode, newVnode）进行更新，新尾指针指向的节点插入真实dom中旧尾节点之后，然后移动新尾指针和旧首指针）

4.新首与旧尾（如果命中，调用patchVnode（oldVnode, newVnode）进行更新，新首指向的节点插入真实dom中到旧首节点之前，然后移动新首指针和旧尾指针）

​			**b**如果以上逻辑都匹配不到，再把所有旧子节点的 `key` 做一个映射到旧节点下标的 `key -> index` 表，然后用新 虚拟节点的首指针指向的节点的 `key` 在映射中找出在旧节点中可以复用的位置。

 



## 24.nextTick

在DOM跟新结束后执行回调。

vue更新dom的背景：

响应式触发： setter->Dep->Watcher->update->queueWatcher->All Run

vue更新DOM是异步的。只要侦听到数据发生变化，vue就会开启一个缓冲队列，存入同一事件循环内所有的数据变更。我们称该队列为异步队列。如果同一个watcher被多次触发，只会被推入到队列中一次。然后在下一次事件循环“tick"中，vue刷新队列并执行相应工作。

nextTick的作用：当我们跟新数据时，dom会在下一次事件循环发生更  新渲染。如果我们要访问更新渲染后的dom进行相应操作的话，可以通过**this.$nextTick**。

nextTick的原理：内部设置一个callback数组作为异步队列存放回调，然后会进行环境判断看支持哪种形式清空callback数组。会以Promise.then, MutationObserver（微任务）和 setImmediate（1米地儿）或 setTimeout(fn,0)的顺序去判断 。

nextTick 也是将 回调加入到任务队列当中，只是会根据环境不同判断采用微任务还是宏任务的方式去清空。 



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



## 25. 组件库

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

其中，所有的挂载元素会被 Vue 生成的 DOM 替换。因此不推荐挂载 root 实例到 `<html>` 或者 `<body>` 上



### 2混入Mixin

1.在new Vue实例时，可以在mixin属性内添加要混入的属性。

2.各属性混入时一般会同名属性合并成一个对象，如果属性data混入时发生冲突，以vue实例的属性为准。

![image-20211225143501553](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211225143501553.png)

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

**钩子函数内的this都是window**？？好像不是噢

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

​                    可以指定元素的样式，value,绑定事件等。

updated:指令所在模板被重新编译时调用，所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

**updated和bind函数往往会需要进行相同的操作**

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



## 26keep-alive

**缓存组件,本身就是一个组件**，不需要重复渲染.如多个静态Tab页的切换优化性能.

希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就可以用到keep-alive组件。

![image-20211223223313023](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211223223313023.png)





## 27模板编译

插件： vue-template-compiler

模板编译后生成 render函数， render函数调用后生成vnode。

开发环境中 .vue文件传入的 <template>标签是经过 vue-loader 编译的，在打包过程中执行。





## 28Vue组件渲染过程

1.初次渲染过程： 

 解析模板为 render 函数（可能在开发环境已完成, vue-loader）

 触发响应式，监听 data属性中的 getter 和 setter

 执行 render 函数， 生成 vnode,  调用path(el,vnode) **将虚拟节点的元素生成到dom当中**（注意这一步是在响应式之后，因为当执行 render函数 生成 vnode 时 会触发 相应的 getter ,例如 {{message}}等插值语法在解析时。）

2.更新过程：

 修改 data, 触发setter (此前在getter 中已被监听)

 重新执行 render 函数， 生成 newVnode

 patch(vnode, newVnode)     



## 29Vue的版本

![image-20211221124926403](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211221124926403.png)

![image-20211221125331730](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20211221125331730.png)
