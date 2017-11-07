/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

// core function should return an instance of DOMNodeCollection.. yes?
window.$l = function (el) {
  const queue = [];
  if ((el) instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if ((el) instanceof Function){
    queue.push(el);
    document.addEventListener("DOMContentLoaded", function () {
      // debugger
      queue.forEach(func => func.call());
    });
  } else {
    return $l(el);
  }

  function $l(el){
    let collection;
    let newArr = [];
    const nodeEls = document.querySelectorAll(el);
    nodeEls.forEach((el) => {
      newArr.push(el);
      collection = new DOMNodeCollection(newArr);
    //   newArr.push(new DOMNodeCollection(el));
    //   new DOMNodeCollection(newArr);
    });
    return collection;
  }

  $l.extend = function (target, ...args) {
    var objsKeys;
    for(let i=0; i < args.length; i++){
      objsKeys = Object.keys(args[i]);
      objsKeys.forEach((el) => {
        target[el] = args[i][el];
      });
    }
    return target;
  };

  $l.ajax = function (options){};

};


$l(() => {
  // debugger
  console.log("it works!");
});

// window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  html(string) {
    // debugger
    if(!string){
      return this.htmlArray[0].innerHTML;
    }
    if (typeof string === 'string'){
      this.htmlArray.forEach( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty(){
    this.htmlArray.forEach( (el) => {
      el.innerHTML = '';
    });
  }

  append(el){
    this.htmlArray.forEach( (node) => {
      node.innerHTML += el;
    });
  }

  attr(attrName, value) {
    this.htmlArray.forEach( (el) =>{
      el.setAttribute(attrName, value);
    });
  }

  addClass(value) {
    this.attr('class', value);
  }

  removeClass() {
    this.htmlArray.forEach( (el) => {
      el.removeAttribute('class');
    });
  }

  children() {
    const kids = [];
    this.htmlArray.forEach( (el) => {
      let childs = el.children;
      Array.from(childs).forEach( (kid) => kids.push(kid));
    });
    return new DOMNodeCollection(kids);
  }

  parent(){
    const folks = [];
    this.htmlArray.forEach( (el) => {
      if ( folks.includes(el.parentNode) ) {
        return;
      } else {
        folks.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(folks);
  }

  find(selector){
    let final = [];
    this.htmlArray.forEach((el) => {
      final = final.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(final);
  }

  remove() {
    this.htmlArray.forEach(el => {
      el.parentNode.removeChild(el);
    });
    this.htmlArray = [];
  }

}

DOMNodeCollection.prototype.on = function(action, callback){
  this.htmlArray.forEach( (node) => {
    node.addEventListener(action, callback);
    node[callback] = callback;
  });
};

DOMNodeCollection.prototype.off = function(action, callback){
  this.htmlArray.forEach( (node) => {
    node.removeEventListener(action, node[callback]);
  });
};



module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=dom_library.js.map