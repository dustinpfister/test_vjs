# js-javascript-example-digital-art-unsteady-stars todo list

## Known bugs
* #0 - 


<!-- Maintenance -->

<!-- Additonal Features -->

<!-- MVP -->

### ( ) - r2 - units-buildings.js, units-attackers.js, and units-shots.js
* have a unitsMod.load method that can be used to load a new 'unit type'
* start a units-building.js file that will call the unitsMod.load method adding a 'building' unit type
* do the same for a units-attackers.js
* do the same for a units-shots.js
* attackers should spawn from outside of the canvas area and move to the center
* attackers will stop when they come into range of any buildings
* attackers will fire at buildings until they are destroyed

### ( ) - r1 - pool-normalized.js
* start a new pool-normalized.js file based off of pool.js
* the goal with this is to change the standard of each object where x and y refer to a center point

### ( ) - r0 - Start project, and units.js
* (done) start with the source code from r4 of unsteady stars digital art example
* loose the star.js file as I do not think I will be using that for this example
* have a clean, simple game.js file that is just a 'move' mode for the units
* start a units.js file that will be used to create any kind of unit for the game
* have a unitsMod.create method that will just create a regular array of units by default
* use units.js in place of what is worked out in game.js