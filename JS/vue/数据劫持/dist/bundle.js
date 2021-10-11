/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./vue/index.js":
/*!**********************!*\
  !*** ./vue/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ "./vue/init.js");


function Vue(options){
    this._init(options);
}

Vue.prototype._init = function(options) {
    var vm = this;
    vm.$options = options;

    (0,_init__WEBPACK_IMPORTED_MODULE_0__.initState)(vm);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue);

/***/ }),

/***/ "./vue/init.js":
/*!*********************!*\
  !*** ./vue/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initState": () => (/* binding */ initState)
/* harmony export */ });
/* harmony import */ var _proxyData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxyData */ "./vue/proxyData.js");

function initState(vm) {
    var options = vm.$options;

    if(options.data){
        initData(vm);
    }
}

function initData (vm) {
    var data = vm.$options.data;
    
    data = vm._data = typeof data === "function" ? data.call(vm):data||{};
    
    for(let key in data){
        (0,_proxyData__WEBPACK_IMPORTED_MODULE_0__["default"])(vm,"_data",key)
    }
}



/***/ }),

/***/ "./vue/proxyData.js":
/*!**************************!*\
  !*** ./vue/proxyData.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function proxyData(vm,target,key) {
    Object.defineProperty(vm,key,{
        get(){
            console.log("代理拦截get");
            return vm[target][key];
        },
        set(newValue){
            console.log("代理拦截set");
            vm[target][key] = newValue; 
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxyData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./vue/index.js");
//node 导入模块，import会被转成require 
//首先寻找 是否有router.js或者router.node,
//如果没有看是否有router目录,
//如果有router目录会在其下寻找package.json文件,
//如果有则按照package的配置来导入
//如果没有package.json,看是否有index.js
//或者index.node,如果有就导入没有就失败

 
console.log("index.js");

let app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    el:"app",
    data(){
        return {
            title:"学生列表",
            classNum:'1',
            stutdnds:[
                {
                    name:"小米",
                    age:18
                },
                {
                    name:"小红",
                    age:20
                }
            ]
        }
    }
})

console.log(app);
console.log(app.title);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map