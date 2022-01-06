// 同一个拦截器函数，可以设置拦截多个操作。
// 拦截函数操作
var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  fproxy(1, 2) // 1
  new fproxy(1, 2) // {value: 2}
  fproxy.prototype === Object.prototype // true
  fproxy.foo === "Hello, foo" // true