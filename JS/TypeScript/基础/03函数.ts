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


type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};

const v1 = f1(); // v1依旧是 void 类型
 
const v2 = f2();
 
const v3 = f3();

console.log(v1,v2,v3);

function sum(...num:number[]){
  let res = 0;
  num.forEach((value)=>{
    res+= value
  })
  return res;
}