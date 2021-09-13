# js-javascript-example-nodejs-browser-share-code-module

These are the source code examples for my [blog post on a module pattern that will work in both nodejs as well as a web browser](https://dustinpfister.github.io/2021/04/14/js-javascript-example-nodejs-browser-share-code-module/). The basic idea is to feature test for the module global as a way to check if the module is running in a nodejs enviornment, if so pass the module.exports object as an argument for an IIFE. Else if the module global is not there assume that this is a client side javaScript enviornment and create a new object and attach it to the window object.

```js
(function (api) {
 
    api.publicMethod = function(mess){
        console.log(mess);
    };
 
}(  typeof module === 'undefined' ? this['utils'] = {} : module.exports ));

```