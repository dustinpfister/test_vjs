# js-javascript-example-player-unit-grid

* (done) copy over code from js-javascript-example-map-system-simple
* (done) remove code that has to do with mapMod from main.js, but keep the same state with the state machine
* (done) have a small grid area in which the player can place units that is say, 3 * 3 "units" in size
* (done) a "unit" can just be a set 32 by 32 px area, a unit can just be snaped into place in this area

* work out new system where unit.data.target is a position and not an angle
* have shots move by going to the target over a number of frames, and have shot speed be set by a frames per second value

* work out more than one type of player unit, and make the current player controled turret a 'manual' unit
* have a single 'auto' unit that is like the manual turret, but will fire on enemies on its own
* speaking of enemies have an enemy unit pool
