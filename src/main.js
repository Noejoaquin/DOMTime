const DOMNodeCollection = require("./dom_node_collection.js");

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
    debugger
    return stringCatch(el);
  }
};

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
