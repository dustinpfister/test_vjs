# todo list for js-javascript-example-grid-game-unit-movement

## () - 0.5.0 - Other units
* add other units in the example
* other units move to the player unit on each turn

## () - 0.4.0 - more than one map
* have more than one map object in game.js
* have wall around the ediges of a map but with openings that allow the player to move to another map

## () - 0.3.0 - path detection and objects
* (done) add path detection to map.js from what I worked out on my post on this subject
* (done) see about fixing the problem with circlular refernces by going with index values rather than refs
* (done) have objects in the map that are just objects in the way such as wall blocks

## ( done 12/02/2021 ) - 0.2.0 - frame rate cap
* (done) have a frame rate cap for the main loop

## ( done 12/02/2021 ) - 0.1.0 - touch support, text selection stoped
* (done) fix isshue where text in a page is being selected when clicking the canvas
* (done) marginX and marginY options for gameMod.create
* (done) add touch support in main.js

## ( done 04/02/2021 ) - 0.0.1 - some clean up
* (done) removed unused code from utils.js
* (done) display player position
* (done) adjust map setting so the map is more centered
* (done) make a pkg_0_0_1.html

## ( done 08/11/2020 ) - 0.0.0 - copy and past from canvas-example-game-monster-smash (v0.0.0)
* (done) have a basic map.js module that creates a map object of cells that can be formed into a grid
* (done) have a game.js module that where 1 map objects are created as part of the state
* (done) have a createUnit method in game.js that will create and return a base unit object
* (done) have a player object in game.js create with base stats, but also all player stats
* (done) have player object start in map index 0, and have that map index as the starting index
* (done) draw the player object in the map
* (done) add mouse, and touch events first.
* (done) new map get cell methods
* (done) gameMod update method started
* (done) move the player object with pointer events
* (done) make a pkg_0_0_0.html
