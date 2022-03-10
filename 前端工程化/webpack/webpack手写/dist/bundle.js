(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id]
    const module = {
      exports: {}
    }
    function loacalRequire(filePath) {
      const id = mapping[filePath]
      return require(id)
    }
    fn(loacalRequire, module, module.exports)
    return module.exports
  }
  require(0)
})({

  "0": [function (require, module, exports) {
    "use strict";

    var _foo = require("./foo.js");

    console.log('index.js');
  }, { "./foo.js": 1 }],

  "1": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.foo = foo;

    var _boo = require("./boo.js");

    function foo() {
      console.log('foo.js');
    }
  }, { "./boo.js": 2 }],

  "2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.boo = boo;

    function boo() {
      console.log('boo');
    }
  }, {}],

})