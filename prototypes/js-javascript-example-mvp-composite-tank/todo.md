# js-javascript-example-mvp-composite-tank


<!-- Maintenance -->



<!-- Additional Features -->

## () - r5 - Buff Components
* add first buff components that will not fire at units in any way, but provide some kind of buff

## () - r4 - Save states

## () - r3 - Loader

## () - r2 - Game Configure state

<!-- Minimum Viable Product -->

## () - r2 - Manual turrets
* add a new kind of manual turret that can be added to player units only
* manual turrets will only fire at locations in the canavs that the player will click or touch

## () - r1 - Composite units, auto turrets
* make it so that player units can be a composite of more than one disp object
* make the first kind of tank component be an auto turret

## () - r0 - crude start with clean pool normalized source code
* start with a clean up to date source code containing pool-normalized.js
* start a units-composite.js lib based off pool-normalized such as the one used in digital-art-invaders
* clean simple new game.js, draw.js, main.js
* have a units-player.js plugin for units-composite
* have a units-enemy.js plugin for units-composite
* have a units-shots.js plugin for units-composite
* have a game.playerUnits pool
* have a game.enemeyUnits pool
* have a game.shots pool
* have a single player tank fixed at the bottom of the canvas
* have enemy units spawn from the top of the canvas and move straight down to the bottom of the canvas
* when units get in rage of each other they shoot shots at each other
* when a enemy unit blocks a player unit movement forward will stop
