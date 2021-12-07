# todo list for js-javascript-example-grid-game-unit-movement

## () - 0.4.0 - Cell movement animation
* see about having a move animation where the unit cell moves on a pps basis to the new cell location

## () - 0.3.0 - custom events
* start a new lib/events.js file that will be used by map.js
* new on method

## () - 0.2.0 - spell turnState
* have a new 'spell' turnState in which all units that have chosen to use a spell for there turn
* have spell turn state be prefromed last

## () - 0.1.0 - range turnState
* have a new 'range' turnState in which all units that have chosen to use a ranged attack will have there turn processed
* see about fixing bug where the player, or any unit can 'jump' over a unit in the way

## () - 0.1.0 - unitMod.meleeAttack method 
* have a baseAttack stat for units
* use unit.baseAttack for melee attacks
* start a unitMod.meeleeAttack method

## ( done 12/07/2021 ) - 0.0.0 - units.js lib
* (done) start out with the source code from js-javascript-example-grid-unit-movement r7
* (done) start a new unit.js lib
* (done) start with using a unitMod.create('player') method in place of createPlayerUnit
* (done) use a unitMod.create('enemy') method in place of createEnemyUnit in game.js
* (done) use a unitMod.create('wall') method in place of createWallUnit in game.js
* (done) remove old create unit code from game.js
