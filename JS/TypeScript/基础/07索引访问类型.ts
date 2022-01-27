type Person = { age:number, name:string, alive: boolean }

type Age = Person['age'];

type I1 = Person['age' | 'name'];

type I2 = Person[keyof Person]

// 数组中结合typeof使用 
const MyArray = [
    {name:'a',age:'1'},
    {name:'b',age:'2'},
    {name:'c',age:'3'}
]

type Person2 = typeof MyArray 
type name = typeof MyArray[number]['age'];

const App = ['Taobao','PingDuoDuo','JinDong'] as const
type app = typeof App[number]