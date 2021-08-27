# js-javascript-example-canvas-module todo list

## () - virtual layer stack
* have a way to create a stack of layers that does not need a hard coded html element as a container
* this virtual layer stack class is what can be used to create sprite sheets with JavaScript code have an demo of this

## () - draw points method
* (done) include a canvasMod.pointsDraw method like that of the method worked out in my js-javascript-example-draw-points post
* I will want some kind of canvasMod.pointsCreate
* have at least some kind of demo of this feature when it comes to drawing

## ( done 08/25/2021 ) - Event attachment to a layer
* (done) have a way to attach and events object to a top canvas layer of a stack

## ( done 08/24/2021 ) - LayerObject, createLayer, and createLayerStack
* (done) start a createLayer helper method that will be used to create a single layerObject
* (done) a layer object contains a canvas element as one of the properties
* (done) have a canvasMod.createLayer method that will create and return a single layerObject
* (done) have a canvasMod.createLayerStack method that will create and return a collection of layerObjects

## ( done 08/24/2021 ) - first state of module
* (done) create a lib/canvas.js file that will be the canvas module
* (done) start out with the methods worked out in my js-javascript-example-utils for post folder
