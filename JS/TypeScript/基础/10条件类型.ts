// SomeType extends OtherType ? TrueType : FalseType;
interface Animal {
    live(): void
}
interface Dog extends Animal {
    woof(): void
}
type Example = Dog extends Animal ? number : string
type Example2 = RegExp extends Animal ? number : string


type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<[string,number,boolean]>;  
// type Str = string
 
// Leaves the type alone.
type Num = Flatten<number>;  
// type Num = number