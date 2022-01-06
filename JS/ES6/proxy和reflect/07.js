// set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，
//  一般情况下是proxy实例本身，请看下面的例子。
const handler = {
    set: function(obj, prop, value, receiver) {
      obj[prop] = receiver;
      return true;
    }
  };
  const proxy = new Proxy({}, handler);
  const myObj = {};
  Object.setPrototypeOf(myObj, proxy);
  
  myObj.foo = 'bar';
  myObj.foo === myObj // true