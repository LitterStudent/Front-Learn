const names1:string[] = []   // 推荐
const namse2:Array<string> = []  //不推荐

const info =  {
  name:'nihao',
  age:12
}

let flag:boolean = true;
let reslut:unknown;
if(flag){
  reslut = 'nihao'
}else{
  reslut = 233333;
}
let msg:unknown = reslut;



interface StringArray {
  [index: number]: string;
}

// 元组
let x:[string,number]
x = ['hello',12]
console.log(x[0]);
// 元组使用场景

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