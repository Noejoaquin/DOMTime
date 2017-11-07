const DOMNodeCollection = require("./dom_node_collection.js");

// queue will store all callbacks to be called once DOM contents loads
// until then, docLoaded being false will make sure those functions are pushed in
const queue = [];
var docLoaded = false;

window.$l = function (el) {
  if ((el) instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if ((el) instanceof Function){
    gatherDocReadyCBs(el)
    // queue.push(el);
    // document.addEventListener("DOMContentLoaded", function () {
    //   queue.forEach(func => func.call());
  } else {
    return stringCatch(el);
  }

  gatherDocReadyCBs = (el) => {
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
    let newArr = [];
    const nodeEls = document.querySelectorAll(el);
    nodeEls.forEach((el) => {
      newArr.push(el);
      collection = new DOMNodeCollection(newArr);
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
