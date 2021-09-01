# todo list for js-javascript-example-game-framework

## () - Asset Loader started
gameframe.js:
* gameframe.js should include an asset loader that uses XMLHttpRequest
* have a built in load state object that is created and added to sm.states when gameFrame.create is called
* have an assets option for fameFrame.create
* just go with a system where we have 0.png, 1.png, ect
* display a process bar while in load state

## () - object pool
pool.js:
* (done) having an object pool lib for this will be a must maybe start with the canvas example on it
canvas.js:
* have a canvas mod plugin for pool.js, and start off with a pool draw method
/demos/pool:
* start a demo of the new object pool feature

## ( done 09/01/2021 ) - additional gameFrame.create options
* (done) gameFrame.smCreateMain width and height options

## ( done 08/29/2021 ) - first state of framework
todo.md:
* (done) start todo list
* (done) have a /css folder for the css used for the canvas module
utils.js:
* (done) start a utils.js file with what I have in js-javascript-example-utils in the lib folder
* (done) remove the canvas methods from utils becuase I am using the canvas mod
canvas.js:
* (done) I will want to use my new canvas module as part of this framework so add that to the /lib folder
* (done) print draw method now built into canvas.js
gameframe.js:
* (done) start a /lib/gameframe folder that will contain the state of the game framework code so far
* (done) the utils sm methods should be a part of /lib/gameframe
* (done) have a canvas stack created with the canvas mod as a property of the sm object in gameframe.js
/demos/hello-world:
* (done) start first demo folder called hello-world
* (done) display hello world text in demo
* (done) have the text move back and forth making use of a state update loop
* (done) have pointer events have an effect on game state