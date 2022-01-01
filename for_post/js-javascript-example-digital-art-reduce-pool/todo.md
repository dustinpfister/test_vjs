# js-javascript-example-digital-art-reduce-pool

### () - r3 - split mode
* when there is just one active object it will enter split mode
* in split mode the units will split over time until all units are active again
* once all units are active again all units will switch back to 'move' mode

### () - r2 - seek mode
* start a new 'seek' mode
* in seek mode a unit will use distnace and reduce to get a target
* when a target is found use Math.atan2 to update heading

### () - r1 - unit modes, and mass transfer over time
* start a UNIT_MODES object in game.js
* start out with a 'move' mode that is just the current behaviour of the units
* start a 'transfer' mode that is a new mode where a unit will be transferting its mass to a target unit
* when a transfer mode unit runs out of mass it will then purge

### ( done 12/31/2021 ) - r0 - first state of example
* (done) start out with pool.js file from turn based RPG example
* (done) start out with a utils.js with the canvas method and various other tools such as wrapNumber
* (done) new draw.js module started from the ground up
* (done) new game.js file that will crate and return the game state of the art project
* (done) the gameMod will contain an full object pool as game.units
* (done) when two units overlap one will remain and the other will not
* (done) for each purged unit a mass value will transfer to the unit that remains
* (done) display ver number
