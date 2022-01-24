type MyReadonly<T> = {
    //  遍历 interface
    readonly [k in keyof T] : T[k]
}