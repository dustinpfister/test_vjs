# js-javascript-example-digital-art-invaders todo list

## Known bugs
* #0 - 


<!-- Maintenance -->

<!-- Additonal Features -->

### () - r6 - loader.js and sprite sheets
* add a loader.js file that will load sprite sheets
* have a sprite sheet to skin buildings
* have a sprite sheet to skin attackers
* have a sprite sheet to skin shots

### () - r5 - unit subtypes
* have subtypes for buildings
* have subtypes for attackers

### () - r4 - units-info.js
* start a units-info.js file to add an 'info' unit type
* use the info unit type to display damage each time a unit is hit 

<!-- MVP -->

### ( ) - r3 - buildings fire back
* make it so that buildings will fire back at attackers

### ( ) - r2 - first unit types, units-buildings.js, units-attackers.js, and units-shots.js
* have a unitsMod.load method that can be used to load a new 'unit type'
* start a units-building.js file that will call the unitsMod.load method adding a 'building' unit type
* do the same for a units-attackers.js
* do the same for a units-shots.js
* buildings will just spawn for now
* attackers will select a building that is the building that is the near using distance formula
* attackers should spawn from outside of the canvas area and move to the center
* attackers will stop when they come into range of any buildings
* attackers will fire at buildings until they are destroyed
* when an attacker gets to the center of the canvas it will purge and thus will be able to respawn

### ( ) - r1 - pool-normalized.js
* (done) start a new pool-normalized.js file based off of pool.js
* (done) the goal with this is to change the standard of each object where x and y refer to a center point
* (done) use pool-normalized in place of pool.js
* (done) make createDisp a public method
* (done) bool argument for poolMod.getActiveObjects
* (done) use poolMod.getActiveObjects in poolMod.getActiveCount
* (done) bool argument for poolMod.getActiveCount
* (done) new poolMod.distance
* (done) new poolMod.centerDisp method

* new poolMod.getAngleTo

* (done) make it so that poolMod.purge takes an object as the first argument
* make it so that each display object a ref to its pool
* make it so that poolMod.purge does not need to be given a pool argument as it will use disp.pool
* (done) group all public methods into 'pool' and 'disp' areas

### ( done 01/11/2022 ) - r0 - Start project, and units.js
* (done) start with the source code from r4 of unsteady stars digital art example
* (done) loose the star.js file as I do not think I will be using that for this example
* (done) have a clean, simple game.js file that is just a 'move' mode for the units
* (done) start a units.js file that will be used to create any kind of unit for the game
* (done) have a unitsMod.create method that will just create a regular array of units by default
* (done) use units.js in place of what is worked out in game.js

