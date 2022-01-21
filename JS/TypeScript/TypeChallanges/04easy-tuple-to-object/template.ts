type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [P in T[number]]:P
}
