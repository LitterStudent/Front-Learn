type MyExclude<T, U> = T extends U ? never : T
// https://www.tslang.cn/docs/release-notes/typescript-2.8.html