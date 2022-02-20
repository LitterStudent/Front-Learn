    这是一个记录 ts 学习过程的文档



# 1.基础

## 0.使用建议

1.易推断类型让系统去推断

```tsx
let a = 'hello';
let b = 12;
let bool:boolean; // 不初始化可以先设置类型

const info =  {
  name:'nihao',
  age:12
}
// 推断为
const info:{
    name:string,
    age:number
}
```



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

### 4.类型查找

![image-20220216155142303](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220216155142303.png)

当我们引用第三方库时。有些库（如axios）已经写好了.d.ts文件，使用ts引用时不会报错，而没有写该文件的库（如lodash）就会报错。

![](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220216155515251.png)



<img src="https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220216155835476.png" alt="image-20220216155835476" style="zoom:50%;" />

## 2.常见类型

1.三个基础类型： string,number,boolean

2.数组。 number[],string[]. 数字数字，字符串数组

3.any.任意类型.引入第三方库时缺少类型注解时可以使用any 类型。

unknown类型：unknown只可以赋值给 unknown 和 any 类型。而 any类型 可以赋值给任意类型。

unknown类型是ts版本3之后出现的，在这之前的any类型的值可以赋值给任意类型的值，这样容易导错误。所以 unknown类型是在any类型之上再添加一定的约束。

```tsx
let flag:boolean = true;
let reslut:any;
if(flag){
  reslut = 'nihao'
}else{
  reslut = 233333;
}
let msg:string = reslut;
////////////////////////////////////////////
let flag:boolean = true;
let reslut:unknown;   // 最好不要使用 any
if(flag){
  reslut = 'nihao'
}else{
  reslut = 233333;
}
let msg:unknown = reslut;
```



never类型：永远不可能出现

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

```typescript
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

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

返回值类型注解（开发中可以不写返回值类型，让系统自动推导，但是也可以写，写上去后方便别人理解返回的是什么类型的值）

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

函数的**上下文推断**

```tsx
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
    // 这里可以推导出s是string类型
  console.log(s.toUppercase());
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

ts代码会收窄联合类型。。当 TypeScript 可以根据代码的结构推断出一个更加具体的类型时，类型收窄就会出现。

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

有的时候，一个类型会被使用多次，此时我们更希望通过一个单独的名字来引用它。

一个可以指代任意类型的名字。类型别名的语法是：

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

接口声明（interface declaration）是命名对象类型的另一种方式：(只能声明对象)

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

类型别名和接口声明非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 `type` 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。

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

相同名称的接口在重复定义时，会合并定义。

```tsx
interface Dong {
name: string
}
interface Dong {
age: number
}
// 等于
interface Dong{
name: string,
age:number
}
```

**属性擦除freshness**

```tsx
nterface personInfo {
    name:string,
    age: number
}

const info = {
    name:'xiaoming',
    age:18,
    height:1.88
}
function printInfo(info:personInfo){
    console.log(info.name);
    console.log(info.age);
}
// 属性擦除freshness
printInfo(info) 
printInfo({
    name:'xiaoming',
    age:18,
    height:1.88 // 不能传入
})

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

字面量类型必须结合联合类型才有意义。

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



### 11null 和 undefined

当 [strictNullChecks (opens new window)](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项打开的时候，如果一个值可能是 `null` 或者 `undefined`，你需要在用它的方法或者属性之前，**先检查这些值**，就像用可选的属性之前，先检查一下 是否是 `undefined` ，我们也可以使用类型收窄（narrowing）检查值是否是 `null`：

```tsx
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

TypeScript 提供了一个特殊的语法，可以在不做任何检查的情况下，从类型中移除 `null` 和 `undefined`，这就是在任意表达式后面写上 `!` ，这是一个有效的类型断言，表示它的值不可能是 `null` 或者 `undefined`：

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```



## 3.类型收窄

1.TypeScript分析这些使用了静态类型的值在运行时的具体类型。目前 TypeScript 已经实现了比如 `if/else` 、三元运算符、循环、真值检查等情况下的类型分析。

TypeScript 的类型检查器会考虑到这些类型保护和赋值语句，而这个**将类型推导为更精确类型的过程，我们称之为收窄 (narrowing)**。 在编辑器中，我们可以观察到类型的改变：

![image-20220111013939175](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220111013939175.png)



### 2.typeof类型保护

在 TypeScript 中，检查 `typeof` 返回的值就是一种类型保护。TypeScript 知道 `typeof` 不同值的结果。

```ts
function printAll(strs: string | string[] | null | boolean) {
    if (typeof strs === "object") {
        // null || object
      for (const s of strs) {
            // Object is possibly 'null'.
        console.log(s);
      }
    } else if (typeof strs === "string") {
        // string
      console.log(strs);
    } else {
        // boolean
        console.log(strs);
      // do nothing
    }
  }
```



### 3.真值收窄

```ts
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
    // (parameter) values: undefined
  } else {
    return values.map((x) => x * factor);
    // (parameter) values: number[]
  }
}
```

### 4.等值收窄

```typescript
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
    // (parameter) values: undefined
  } else {
    return values.map((x) => x * factor);
    // (parameter) values: number[]
  }
}
```



### 5.in和instanceof

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
    // (parameter) animal: Fish
  }
 
  return animal.fly();
  // (parameter) animal: Bird
}
```

![image-20220111114314748](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220111114314748.png)

### 6.赋值语句

![image-20220111114401427](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220111114401427.png)



### 7.类型判断式

type predicates

所谓 `predicate` 就是一个返回 `boolean` 值的函数。

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

在这个例子中，`pet is Fish`就是我们的类型判断式，一个类型判断式采用 `parameterName is Type`的形式，但 `parameterName` 必须是当前函数的参数名。

当 isFish 被传入变量进行调用，TypeScript 就可以将这个变量收窄到更具体的类型：

```typescript
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim(); // let pet: Fish
} else {
  pet.fly(); // let pet: Bird
}
```





### 8.可辩别联合

当联合类型中的每个类型，都包含了一个共同的字面量类型的属性，TypeScript 就会认为这是一个**可辨别联合（discriminated union）**，然后可以将具体成员的类型进行收窄。

在这个例子中，`kind` 就是这个公共的属性（作为 Shape 的**可辨别(discriminant)** 属性 ）。

```tsx
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;
```

这里的关键就在于如何定义 `Shape`，告诉 TypeScript，`Circle` 和 `Square` 是根据 `kind` 字段彻底分开的两个类型。这样，类型系统就可以在 `switch` 语句的每个分支里推导出正确的类型。

![image-20220111115730259](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220111115730259.png)



### 9.穷尽检查

错误用法

因为 TypeScript 的收窄特性，执行到 `default` 的时候，类型被收窄为 `Triangle`，但因为任何类型都不能赋值给 `never` 类型，这就会产生一个编译错误。通过这种方式，你就可以确保 `getArea` 函数总是穷尽了所有 `shape` 的可能性。

```tsx
interface Triangle {
  kind: "triangle";
  sideLength: number;
}
 
type Shape = Circle | Square | Triangle;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```

正确用法

```tsx
type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```



## 4.函数

在js和ts的函数中，即使不返回任意值，默认会返回undefined



### 1.函数类型表达式

(a: string) => void 表示一个函数有一个名为 a ，类型是字符串的参数，这个函数并没有返回任何值。

```tsx
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```



### 2.调用签名

函数除了被调用，还可以带有属性值。如果我们想要描述一个带有属性值的函数，可以在一个对象内写调用签名。

注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 `:` 而不是 `=>`。

```ts
type DescribableFunction = {
	description: string,
	(someArg: number ): boolean //调用签名
}
funtion doSometing(fn: describableFunction){
      console.log(fn.description + " returned " + fn(6));
}
```



### 3.构造签名

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```



### 4.泛型函数

在 TypeScript 中，泛型就是被用来描述两个或者更多值之间的对应关系。我们需要在函数签名里声明一个**类型参数 (type parameter)**：

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```



#### 1.泛型约束

使用 extends

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```



#### 2.声明类型参数

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```



#### 3.类型参数应该至少出现两次 

（Type Parameters Should Appear Twice）

有的时候我们会忘记一个函数其实并不需要泛型

```typescript
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");
```

其实我们可以如此简单的写这个函数：

```typescript
function greet(s: string) {
  console.log("Hello, " + s);
}
```

记住：类型参数是用来关联多个值之间的类型。如果一个类型参数只在函数签名里出现了一次，那它就没有跟任何东西产生关联。

> Rule: 如果一个类型参数仅仅出现在一个地方，强烈建议你重新考虑是否真的需要它



#### 4.可选参数

```typescript
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```



#### 5.函数重载

在 TypeScript 中，我们可以通过写**重载签名** (overlaod signatures) 说明一个函数的不同调用方法。

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

在这个例子中，我们写了两个函数重载，一个接受一个参数，另外一个接受三个参数。前面两个函数签名被称为**重载签名** (overload signatures)。

然后，我们写了一个兼容签名的函数实现，我们称之为**实现签名** (implementation signature)。实现签名对外界是不可见的。不可以直接调用。

**当能使用联合类型去实现函数时就不使用函数重载。**

实现签名必须和重载签名兼容

```typescript
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;
// This overload signature is not compatible with its implementation signature.
function fn(x: boolean) {}
```

```typescript
function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;
This overload signature is not compatible with its implementation signature.
function fn(x: string | number) {
  return "oops";
}
```

#### 6.函数声明中的this

在 JavaScript 中，`this` 是保留字，所以不能当做参数使用。但 TypeScript 可以允许你在函数体内声明 `this` 的类型。

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```



#### 7.void

在 JavaScript 中，一个函数并不会返回任何值，会隐式返回 `undefined`，但是 `void` 和 `undefined` 在 TypeScript 中并不一样。





#### 8.arguments和Parameters

`arguments` 和 `parameters` 都可以表示函数的参数，由于本节内容做了具体的区分，所以我们定义 `parameters` 表示我们定义函数时设置的名字即形参，`arguments` 表示我们实际传入函数的参数即实参。



##### 1.剩余形式参数写法

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```



##### 2.剩余实际参数写法

我们可以借助一个使用 `...` 语法的数组，为函数提供不定数量的实参。举个例子，数组的 `push` 方法就可以接受任何数量的实参：

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

注意一般情况下，TypeScript 并不会假定数组是不变的(immutable)，这会导致一些意外的行为：

```typescript
// 类型被推断为 number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
// A spread argument must either have a tuple type or be passed to a rest parameter.
```

修复这个问题需要你写一点代码，通常来说, 使用 `as const` 是最直接有效的解决方法：

```typescript
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```



#### 9.参数解构

```typescript
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```



## 5.对象类型

ts中的对象可以是匿名的，类型别名，接口声明

```typescript
// 匿名
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

//类型别名

type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}

// 接口声明
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```





### 1.属性修饰符



#### 1.可选属性

在 strictNullChecks 模式下，针对 undefined 或  null  进行判断

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
 

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  // let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // let yPos: number
}
```

也可以通过解构语法，并为属性提供默认值。

```typescript
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos); // (parameter) xPos: number
  console.log("y coordinate at", yPos); // (parameter) yPos: number
  // ...
}
```



### 2.readonly属性

```typescript
interface SomeType {
  readonly prop: string;
}
 
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // But we can't re-assign it.
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```



```typescript
interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
 
function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
  // Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}
```



### 3.属性继承

```typescript
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```



### 4.交叉类型

使用 &



```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;


// 行参中使用
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
 
// okay
draw({ color: "blue", radius: 42 });
 
// oops
draw({ color: "red", raidus: 42 });
// Argument of type '{ color: string; raidus: number; }' is not assignable to parameter of type 'Colorful & Circle'.
// Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
```



使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会：

```typescript
interface Colorful {
  color: string;
}

interface ColorfulSub extends Colorful {
  color: number
}

// Interface 'ColorfulSub' incorrectly extends interface 'Colorful'.
// Types of property 'color' are incompatible.
// Type 'number' is not assignable to type 'string'.
```

虽然不会报错，那 `color` 属性的类型是什么呢，答案是 `never`，取得是 `string` 和 `number` 的交集。

```typescript
interface Colorful {
  color: string;
}

type ColorfulSub = Colorful & {
  color: number
}
```



### 5.泛型对象类型

```typescript
// 1
interface Box<Type> {
  contents: Type;
}
 
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

```typescript
// 2
type Box<Type> = {
  contents: Type;
};
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

```typescript
// 3
type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
           
type OneOrManyOrNull<Type> = OneOrMany<Type> | null
 
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
               
type OneOrManyOrNullStrings = OneOrMany<string> | null
```



#### 1.Array类型

数组类型本就是一种泛型对象类型

当我们这样写类型 `number[]` 或者 `string[]` 的时候，其实它们只是 `Array<number>` 和 `Array<string>` 的简写形式而已。

```tsx
const names1:string[] = []   // 推荐
const namse2:Array<string> = []  //不推荐
```



```typescript
interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;
 
  // ...
}
```



##### 1.空数组

```ts
// 空数组的首项是undefined
// type arr = []
// type a = arr[0]
```



##### 2.遍历数组

```tsx
type arr = [string,number]
type a = arr[number]
// type a = string | number
// union 类型
// 如果是空数组，遍历得到 never
```

##### 3.获取length

```tsx
type arr = [string,number]
type a = arr['length']
// type a = 2
```



#### 2.ReadonlyArray 类型

`ReadonlyArray` 是一个特殊类型，它可以描述数组不能被改变。

```typescript
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

当函数中传入一个 ReadonlyArray 类型，这是在告知我们 函数不会改变数组，可以放心传入。

当函数返回一个 ReadonlyArray 类型，这是在告知我们不要去改变其中的内容。



语法

```typescript
//  将普通数组赋值给它
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

// 函数行参简写
function doStuff(values: readonly string[]) {
    ...
}
```



#### 3.元组类型

**Tuple**

元组类型是另外一种 `Array` 类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型。



```typescript
// 定义元组内只能有两个元素，一个string类型,一个number类型
type StringNumberPair = [string, number];

function doSomething(pair: [string, number]) {}
```

##### 使用场景

一个工具函数调用后返回一个元组，我们可以很方便的知道元组上各个元素的类型并进行解构赋值

```tsx
function useState<T>(state:T){
  let currentState = state;
  const changeState = (newState:T)=>{
    currentState = newState
  }
  const tuple:[T,(newState:T)=>void] = [currentState,changeState];
  return tuple;
}

const [counter,setCounter] = useState(10);
setCounter(1000)
const [title, setTitle] = useState("nihao")
const [Flag, setFlag] = useState(true)
```



### 6.枚举类型

枚举类型就是一组常量值

![image-20220216150641275](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220216150641275.png)

## 6.泛型

将类型参数化，调用时再指定类型。

```tsx
function identity<Type>(arg: Type):Type{
    return arg
}

let output = identity<string>("myString");
let output = identity("myString")  //自动推断
```



### 1.泛型类型

下面代码的

```tsx
 function identity<Type>(arg: Type): Type {
     return arg;
 }

// 泛型接口方式一
let myIdentity: <Type>(arg: Type) => Type = identity

// 泛型接口方式二
let myIdentity: { <Type>(arg: Type): Type } = identity;
```

```typescript
// 泛型接口方式三，在对象字面量中的调用签名中声明。
// 在泛型接口中定义整个接口的参数
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```



### 2.泛型类

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
 
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```



### 3.泛型约束

```typescript
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

现在这个泛型函数被约束了，它不再适用于所有类型：

```typescript
loggingIdentity(3);
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
```

我们需要传入符合约束条件的值：

```typescript
loggingIdentity({ length: 10, value: 3 });
```



## 7.操作符

### 1.keyof

对一个对象类型使用 `keyof` 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合。

```typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```



### 2.typeof

`typeof` 方法可以在类型上下文（type context）中使用，用于获取一个变量或者属性的类型。

```typescript
let s = "hello";
let n: typeof s;
// let n: string
```

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
                    
// type P = {
//    x: number;
//    y: number;
// }
```

```typescript
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
// 		name: string;
// 		age: string;
// }
```

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
```



### 3.可选属性 ？ 和 一定存在属性 ！

**？ 和  !.  和 ?. **

```tsx
type person =  {
  name:string,
  friend?:{
    name1:string,
    age?:number
  }
}

const info2:person = {
  name:'ddd',
  friend:{
    name1:'hhhhh',
    age:12
  }
}
// 因为 friend 是可选的，可能不存在，我们要访问要默认其存在
console.log(info2.friend!.age);
```

或者使用 **？.**  当其不存在时不进行后续的操作。

这个叫可续链操作，es11新增加的特性。**js中也具有**。

```tsx
type person =  {
  name:string,
  friend?:{
    name1:string,
    age?:number
  }
}

const info2:person = {
  name:'ddd',
  friend:{
    name1:'hhhhh',
    age:12
  }
}
// 这里改成 ？ 当 friden 不存在时 就不访问 age
console.log(info2.friend?.age);
```



## 8.类

类的三个特性：封装，继承，多态

### 1.类的属性

```tsx
class Person{
    ////////////////////////////////
    name:string
    age:number

    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    eating(){
        console.log("person eating.....");
    }
}

class Student extends Person{
    total: number
    constructor(name:string,age:number,total:number){
        super(name,age);
        this.total = total
    }
    // 多态：  重写了继承自Person 的方法
    eating(){
        super.eating();
        console.log("student eating....");
    }

}
```

### 2.修饰符

![image-20220214153859454](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220214153859454.png)

### 3.访问器

为 private 属性添加访问器

![image-20220214155640734](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220214155640734.png)

### 4.抽象类

![image-20220214161055135](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220214161055135.png)

![image-20220214161144851](https://raw.githubusercontent.com/LitterStudent/Cloud-picture/main/image-20220214161144851.png)

### 5.类的类型

即 类的字面量形式
