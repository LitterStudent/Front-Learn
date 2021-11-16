## 	1.常见的块级元素，行内元素。

1. 块级元素：div   ul  ol li  p form  table  header  aside footer  audio video 独占一行，可以设置宽高，内外边距
2. 行内元素：span  a  strong  em 粗体 i big samll 
3. 行内块元素：可以设置宽高，但是不会换行。 input  img button textarea label 



## 2标准盒模型和IE盒子模型

box-sizing : content-box   border-box

标准盒子模型 ： content-box  设置的width 为盒子content的宽度，盒子的实际宽度= width+padding+border+margin

IE盒子模型：border-box 设置的width为盒子的content+border+padding



## 3CSS的选择器有哪些，哪些属性可以继承？

  Id选择器，类选择器，标签选择器，相邻选择器（h1+p）,子选择器（ul > li）,后代选择器（li a),，

  通配符选择器(*), 属性选择器（a[rel='external']）,伪类选择器（a:hover,li:nth-child）

可以继承的属性： font-size,font-family,color,

不可继承的属性：width,height,margin,padding,border.

```
属性选择器：
使用li[class]，我们就能匹配任何有class属性的选择器。这匹配了除了第一项以外的所有项。
li[class="a"]匹配带有一个a类的选择器，不过不会选中一部分值为a而另一部分是另一个用空格隔开的值的类，它选中了第二项。
li[class~="a"]会匹配一个a类，不过也可以匹配一列用空格分开、包含a类的值，它选中了第二和第三项。
```

```
:nth-child()这个伪类选择器，选择元素的孩子节点
tr:nth-child(2n+1)
表示HTML表格中的奇数行。
tr:nth-child(odd)
表示HTML表格中的奇数行。
tr:nth-child(2n)
表示HTML表格中的偶数行。
tr:nth-child(even)
表示HTML表格中的偶数行。
span:nth-child(0n+1)
表示子元素中第一个且为span的元素，与 :first-child 选择器作用相同。
span:nth-child(1)
表示父元素中子元素为第一的并且名字为span的标签被选中
span:nth-child(-n+3)
匹配前三个子元素中的span元素。
```



## 4CSS优先级计算：

- 考虑到就近原则，同权重情况下样式定义以最近者为准
- 载入的样式按照最后的定位为准

!important >内联样式>ID选择器>类选择器，伪类选择器>元素选择器>通配符选择器

​                 ![img](https://docimg10.docs.qq.com/image/8EAJUUXjg3g9QIV6KjU30A?w=657&h=302)        

![image-20211015112837860](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211015112837860.png)

## 5 posintion

`relative`（相对定位）： 生成相对定位的元素，定位原点是元素本身所在的位置；

`absolute`（绝对定位）：生成绝对定位的元素，相对于不是static 定位的第一个父元素进行定位。使用absolute定位时，添加top,bottom,left,right都为0可以使得元素铺满父元素。

`fixed` （老IE不支持）：生成绝对定位的元素，相对于浏览器窗口进行定位。

`static`：默认值。没有定位，元素出现在正常的流中（忽略 `top`, `bottom`, `left`, `right`、`z-index` 声明）。

`inherit`：规定从父元素继承 `position` 属性的值。



## 6CSS3新增的属性

1. border-radius:圆角
2. RGBA和opacity



## 7CSS 三角形

```
css: 
    * {margin: 0; padding: 0;}
    .content {
        width: 0;
        height: 0;
        margin: 0 auto;
        border-width: 20px;
        border-style: solid;
        border-color: transparent transparent pink transparent;  // 对应上右下左，此处为 下 粉色
    }

html: 
    <div class="content"></div>
```





## 8清除浮动

浮动元素脱离标准流会造成父元素高度塌陷。

清除方式：1 通过给父元素添加 伪元素     

```css
：：after {
clear:both;
content:"",
display:block;
}
```

​     2。设置 overflow:hidden

​     3





## 9伪元素和伪类

伪元素用于设置元素指定部分的样式，

例如：

- 设置元素的首字母、首行的样式
- 在元素的内容之前或之后插入内容

伪元素   ::before, ::after 通过在元素的**第一个子元素前面或者最后一个子元素后面**添加 一个新的元素。伪元素不会出现在dom树中。

起初 伪元素只有 :一个分号，现在伪元素都为两个分号：：

这个虚拟元素默认是行内元素。





伪类一个分号： 

伪类用于定义元素的特殊状态。

例如，它可以用于：

- 设置鼠标悬停在元素上时的样式
- 为已访问和未访问链接设置不同的样式
- 设置元素获得焦点时的样式

## 10.Opacity和Rgba的透明效果有何不同？

1. opacity 其子元素而会收到影响
2. Rgba其子元素不会收到影响。





## 11.css 属性 content 有什么作用？

`content` 属性专门应用在 `before/after` 伪元素上，用于插入额外内容或样式。



## 11Flex布局。

### 1.父容器属性

主轴的方向默认是从左向右的，交叉轴垂直于主轴，逆时针方向90度

flex-direction: row | row-reverse | column | column-reverse



子元素在主轴上的对齐方式

justify-content:flex-start | flex-end |center 

|space-between  子元素在主轴两端对齐，项目之间间隔相等

|sapce-around    在主轴上均匀排布每个元素



子元素在交叉轴上的对齐方式。

align-items :flex-start | flex-end |center 



子元素如何换行

flex-wrap ：wrap | nowrap | wrap-reverse



定义多行子元素在交叉轴上的对齐方式

align-content

flex容器不设置高度并且子项只有一行时align-content属性是不起作用的。





子容器属性



order:定义项目的排列顺序。数值越小排列约前。

flex-grow：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。



/* 三个值: flex-grow | flex-shrink | flex-basis */

flex: 2 2 10%;



align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性





## 12 px 和 em 和 rem

[好文](https://juejin.cn/post/6844904013322944525)

px是css的像素，1px代表css中的一个像素点。

而1个css像素点对应实际的屏幕是多少像素点要看设备像素比DPR.

em 是一个相对单位，当在元素的 font-size中使用时 如 2em 是相对于父元素的 font-size ,即2倍的font-size.

​                                    当在元素的其他属性使用时是相对于自身字体属性的大小。 如weight,height,padding,margin.等



rem和em一样也是相对长度。不过rem是基于html的font-size.用于自适应网站。

```css
 vw与rem相结合实现适配

html {
    font-size: calc(100vw / 7.5);//除以的7.5是根据设计稿的屏幕宽度来定的，这样750px宽度下根元素字体大小则为    
    750px/7.5=100px=1rem
}
```



可以写一段`js`让`html`根元素的字号随着浏览器宽度的变化而等比例变化，此时造成页面等比例缩放的现象。



可以通过js依据当前的页面的视口宽度与设计稿 进行对比 自动计算出根元素html的基准是多少。



## 12.5 布局视口 视觉视口 理想视口

布局视口：整个html的最大宽度，100%时。浏览器默认的布局视口就是浏览器的窗口大小

视觉视口

<img src="C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211019215951278.png" alt="image-20211019215951278" style="zoom: 50%;" />



视觉视口：用户通过屏幕真实看到的区域。



```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
// 让布局视口等于设备宽度
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

这段代码的意思是，让viewport的宽度等于物理设备上的真实分辨率，不允许用户缩放。一都主流的web app都是这么设置的，它的作用其实是故意舍弃viewport，不缩放页面，这样dpi肯定和设备上的真实分辨率是一样的，不做任何缩放，网页会因此显得更高细腻。玩ps的同学应该都知道，当你将一张1000 * 1000的图片直接缩放至500 * 500分变成什么样，对吧？图片的失真一定逃不掉。
```



## 13 什么是外边距重叠？

相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。

合并后选大的那个。



## 14 display:none 和 visibility:hidden 有什么区别？

display：none 的元素不会出现在渲染树中，其子元素也会被隐藏。切换visibility会引发浏览器的回流。

visibility:hidden 元素仍在文档的布局上，只会引发浏览器的重绘 ，不会引发回流。其子元素设置visibility:visiable就可以显示出来。不一定隐藏子元素。设置点击事件无效。

opacity:0  引发重绘。设置点击事件有效。



## 15 link 与 @import 的区别？

<link href="url" res="stylesheet">

link 是html中的标签，可以引入css和其他资源，如脚本，图片，字体等。而 @import是纯css 语法，只能在css内使用，导入css.

link会在页面加载时同时加载，而import要等到**页面加载**完才加载

可以使用js生成link标签动态引入样式。而@import不能。



## 16BFC 块级格式化上下文。

BFC是一块独立渲染的区域，并且这个区域与外部互不影响。除了block外的块级盒子都能形成块级格式化上下文。

BFC的渲染规则：

1.内部的盒子会在垂直方向上，一个接一个地放置。

2.各个盒子垂直方向的距离是有margin决定的，同一个BFC内的相邻两个盒子的margin会合并。

3.BFC区域不会与外部浮动的盒子重叠。

4.计算BFC高度时，BFC内部的浮动元素也会参与进来。



如何创建BFC:  

1. overflow: 不为visibale   可以为 hidden
2. float : 不为 none  
3. positon:为absolute或者fixed
4. 定义成非block的块级元素：如  display:inline-block flex 等



BFC的应用场景：  

1. 自适应式两栏布局：父盒子layout内  aside盒子 左边浮动  宽度指定，main盒子设置BFC。这样 BFC会自动铺满且不会和浮动盒子重叠。
2. 清除浮动造成的父盒子高度塌陷。：当父盒子声明了BFC后，其浮动元素也会计入父盒子的高度。
3. 防止外边距合并。：当声明的两个相邻盒子在两个不同的BFC内时就能解决外边距合并的问题。
4. 

IFC IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC 的 中**每一行的高度由其包含行内元素中最高的实际高度计算而来**（不受到竖直方向的padding/margin影响)

形成条件：块级元素中仅包含内联级别元素。

IFC一般有什么用呢？

水平居中：在父盒子中通过**text-align：center**则可以使其水平居中。
垂直居中：在子元素中设置其vertical-align: middle使得垂直居中。





## 17.pading margin 是百分比时 参照的都时父元素的width 不论right left top bottom











## 18绝对定位和相对定位的区别



absolute :相对最近的不是static定位的父元素进行定位。元素会脱离文档标准流。

relative:相对元素本身位置进行定位，移动。

fixed:脱离标准流，相对于可视窗口进行定位。



## 19 伪类选择器



​                 ![img](https://docimg2.docs.qq.com/image/mhP9xWzZaxvYFkDkJp15jw?w=702&h=222)        





## 20style标签写在body后与body前有什么区别？



一般情况下，页面自上而下加载。将style标签放在body之前是为了提前加载样式。



## 21.浏览器渲染原理

谷歌浏览器的渲染引擎是 webkit

1.渲染引擎线程解析html生成DOM树。

2渲染引擎解析线程Css生成CSS规则树

3.遇到js代码，渲染引擎线程停止执行。js引擎线程开始执行js代码。js通过操作DOMAPI和CSSOMAPI来操作Dom树和CSSom树。

3dom树和cssom树是同步解析生成的，如果解析dom树时遇到js脚本，dom树会停止解析，因为js脚本可能会操作dom，所以应该加载并执行脚本，而加载js脚本时此时如果cssom树未解析完成，js脚本必须等待，因为js脚本会操作cssom树。等cssom树加载完成才能执行脚本。

4.根据解析生成的DOM树和CSOM树。合成渲染树。

5.布局渲染树，负责确定渲染树中每个节点在屏幕上的确切坐标

6再下一步就是绘制，即遍历渲染树，并使用渲染引擎绘制每个节点，转换成屏幕上的像素。

7.渲染层合并，渲染树上的节点的绘制是在多个层上进行的，当所有层都绘制完成后，浏览器会将所有层按照合理的顺序合并成一个图层，然后在屏幕上呈现



dom树是表示各节点之间的关系形成的一种抽象结构。

js dom 是 js 利用浏览器的接口实现的一种描述页面元素的数据类型。



DOM 树 和 渲染树 的区别：

- DOM 树与 HTML 标签一一对应，包括 head 和隐藏元素
- 渲染树不包括 head 和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性



- **重绘**：当我们的文档的一些元素需要更新属性，但这些属性并不影响布局，更多的是元素的外观，风格，我们称为重绘。
- **回流**：当我们的文档中的元素，发生了元素的规模尺寸，布局等改变，这个时候引起元素的重新构建，我们称为回流。

#### 常见的回流属性

任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流，

- 添加或者删除可见的DOM元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在input框中输入文字
- 浏览器窗口尺寸改变——resize事件发生时
- 计算 offsetWidth 和 offsetHeight 属性
- 设置 style 属性的值

#### 常见引起重绘属性和方法

![image-20211022005724630](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211022005724630.png)

#### 如何减少回流、重绘

- 使用 transform 替代 top
- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要把节点的属性值放在一个循环里当成循环里的变量。
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
- CSS 选择符从右往左匹配查找，避免节点层级过多
- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。



渲染工作是由 GUI渲染线程完成的 js执行是由js引擎线程执行的。

#### 为什么操作 DOM 慢

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。

### DOMContentLoaded和load的区别

- DOMContentLoaded

　　当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

- load

　　load 仅用于检测一个完全加载的页面，页面的html、css、js、图片等资源都已经加载完之后才会触发 load 事件。

## 22.css的加载会造成阻塞吗？

cssom树和dom树时同步构建的，所以css的加载不会阻塞dom的加载。

但是渲染树的生成需要cssom树和dom树。所以cssom树会阻塞的渲染。

又因为js是可以操作dom和cssom的，而cssom必须加载后才能让js操纵，所以js的执行也得等cssom生成。



## 23 defer 和 async 的区别？

![image-20211029004604103](C:\Users\15439\AppData\Roaming\Typora\typora-user-images\image-20211029004604103.png)

1.<script src="script.js">

解析dom时遇到script标签会停止后面dom的解析，转而加载js脚本并执行。加载执行完后才解析后面的Dom



2. < script async src='srcopt.js' >

  则是会异步加载脚本，后面的dom继续解析。等脚本加载完后停止dom的解析转而执行加载完的脚本

2. <script defer  >

也是会异步加载脚本，但是脚本加载完后会等dom解析完后才执行。DOMContentLoaded 事件触发前执行。

**在加载多个JS脚本的时候，async是无顺序的加载，而defer是有顺序的加载。**



## 24 DOMContentLoaded 与 load 的区别 ?

当 DOMContentLoaded 事件触发时,仅当 DOM **解析完成**后,不包括样式表,图片。我们前面提到 **CSS 加载会阻塞 Dom 的渲染和后面 js 的执行,js 会阻塞 Dom 解析**,所以我们可以得到结论:
当文档中没有脚本时,浏览器解析完文档便能触发 DOMContentLoaded 事件。如果文档中包含脚本,则脚本会阻塞文档的解析,而脚本需要等 CSSOM 构建完成才能执行。在任何情况下,DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。

当 onload 事件触发时,页面上所有的 DOM,样式表,脚本,图片等资源已经加载完毕。

DOMContentLoaded -> load。

```html
<script>
     window.addEventListener("load", function(event) {
        console.log("Loaded");
    });
    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOM fully loaded and parsed");
    });
   
</script>
```





## 25 谈谈浏览器的回流与重绘

1. 回流：当渲染树因为部分元素发生尺寸，结构，或者某些属性的改变导致渲染树重构的过程就叫做回流。

   导致回流的操作：浏览器窗口大小发变化 ，元素尺寸发生变化，字体大小发生变化，添加或者删除dom元素

2. #### 重绘：当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的过程。如color,visibility等



性能影响：回流的代价比重绘高。有时候只改变一个元素的布局但影响到了其他元素的布局导致渲染多个子树需要回流重绘。



性能优化：js尽量少操作，生成，dom节点等 避免频繁操作样式。对于有复杂动画的元素可以使其浮动起来脱离标准流减少回流。

  可以给 script标签 添加 defer





## 26 0.5px线

移动端 H5 项目越来越多，设计师对于 UI 的要求也越来越高，比如 1px 的边框。在高清屏下，移动端的 1px 会很粗。

那么为什么会产生这个问题呢？主要是跟一个东西有关，DPR(devicePixelRatio) 设备像素比，它是默认缩放为 100%的情况下，设备像素和 CSS 像素的比值。目前主流的屏幕 DPR=2（iPhone 8）,或者 3（iPhone 8 Plus）。拿 2 倍屏来说，设备的物理像素要实现 1 像素，而 DPR=2，所以 css 像素只能是 0.5。





## 27 transform transition animation

### 1.transform（变形）

```css
transform:translate(x,y)  //移动
transform:scale(x,y)      //缩放
transform: rotate(0.5turn); //旋转
```



### 2.transition  过度

过渡。通常搭配伪类选择器一起使用，:hover,:focus,:checked .等

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <title>transition</title>
  <style>
    #box {
      height: 100px;
      width: 100px;
      background: green;
      transition: transform 1s ease-in 1s;
    }

    #box:hover {
      transform: rotate(180deg) scale(.5, .5);
    }
  </style>
</head>
<body>
  <div id="box"></div>
</body>
</html>

```

我们来分析这一整个过程，首先transition给元素设置的过渡属性是transform，当鼠标移入元素时，元素的transform发生变化，那么这个时候就触发了transition，产生了动画，当鼠标移出时，transform又发生变化，这个时候还是会触发transition，产生动画，所以transition产生动画的条件是transition设置的property发生变化，这种动画的特点是需要“一个驱动力去触发”，有着以下几个不足：

1. 需要事件触发，所以没法在网页加载时自动发生
2. 是一次性的，不能重复发生，除非一再触发
3. 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
4. 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

**transition: property duration timing-function delay;**

| 值                         | 描述                              |
| -------------------------- | --------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称 |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒  |
| transition-timing-function | 规定速度效果的速度曲线            |
| transition-delay           | 定义过渡效果何时开始              |



### 3.animation

[制作网站](https://animista.net/play/basic)

语法：**animation: name duration timing-function delay iteration-count direction play-state fill-mode;**



| 值                  | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| name                | 用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致 |
| duration            | 指定元素播放动画所持续的时间                                 |
| **timing-function** | 规定速度效果的速度曲线，是针对每一个小动画所在时间范围的变换速率 |
| delay               | 定义在浏览器开始执行动画之前等待的时间，值整个animation执行之前等待的时间 |
| iteration-count     | 定义动画的播放次数，可选具体次数或者无限(infinite)           |
| direction           | 设置动画播放方向：normal(按时间轴顺序),reverse(时间轴反方向运行),alternate(轮流，即来回往复进行),alternate-reverse(动画先反运行再正方向运行，并持续交替运行) |
| play-state          | 控制元素动画的播放状态，通过此来控制动画的暂停和继续，两个值：running(继续)，paused(暂停) |
| fill-mode           | 控制动画结束后，元素的样式，有四个值：none(回到动画没开始时的状态)，forwards(动画结束后动画停留在结束状态)，backwords(动画回到第一帧的状态)，both(根据animation-direction轮流应用forwards和backwards规则)，注意与iteration-count不要冲突(动画执行无限次) |

**animation-timing-function** 属性可接受以下值：

- ease - 指定从慢速开始，然后加快，然后缓慢结束的动画（默认）
- linear - 规定从开始到结束的速度相同的动画
- ease-in - 规定慢速开始的动画
- ease-out - 规定慢速结束的动画
- ease-in-out - 指定开始和结束较慢的动画
- cubic-bezier(n,n,n,n) - 运行您在三次贝塞尔函数中定义自己的值

```
@keyframe  slidein {
 from{
  transform:translatex(-100%)
 }
 to{
   transform:translatex(0)
 }
}
```

