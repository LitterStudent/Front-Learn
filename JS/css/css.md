## 1.常见的块级元素，行内元素。

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

`elative`（相对定位）： 生成相对定位的元素，定位原点是元素本身所在的位置；

`absolute`（绝对定位）：生成绝对定位的元素，定位原点是离自己这一级元素最近的一级`position`设置为`absolute`或者`relative`的父元素的左上角为原点的。

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

伪元素   ::before, ::after 通过在元素的第一个子元素前面或者最后一个元素前面添加 一个新的元素。

起初 伪元素只有 :一个分号，现在伪元素都为两个分号：：



一个分号的为  伪类 ：  ，伪类是一个类。拥有类的权重等。



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



px是css的像素，1px代表css中的一个像素点。

而1个css像素点对应实际的屏幕是多少像素点要看设备像素比DPR.

em 是一个相对单位，当在元素的 font-size中使用时 如 2em 是相对于父元素的 font-size ,即2倍的font-size.

​                                    当在元素的其他属性使用时是相对于自身字体属性的大小。 如weight,height,padding,margin.等



rem和em一样也是相对长度。不过rem是基于html的font-size.用于自适应网站。

可以写一段`js`让`html`根元素的字号随着浏览器宽度的变化而等比例变化，此时造成页面等比例缩放的现象。



可以通过js依据当前的页面的视口宽度与设计稿 进行对比 自动计算出根元素html的基准是多少。





## 13 什么是外边距重叠？

相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。

合并后选大的那个。



## 14 display:none 和 visibility:hidden 有什么区别？

display：none 是使得元素从文档的布局上消失，引发浏览器的回流。

visibility:hidden 元素仍在文档的布局上，只会引发浏览器的重绘 ，不会引发回流。



## 15 link 与 @import 的区别？

<link href="url" res="stylesheet">

link 是html中的标签，可以引入css和其他资源，如脚本，图片，字体等。而 @import是纯css 语法，只能在css内使用，导入css.

link会在页面加载时同时加载，而import要等到页面加载完才加载

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
2. float : 不为 none hidden auto，scroll
3. positon:为absolute或者fixed
4. 定义成非block的块级元素：如  display:inline-block flex 等



BFC的应用场景：  

1. 自适应式两栏布局：父盒子layout内  aside盒子 左边浮动  宽度指定，main盒子设置BFC。这样 BFC会自动铺满且不会和浮动盒子重叠。
2. 清除浮动造成的父盒子高度塌陷。：当父盒子声明了BFC后，其浮动元素也会计入父盒子的高度。
3. 防止外边距合并。：当声明的两个相邻盒子在两个不同的BFC内时就能解决外边距合并的问题。





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

1.解析html生成DOM树，同时浏览器主进程负责下载css文件。

2.css文件下载完后，解析Css生成cssom树

3dom树和cssom树是同步解析生成的，如果解析dom树时遇到js脚本，dom树会停止解析，因为js脚本可能会操作dom，所以应该加载并执行脚本，而加载js脚本时此时如果cssom树未解析完成，js脚本必须等待，因为js脚本会操作cssom树。等cssom树加载完成才能执行脚本。

4.最后，解析并生成了DOM树和CSOM树。生成渲染树。

5.布局渲染树，负责渲染树中元素的尺寸和位置的计算。

6绘制页面的像素信息。



渲染工作是由 GUI渲染线程完成的 js执行是由js引擎线程执行的。



## 22.css的加载会造成阻塞吗？

cssom树和dom树时同步构建的，所以css的加载不会阻塞dom的加载。

但是渲染树的生成需要cssom树和dom树。所以cssom树会阻塞的渲染。

又因为js是可以操作dom和cssom的，而cssom必须加载后才能让js操纵，所以js的执行也得等cssom生成。



## 23 defer 和 async 的区别？

1.<script src="script.js">

解析dom时遇到script标签会停止后面dom的解析，转而加载js脚本并执行。加载执行完后才解析后面的Dom



2. < script async src='srcopt.js' >

  则是会异步加载脚本，后面的dom继续解析。等脚本加载完后停止dom的解析转而执行加载完的脚本

2. <script defer  >

也是会异步加载脚本，但是脚本加载完后会等dom解析完后才执行。DOMContentLoaded 事件触发前执行。



## 24 DOMContentLoaded 与 load 的区别 ?

当 DOMContentLoaded 事件触发时,仅当 DOM 解析完成后,不包括样式表,图片。我们前面提到 **CSS 加载会阻塞 Dom 的渲染和后面 js 的执行,js 会阻塞 Dom 解析**,所以我们可以得到结论:
当文档中没有脚本时,浏览器解析完文档便能触发 DOMContentLoaded 事件。如果文档中包含脚本,则脚本会阻塞文档的解析,而脚本需要等 CSSOM 构建完成才能执行。在任何情况下,DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。

当 onload 事件触发时,页面上所有的 DOM,样式表,脚本,图片等资源已经加载完毕。

DOMContentLoaded -> load。



## 25 谈谈浏览器的回流与重绘

1. 回流：当渲染树因为部分元素发生尺寸，结构，或者某些属性的改变导致渲染树重构的过程就叫做回流。

   导致回流的操作：浏览器窗口大小发变化 ，元素尺寸发生变化，字体大小发生变化，添加或者删除dom元素

2. #### 重绘：当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的过程。如color,visibility等



性能影响：回流的代价比重绘高。有时候只改变一个元素的布局但影响到了其他元素的布局导致渲染多个子树需要回流重绘。



性能优化：js尽量少操作，生成，dom节点等 避免频繁操作样式。对于有复杂动画的元素可以使其浮动起来脱离标准流减少回流。

  可以给 script标签 添加 defer