# js-javascript-example-digital-art-reduce-pool todo list

## Known bugs
* #0 - weird bug that has to do with adjustment of postion


### - r4 - wait to split
* (done) make it so that the single unit that remains enterting split mode will not just split right away by adding  a delay in time for it
* (done) make it so that the single unit will move to a location around the center of the canvas and split there
* (done) see about making it so that the single unit will not always end up in the bottom right corner

* new transparent look
* colors for units

### (done 01/03/2022) - r3 - seek units, unit mass fix
* (done) start a new seek helper function
* (done) use new seek unit helper in move mode
* (done) start new random pps helper and use it in spawn unit as well as in move mode
* (done) start a chasePPS helper and use it in mode mode
* (done) const for split delay
* (done) const for chase pps bounus
* (done) use Math.atan2 in place of just setting heading
* (done) unit mass per const
* (done) fix total mass bug in split mode

### ( done 01/02/2022 ) - r2 - split mode, transfer rate
* (done) draw info method
* (done) when there is just one active object it will enter split mode
* (done) in split mode the units will split over time until all units are active again
* (done) have a UNIT TRANSFER RATE const
* (done) use new UNIT TRANSFER RATE const in transfer mode when it comes to having an amount of mass to add to a target
* (done) have a game.totalMass prop and display that with draw.info
* (done) half mass value and remainder
* (done) once all units are active again all units will switch back to 'move' mode
* (done) start a update size and positon by mass helper and use it in transfer mode
* (done) see about adjusting transfer mode potions so that units move to center of unit rather than upper left corner
* (done) make it so that there is a delay before all units go back to move mode in split mode
* (done) make it so that in split up mode units spawn from a parent unit

### ( done 01/01/2022 ) - r1 - unit modes, and mass transfer over time
* (done) start a UNIT_MODES object in game.js
* (done) start out with a 'move' mode that is just the current behaviour of the units
* (done) start a 'transfer' mode that is a new mode where a unit will be transferting its mass to a target unit
* (done) when a transfer mode unit runs out of mass it will then purge
* (done) set heading of unit to that of the target in transfer mode
* (done) alpha effect for transfer units
* (done) have distance of transfer mode unit reduce twords that of the target

### ( done 12/31/2021 ) - r0 - first state of example
* (done) start out with pool.js file from turn based RPG example
* (done) start out with a utils.js with the canvas method and various other tools such as wrapNumber
* (done) new draw.js module started from the ground up
* (done) new game.js file that will crate and return the game state of the art project
* (done) the gameMod will contain an full object pool as game.units
* (done) when two units overlap one will remain and the other will not
* (done) for each purged unit a mass value will transfer to the unit that remains
* (done) display ver number
