# js-javascript-example-utils todo list

## () - new getElementRelative method based off of what I made for my js-javascript-mouse post
* Start a new utils method based off of this:
```js
// get pos object with values relative to the given event object, 
// and element that defaults to e.target by default
var getElementRelative = function (e, elTarget) {
    var el = elTarget || e.target,
    bx = el.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size if a canvas element
    if(el.nodeName === 'CANVAS'){
        pos.x = Math.floor((pos.x / el.scrollWidth) * el.width);
        pos.y = Math.floor((pos.y / el.scrollHeight) * el.height);
    }
    return pos;
};
```
* the utils.getCanvasRelative method can then just call this passing what should be a canvas for elTarget

## () - new section on using a canvas Module

## () - new section on using a state machine, along with object pool, and canvas lib

## () - new section on objects pools module an utils
* start a new section that has to do with using the utils module with an object pool module

## () - simple mod method demo

## () - SM Utils methods demos

## () - XP Object demos
* start a demo of the XP Object

## () - simulate click method
* have a utils.simulateClick method based on what I have in js-event-object

## () - custom event system
* have utils custom events methods based off of what I made for my js-custom-event post

## ( done 09/30/2021 ) - format number example
* (done) have a utils.formatNumber method like the one worked out for js-array-slice

## ( done 09/30/2021 ) - fixed XP system
* (done) fixed xp system because of not calling deltaNext where needed

## ( done 09/05/2021 ) - utils.http
* (done) start a utils.http that is a basic http client

## ( done 09/05/2021 ) - utils.traverse
* (done) I started a utils.traverse object method in js-array-copy add this to the utils.js here

## ( done 09/01/2021 ) - log once method
* (done) add a log once method such as the one from js-javascript-module-object-literal
* (done) have a utils.log method
* (done) have a log.html demo

## ( done 08/31/2021 ) - utils.deepClone method
* (done) have a utils.deepClone method
* (done) have a demo for utils.deepClone
* (done) update post on utils with new method and demo
* (done) update js-array-copy post
* (done) update lodash clone deep post

## ( done 08/29/2021 ) - add SM utils methods made for js-javascript-example-orb-module
* (done) add new utils method from js-javascript-example-orb-module

## ( done 08/12/2021 ) - added XP object
* (done) just added XP object to utils.js based off of what I was using in the beach canvas game, refined in js-math-pow post
* (done) be sure to mention canvas-example-game-beach, and js-math-pow posts when editing

## ( done 08/09/2021 ) - simple bounding box demo
* (done) bounding box demo

## ( done 08/09/2021 ) - simple get canvas relative demo
* (done) simple demo of get canvas relative

## ( done 08/09/2021 ) - simple create canvas demo
* (done) have just a simple demo of the cerate canvas utils method

## ( done 08/07/2021 ) - utils.canvasPointerEvents method
* (done) start a utils.canvasPointerEvents method

## ( done 08/07/2021 ) - demos folder
* (done) start a demos folder where the aim is to create one or more simple demo projects that make use of this utils lib
* (done) have a simple distance method example that also makes use of create canvas, and get canvas relative

## ( done 08/06/2021 ) - first state of utils.js file
* (done) just create a first state of a utils module based off of the many others in canvas examples