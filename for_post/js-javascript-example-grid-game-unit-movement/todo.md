# todo list for js-javascript-example-grid-game-unit-movement

## () - 0.6.0 - Other units
* add other units in the example
* other units move to the player unit on each turn

## () - 0.5.0 - Unit cellsPerMove prop
* (done) fix to map glitch when going back to that map that the player just came from
* see about fixing corner cell toMap bug
* have a cellsPerMove prop for a base unit object that is the max number of cells a unit can move per turn

## ( done 12/04/2021 ) - 0.4.0 - more than one map
* (done) have more than one map object in game.js
* (done) have wall around the border of a map but with openings that allow the player to move to another map
* (done) have a way to detect if the player unit is at a map border and if so clicking a player unit will cause a map index change
* (done) place player unit in right location when switching to new map by having a toMap object in place of toIndex
* (done) the toMap object can contain a map index along with a desired position in the map.
* (done) break down draw.js
* (done) have a drawCell helper in draw.js

## ( done 12/03/2021 ) - 0.3.0 - path detection and objects
* (done) add path detection to map.js from what I worked out on my post on this subject
* (done) see about fixing the problem with circlular refernces by going with index values rather than refs
* (done) have objects in the map that are just objects in the way such as wall blocks
* (done) get player cell helper in game.js
* (done) playerPointer gameMod method
* (done) change all instances of game.maps\[0\] to game.maps\[game.mapIndex\]
* (done) system for map data

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
