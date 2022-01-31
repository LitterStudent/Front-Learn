type Concat<T extends unknown[], U extends unknown[]> = [...T,...U]


type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<[string,number]>;  
// type Str = string
 
// Leaves the type alone.
type Num = Flatten<number>;  
// type Num = number