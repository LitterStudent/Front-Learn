const arr = [1, 2, 3, 4]

// arr.forEach(item => {
//     console.log(item);
//     arr.push(arr.length)
// })

arr.filter((item) => {
    if( item == 4) return true;
    else arr.push(arr.length + 1)
})

// for(const value of arr) {
//     console.log(value);
//     if(arr.length < 100)
//     arr.push(arr.length + 1)
// }

// for(let i = 0; i< arr.length ; i++) {
//     if(arr.length < 100)
//     arr.push(arr.length + 1)
// }
console.log(arr);