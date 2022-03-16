let map = new Map()
map.set(1,11)
map.set(2,22)
map.set(3,33)
console.log(map);
for(const [key, value] of map) {
    console.log(key+ ':' + value);
}
map.forEach((value,key) => {
    console.log(key, value);
})