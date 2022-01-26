// 数字枚举 从0开始
enum Direction {
    Up,
    Down,
    Left,
    Right
}
Direction.Up
// 从1开始
enum Direction1 {
    A = 1,
    B,
    C,
}

// 字符串枚举
enum Direction2 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// 异构枚举 （混合）
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 枚举成员可以是常量或计算值
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
}


enum ShapeKind {
    Circle,
    Square,
  }
   
  interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
  }
   
  interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
  }
   
  let c: Circle = {
    kind: 12,
    radius: 100,
  };