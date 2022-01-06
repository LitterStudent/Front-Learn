// get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
const proxy = new Proxy({}, {
    get: function(target, key, receiver) {
      return receiver;
    }
  });
  proxy.getReceiver === proxy // true