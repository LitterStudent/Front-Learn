这是一个记录 ts 学习过程的文档



# 1.基础

## 1.基础



### 1.ts的特点

相对于js，增加了



1.静态类型检查（Static type-checking）：在代码运行前预测代码的类型，防止错误，帮助我们在代码运行前就找到错误。

JavaScript 仅仅提供了动态类型（dynamic typing），这需要你先运行代码然后再看会发生什么。而当运行时动态类型的值调用发生错误就会导致崩溃。ts的替代方案就是使用静态类型系统（static type system），在代码运行之前就预测需要什么样的代码。依靠静态类型系统（Static types systems）描述了值应有的结构和行为。一个像 TypeScript 的类型检查器会利用这个信息，并且在可能会出错的时候告诉我们：

```tsx
const message = "hello!";
 
message();

// This expression is not callable.
// Type 'String' has no call signatures.
```

2.`tsc` TypeScript 编译器

```js
npm install -g typescript     // 全局安装 ts编译器
tsc hello.ts                  // 编译生成js，即使报错也生成 
tsc --noEmitOnError hello.ts  //报错时不生成编译后的js
```



### 2.类型注解

```ts
// 格式如下
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// 记住，我们并不需要总是写类型注解，大部分时候，TypeScript 可以自动推断出类型：
let msg = "hello there!";
// let msg: string
```



### 3.编译生成的js

1.类型抹除

谨记：类型注解并不会更改程序运行时的行为

```tsx
"use strict";
function greet(person, date) {
    console.log("Hello " + person + ", today is " + date.toDateString() + "!");
}
greet("Maddison", new Date());
```

2.降级

TypeScript 默认将新版本的代码编译为老版本的代码，比如 ECMAScript3 或者 ECMAScript5 。这个过程就叫做**降级（downleveling）** 。为了兼容浏览器。

3.严格模式

严格模式的两个重要配置

noImplicitAny

在某些时候，TypeScript 并不会为我们推断类型，这时候就会回退到最宽泛的类型：`any` 。这倒不是最糟糕的事情，毕竟回退到 `any`就跟我们写 JavaScript 没啥一样了。启用 **noImplicitAny** 配置项后，当类型被隐式推断为 `any` 时，会抛出一个错误。

strictNullChecks

必须明确处理 null 和 undefined



## 2.常见类型

1.三个基础类型： string,number,boolean

2.数组。 number[],string[]. 数字数字，字符串数组

3.any.任意类型





### 4.变量上的类型注解

当你使用 `const`、`var` 或 `let` 声明一个变量时，你可以选择性的添加一个类型注解，显式指定变量的类型。不使用时，ts会自动推断类型。（好智能吖）

```tsx
let myName: string = "Alice";
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```



### 5.函数上的类型注解

参数类型注解

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

返回值类型注解

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

匿名函数的**上下文推断**

```tsx
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
```



### 6.对象类型

定义一个对象类型，我们只需要简单的列出它的属性和对应的类型。

对象类型可以指定一些甚至所有的属性为可选的，你只需要在属性名后添加一个 `?` ：

```tsx
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y?: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```



### 7.联合类型

TypeScript 会要求你做的事情，必须对每个联合的成员都是有效的。举个例子，如果你有一个联合类型 `string | number` , 你不能使用只存在 `string` 上的方法：

```tsx
function printId(id: number | string) {
  console.log(id.toUpperCase());
    // Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.
}
```

解决方案是用代码收窄联合类型，就像你在 JavaScript 没有类型注解那样使用。当 TypeScript 可以根据代码的结构推断出一个更加具体的类型时，类型收窄就会出现。

```tsx
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```



### 8.类型别名

```tsx
type ID = number | string;

type Point = {
 	x:number,
 	y?: number
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```



### 9.接口声明(interfaces)

接口声明（interface declaration）是命名对象类型的另一种方式：

```tsx
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

类型别名和接口非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 `type` 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。

```tsx
// Interface
// 通过继承扩展类型
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
        
// Type
// 通过交集扩展类型
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```



### 9类型断言

**Type Assertions**

有的时候，你知道一个值的类型，但 TypeScript 不知道。

举个例子，如果你使用 `document.getElementById`，TypeScript 仅仅知道它会返回一个 `HTMLElement`，但是你却知道，你要获取的是一个 `HTMLCanvasElement`。

这时，你可以使用类型断言将其指定为一个更具体的类型：

```tsx
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

```



### 10.字面量类型

更为具体的数字和字符串

```tsx
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

```tsx
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

字面量推断

```tsx
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

```

在上面这个例子里，`req.method` 被推断为 `string` ，而不是 `"GET"`，因为在创建 `req` 和 调用 `handleRequest` 函数之间，可能还有其他的代码，或许会将 `req.method` 赋值一个新字符串比如 `"Guess"` 。所以 TypeScript 就报错了。

有两种方式可以解决：

1. 添加一个类型断言改变推断结果：

```typescript
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

修改 1 表示“我有意让 `req.method` 的类型为字面量类型 `"GET"`，这会阻止未来可能赋值为 `"GUESS"` 等字段”。修改 2 表示“我知道 `req.method` 的值是 `"GET"`”.

1. 你也可以使用 `as const` 把整个对象转为一个类型字面量：

```typescript
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

`as const` 效果跟 `const` 类似，但是对类型系统而言，它可以确保所有的属性都被赋予一个字面量类型，而不是一个更通用的类型比如 `string` 或者 `number` 。