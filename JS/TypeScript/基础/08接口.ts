// 这样定义接口
interface  SquareConfig {
   readonly color?: string;
   readonly width?: number;
}

function createSquare(config: SquareConfig): {color: string, area: number} {
    let newSquare = {color:'red', area:100}

    if(config.color){
        newSquare.color = config.color;
    }

    if(config.width){
        newSquare.area = config.width*config.width
    }
    return newSquare;
}

// 1.直接往函数内传入一个对象，该对象不能包含目标类型外的属性
let mySquare = createSquare({color:'black',width:2})
// 2.可以通过类型断言来解决
let mySquare2 = createSquare({color:'black',width:2,test:21} as SquareConfig)
// 3.外部声明初始化对象再传入也可以,跳过检查
let obj = {color:'black',width:2,test:21}
let mySquare3 = createSquare(obj)

// 只读数组
let a: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a
// 不能修改
ro[0] = 1;


// 接口任意属性名
interface  SquareConfig2 {
    readonly color?: string;
    readonly width?: number;
    [propName: string]: any
 }
 function createSquare2(config: SquareConfig2): {color: string, area: number} {
    let newSquare = {color:'red', area:100}

    if(config.color){
        newSquare.color = config.color;
    }

    if(config.width){
        newSquare.area = config.width*config.width
    }
    return newSquare;
}
 let mySquare22 = createSquare2({color:'black',width:2,test:21})

 // 调用签名
interface SearchFunction {
    (source: string, substring: string): boolean
}
let mySearch: SearchFunction;
// 参数名称可以任意
mySearch = function (source:string, subString: string) {
    let result = source.search(subString)
    return result > -1
}

// 可索引类型
interface MyStringArray {
     [index: number]: string;
}
let myArray: MyStringArray = ['nihao','xiaoming']

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
                      // 因为已经设置过了 string索引返回的是 number 类型
}

interface personInfo {
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
printInfo(info) 
printInfo({
    name:'xiaoming',
    age:18,
    height:1.88 // 不能传入
})
