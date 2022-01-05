let count = 1;

function sayCount(){
    console.log("hello this count is :",count);
}

setTimeout(()=>{
    count++
},1000)

export default { count, sayCount }