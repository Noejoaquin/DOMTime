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
