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
      debugger
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
            node.appendChild(child.cloneNode()) //cloning the child will make sure
            // it is attached to the document
          })
        })
    }
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

module.exports = DOMNodeCollection;
