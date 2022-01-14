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

### ( ) - r3 - shots, and buildings attacking back
<!-- shots -->
* (done) attackers will spawn shots when in attackTarget mode
* (done) shots will need to move by set values when spawned
* (done) shots will need to check if they hit a target or not
* (done) can set attack value when spawning a shot
* (done) can set shot color when spawning a shot
<!-- buildings -->
* make it so that buildings will fire back at attackers

### ( done 01/13/2022 ) - r2 - first unit types, units-buildings.js, units-attackers.js, and units-shots.js
* (done) have a unitsMod.load method that can be used to load a new 'unit type'
* (done) start a units-attackers.js
* (done) make it so that there is a pool.data.modes object that will be a ref to modes for the type
* (done) I will want to use this pool.data.modes object in a new unitsMod.changeMode method
* (done) use unitsMod.changeMode in units-attacker.js
* (done) do away with the built in unit options, units.js will just be a lib that I want to use at least one plug-in with
* (done) have a drawDisp helper in draw.js
* (done) start a units-building.js file that will call the unitsMod.load method adding a 'building' unit type
* (done) do the same for a units-shots.js
* (done) buildings will just spawn for now
* (done) attackers should spawn from outside of the canvas area
* (done) from idle mode enter a get target mode
* (done) have a getTarget mode in which a unit will start with no ref to a building
* (done) in getTarget mode use utils.distance to sort an array of active buildings
* (done) once a target is set in seekTarget mode change to a moveToTarget mode
* (done) in moveToTarget mode check that the current target is still active
* (done) in the event that the target is no longer active go back to idle mode
* (done) in the event that that target is in range enter attackTarget mode
* (done) There should be a spawnRate for buildings
* (done) Attackers should move back out of range when there are no targets
* (done) buildings will need to have hp values
* (done) in draw.js if a unit has a data.hp value then display an hp bar
* (done) attackers should have a attack stat
* (done) attackers should have a fireRate stat
* (done) make it so that an attacker will deduct hp from a building
* (done) when a building losses all hp it will need to purge

### ( done 01/12/2022 ) - r1 - pool-normalized.js
* (done) start a new pool-normalized.js file based off of pool.js
* (done) the goal with this is to change the standard of each object where x and y refer to a center point
* (done) use pool-normalized in place of pool.js
* (done) make createDisp a public method
* (done) bool argument for poolMod.getActiveObjects
* (done) use poolMod.getActiveObjects in poolMod.getActiveCount
* (done) bool argument for poolMod.getActiveCount
* (done) new poolMod.distance
* (done) new poolMod.centerDisp method
* (done) new poolMod.getAngleTo
* (done) make it so that poolMod.purge takes an object as the first argument
* (done) group all public methods into 'pool' and 'disp' areas
* (done) utils.radToDeg
* (done) utils.degToRad
* (done) make it so that each display object a ref to its pool
* (done) make it so that poolMod.purge does not need to be given a pool argument as it will use disp.pool

### ( done 01/11/2022 ) - r0 - Start project, and units.js
* (done) start with the source code from r4 of unsteady stars digital art example
* (done) loose the star.js file as I do not think I will be using that for this example
* (done) have a clean, simple game.js file that is just a 'move' mode for the units
* (done) start a units.js file that will be used to create any kind of unit for the game
* (done) have a unitsMod.create method that will just create a regular array of units by default
* (done) use units.js in place of what is worked out in game.js

