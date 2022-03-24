async function fun() {
    await new Promise((res, rej) => {
        setTimeout(() => {
            rej('11')
        },111)
    })
    console.log(22);
}
fun()