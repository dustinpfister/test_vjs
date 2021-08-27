# js-javascript-example-canvas-module todo list

## () - virtual layer stack
* have a way to create a stack of layers that does not need a hard coded html element as a container
* this virtual layer stack class is what can be used to create sprite sheets with JavaScript code have an demo of this

## () - more pointsCreates methods 
* have a built in shape for pointsCreate that is just a circle

## () - canvasMod.load method
* have a canvasMod.load method
* the external object format can be used to add pointsMethods start with a circle method
* the exteranl object format can be used to add drawMethods have a demo of this

## ( done 08/27/2021  ) - basic animated demo
* (done) have just a basic animated demo using what I have to work with thus far
* (done) delete draw.js as I am not using it any more

## ( done 08/27/2021 ) - canvasMod.pointsCreate started
* (done) I will want some kind of canvasMod.pointsCreate method as a way to create the standard of object use with pointsDraw
* (done) have a pointsMethods object just like that of the drawMethods object
* (done) have a build in shape for pointsCreate that is just a Box

## ( done 08/27/2021 ) - drawMethods object, and canvasMod.draw
* (done) have a hard coded drawMethods object in canvas.js
* (done) let drawMethods.background be a built in draw method for this object
* (done) have a canvasMod.draw method that will take a key to use as the first argument 'background', or 'points'
* (done) let drawMethods.points be a built in draw method for this object
* (done) remove canvasMod.pointsDraw as it is now canvasMod.draw(stack, 'points', layerIndex, sm.game.points, 0, 0, options)

## ( done 08/27/2021 ) - canvasMod.pointsDraw method
* (done) include a canvasMod.pointsDraw method like that of the method worked out in my js-javascript-example-draw-points post
* (done) have at least some kind of demo of this feature when it comes to drawing

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
