// type First<T extends any[]> = T extends [] ? never : T[0]
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never 
type First<T extends any[]> = T extends [infer First, ...infer Rest] 
    ? First
    : never 
    //  解构完 判断 First 是否存在，存在返回 First 否则返回 never


// 1.extneds 类型条件判断
// 2.获取 tuple 的length 属性
// 3.extends union 判断规则
// 4.infer 推断