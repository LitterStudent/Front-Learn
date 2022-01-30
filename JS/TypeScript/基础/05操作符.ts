type Point = {x:number, y:number}
type p = keyof Point
// type p = "x" | "y"：

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number


let s = 'hello';
let n: typeof s;

function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

const person = {name:'xiaoming',age:18}

let  dong: typeof person;

function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

let t:typeof tuple

const req = { url: "https://example.com", method: "GET" } as const;

let re:typeof req

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
console.log(info2.friend?.age);