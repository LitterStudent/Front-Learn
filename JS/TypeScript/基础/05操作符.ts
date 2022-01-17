type Point = {x:number, y:number}
type p = keyof Point

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number

function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;