# todo list for js-javascript-example-grid-game-unit-movement

## () - 0.x.0 - Cell movement animation
* see about having a move animation where the unit cell moves on a pps basis to the new cell location

## () - 0.x.0 - custom events
* start a new lib/events.js file that will be used by map.js
* new on method

## () - 0.x.0 - spell turnState
* have a new 'spell' turnState in which all units that have chosen to use a spell for there turn
* have spell turn state be prefromed last

## () - 0.x.0 - range turnState
* have a new 'range' turnState in which all units that have chosen to use a ranged attack will have there turn processed

## () - 0.7.0 - game.turnNumber, processTrun method unit baseAttack stat, and Melee Attack
* (done) move draw.js and game.js to root of js folder
* (done) code clean up of game.js
* (done) have an if block for when an enemy unit is clicked in gameMod.playerPointer 
* (done) have a game.turnNumber value and display that
* (done) game.turnNumber will step forward when the player moves, or clicks and enemy unit
* (done) have a processTrun method that is called in gameMod.update when moving forward to a new turn
* (done) I will want a game.turnState value that can be 'wait', 'start', 'move', 'melee', or 'end' for now
* (done) the 'wait' state just means that no action of any kind is to happen
* (done) the 'start' state means that the player has made a choice and a turn can start to be processed
* (done) the 'move' state will be prefromed first after start, all units that have moveTo values will have those values processed
* (done) the 'end' state will result in the game.turn number being steped by 1, and state will be set back to wait
* (done) the 'wait' turnState means that no action of any kind will be prefromed in the processTurn helper

* (done) display hp bars for player and enemey units with new drawHpBar helper in draw.js

* when the player dies set up a new game.

* in 'start' state enemy units should choose to fight rather than move when in range of the player
* after 'move' state is done the game.turnSate should change to 'melee'
* I should have a unit.meleeTarget prop that is a cellIndex to attack
* if a player or enemy unit is still at that location a melee attak will be prefromed on it, else it ran away and the turn is lost

* have a baseAttack stat for units
* when the player dies set up a new game.
* see about fixing bug where the player, or any unit can 'jump' over a unit in the way

## ( done 12/05/2021 ) - 0.6.0 - Other units
* (done) add other enemey units in the example
* (done) have a new type propery for baseUnit that defaults to null
* (done) have a getUnitsByType helper that will get all units in a map that match a given type
* (done) moveUnit helper function
* (done) start an update cycle in gameMod.update for enemy units
* (done) enemy units move to the player unit on each turn

## ( done 12/05/2021 ) - 0.5.0 - Unit cellsPerMove prop
* (done) fix to map glitch when going back to that map that the player just came from
* (done) have a cellsPerMove prop for a base unit object that is the max number of cells a unit can move per turn
* (done) have a unit.moveCells prop that is used to store an array of cell index vlaues to move
* (done) move player unit by a max of CellsPerMove on each click
* (done) see about fixing corner cell toMap bug
* (done) remove all game.targetCell code as I am not using that any more

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
