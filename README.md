# DOMTime

Inspired by jQuery, [DOMTime](https://noejoaquin.github.io/DOMTime/) is a  JavaScript DOM manipulation library that
traverses the DOM using vanilla JavaScript.

Users can:
* Create `DOMNodeCollection` objects from `HTMLElement`s
* Traverse the DOM and alter elements on the page
* Construct DOM elements
* Create a queue of functions that will run when the DOM is fully loaded


### $l

The global variable `$l` is the crux upon which the DOMTime library functions. As a global
variable it serves as a wrapper for all of the DOMTime library methods.

The uses of `$l`:

* Takes an HTML element and return an array which is an instance of DOMNodeCollection, a custom object particular to the DOMTime library.
* Creates a `DOMNodeCollection` object from an unwrapped `HTMLElement`, wrapping it, and giving it access to the DOMTime methods.
* Can be used to store functions to be run when the DOM is fully loaded.

### DOM Traversal

`DOMNodeCollection` methods to navigate the DOM

`each`
Iterates through a DOMNodeCollection, passing a callback to be executed upon every element

`children`
Returns a DOMNodeCollection of all children of all nodes in the array

`parent`
Returns a DOMNodeCollection of the `parent`s of each of the nodes

`find`
Returns a DOMNodeCollection of all the nodes matching the selector passed in as an argument that
are descendants of the nodes

`remove`
Removes all the nodes in the DOMNodeCollection from the DOM

### DOM Manipulation

DOMNodeCollection methods to view and/or change DOM elements

`html`
Will return the `innerHTML` of the first node in the DOMNodeCollection if no argument is given. If it does receive an argument, it will become the `innerHTML` of each of nodes.

`empty`
Clears out the contents of all nodes in the DOMNodeCollection.

`append`
Can take a string, a DOMTime wrapped object, or an HTMLElement, and append it to each `DOMNodeCollection` element.

`attr`
Given one argument, the prescribed attribute for the first element in the `DOMNodeCollection` will be returned. Given two, the first is set as the attribute, while the second is made the  value for each `DOMNodeCollection` element.

`addClass`
The argument supplied will be added as a class to each `DOMNodeCollection` element

`removeClass`
The argument supplied will be removed from `DOMNodeCollection` element if it is a class for that element

### EventListeners

`on`
Adds an event handler to each `DOMNodeCollection` element

`off`
Removes event handler from each `DOMNodeCollection` element

### l.ajax

Sends HTTP Request, accepting a hash object with any assortment of the following attributes:

* method: HTTP Request method/type (default: 'GET')
* url: URL for HTTP Request (default: '')
* success: success callback
* error: error callback
* contentType: content type of HTTP Request (default:'application/x-www-form-urlencoded; charset=UTF-8')
