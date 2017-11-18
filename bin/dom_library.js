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

// queue will store all callbacks to be called once DOM contents loads
// until then, docLoaded being false will make sure those functions are pushed in
const queue = [];
var docLoaded = false;


window.$l = function (el) {
  if ((el) instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if ((el) instanceof Function){
    return gatherDocReadyCBs(el)
  } else {
    return stringCatch(el);
  }
};

  function gatherDocReadyCBs(el){
    if (!docLoaded) {
      queue.push(el)
    } else {
      el();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    docLoaded = true;
    queue.forEach((func) => func())
  });


  function stringCatch(el){
    let collection;
    if (el[0] === '<' && el[el.length - 1] === '>'){
      let element = document.createElement(el.slice(1, el.length-1));
      return new DOMNodeCollection([element])
    }
    let newArr = [];
    const nodeEls = document.querySelectorAll(el);
    nodeEls.forEach((el) => {
      newArr.push(el);
      // collection = new DOMNodeCollection(newArr);
    });
    return new DOMNodeCollection(newArr);
  }


  $l.ajax = function (options){
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'get',
      url: '',
      success: () => {},
      error: () => {},
      data: {},
    }

    const actualRequest = new XMLHttpRequest ();
    options = $l.extend(defaults, options);

    actualRequest.open(options.method, options.url)
    actualRequest.onload = (e) => {
      if (actualRequest.status === 200) {
        options.success(actualRequest.response)
      } else {
        options.error(actualRequest.response)
      }
    };

    actualRequest.send(JSON.stringify(options.data));

  };

$l.extend = (target, ...args) => {
  var objsKeys;
  for(let i=0; i < args.length; i++){
    objsKeys = Object.keys(args[i]);
    objsKeys.forEach((el) => {
      target[el] = args[i][el];
    });
  }
  return target;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
    this.callback = function(){};
  }

  each(callBack){
    this.htmlArray.forEach(callBack);
  }

  on(action, callback){
    this.htmlArray.forEach( (node) => {
      node.addEventListener(action, callback);
      node[action] = [callback];
    });
  };

  off(action){
    this.htmlArray.forEach( (node) => {
        node[action].forEach( callback => {
          node.removeEventListener(action, callback);
        })
    });
  };

  setColor(color){
    this.htmlArray[0].style.backgroundColor = '#' + color
  }

  html(string) {
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
    //must account for four cases, if the nodelist is empty, the elements are a string,
    // the elements are a jquery object, or an html element
    if (this.htmlArray.length === 0) return;
    if (typeof el === 'string') {
      this.htmlArray.forEach( (node) => {
        return node.innerHTML += el;
      });
    } else if (el instanceof HTMLElement) {
      this.htmlArray.forEach((node) => {
        return node.innerHTML += el.outerHTML
      })
    } else if (el.constructor.name === "DOMNodeCollection" ){
        this.htmlArray.forEach( (node) => {
          el.each((child) => {
            //will add a node to the end of the list of children of a parent node
            node.appendChild(child.cloneNode(true)) //cloning the child will make sure
            // it is attached to the document
          })
        })
    }
  }

  prepend(el){
    this.htmlArray.forEach( (node) => {
      el.each((child) => {
        let children = node.children
        //will add a node to the end of the list of children of a parent node
        node.insertBefore(child.cloneNode(true), children[0]) //cloning the child will make sure
        // it is attached to the document
      })
    })
  }

  attr(attrName, value) {
    // attr can take two, or one args
    if (value !== undefined) {
      this.htmlArray.forEach( (el) =>{
        el.setAttribute(attrName, value);
      });
    } else {
      return this.htmlArray[0].getAttribute(attrName)
    }
  }

  addClass(value) {
    this.htmlArray.forEach(element => element.classList.add(value));
  }

  removeClass(value) {
    this.htmlArray.forEach(element => element.classList.remove(value));
  }

  toggleClass(toggle){
    this.htmlArray.forEach(element => element.classList.toggle(toggle))
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

  removeChild(child){
    let index = this.htmlArray.indexOf(child)
    delete this.htmlArray[index]
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=dom_library.js.map