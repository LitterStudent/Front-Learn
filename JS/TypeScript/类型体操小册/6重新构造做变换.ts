// 1.
type tuple = [1, 2, 3];

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushResult = Push<tuple, 4>;

type UnShift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type UnShiftREsult = UnShift<tuple, 0>;

// 2.[1, "guang"], [2, "dong"] => [1, 2],["guang", "dong"]
type Zip<
  One extends [unknown, unknown],
  Two extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
  ? Two extends [infer TwoFirst, infer TwoSecond]
    ? [[OneFirst, TwoFirst], [OneSecond, TwoSecond]]
    : []
  : [];
type ZipResult = Zip<[1, "guang"], [2, "dong"]>;
// 递归
type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], Zip2<OneRest, OtherRest>]
    : []
  : [];
type Zip2Result = Zip2<[1, 2, 3, 4], ["ni", "hao", "ya", "ya"]>;

// 3.字符串
type CapitalizeStr<Str extends String> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapitalizeStrResult = CapitalizeStr<"haoDong">;

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

type CamelCaseStResult = CamelCase<"dong_dong_dong">;

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;
type DropSubStrResult = DropSubStr<"dong~~~", "~">;

// 4.函数 添加参数
type AppenArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;
type AppenArgumentResult = AppenArgument<(name: String) => boolean, number>;

//5.索引类型的重新构造
// 修改value
type Mapping<Obj extends Object> = {
  [key in keyof Obj]: [Obj[key], Obj[key], Obj[key]];
};
type MappingRes = Mapping<{ aaa: 1111; bbb: 2222 }>;
// 修改key
type UppercaseKey<Obj extends Object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
// 或者使用 Record语义化
type UppercaseKey2<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type UppercaseKeyRes = UppercaseKey<{ GunAng: 1; Dong: 2; Reng: 3 }>;
// 添加只读
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type ToReadonlyRes = ToReadonly<{ a: 1; b: 2; c: 3 }>;
// 添加修饰符
type ToPrtial<T> = {
  [Key in keyof T]?: T[Key];
};
type ToPrtialREs = ToPrtial<{ a: 1; b: 2; c: 3 }>;
// 删除只读
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type ToMutableREs = ToMutable<{ readonly a: 1; b: 2 }>;
// 删除修饰符
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type ToRequiredRes = ToRequired<{ a?: 1; b: 2 }>;
// 过滤值
// never 的索引会在生成新的索引类型时被去掉。
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
type FilterByValueTypeRes = FilterByValueType<
  { a: "1"; b: 2; c: [1, 2] },
  number | string
>;
