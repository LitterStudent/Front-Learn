// 模式匹配
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<Promise<"ddd">>;

type GetFirst<Arr extends unknown[]> = Arr extends [infer first, ...unknown[]]
  ? first
  : never;
type arr = [1, 2, 3];
type arrFirst = GetFirst<arr>;
type arr2 = [];
type arrFirst2 = GetFirst<arr2>;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;
type arrLast = GetLast<arr>;
type arrLast2 = GetLast<arr2>;
type arr3 = [1];
type arrLast3 = GetLast<arr3>;

// 去除数组的第一个元素
type PropArr<Arr extends unknown[]> = Arr extends [unknown[], ...infer Last]
  ? Last
  : never;
// 去除数组的最后一个元素
type PropArr2<Arr extends unknown[]> = Arr extends [...infer Rest, unknown]
  ? Rest
  : unknown;
