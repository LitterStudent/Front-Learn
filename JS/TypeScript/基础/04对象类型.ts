interface StringArray {
  [index: number]: string;
}

// 元组
let x:[string,number]
x = ['hello',12]
console.log(x[0]);
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型 