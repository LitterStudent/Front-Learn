type MyPick<T, K extends keyof T> = {
    // K 的属性有肯不在T,所以要进行约束
    // K extends  a | b | c
    // 遍历 union
    [P in K]:T[P]
}
