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