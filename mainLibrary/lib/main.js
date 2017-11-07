const DOMNodeCollection = require("./dom_node_collection.js");

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
