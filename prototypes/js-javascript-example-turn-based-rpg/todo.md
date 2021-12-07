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
* see about fixing bug where the player, or any unit can 'jump' over a unit in the way



<!--****** **********
    UNITS
********** *******-->

## () - 0.3.0 - unit Enemy sub-types

## () - 0.2.0 - unit.meleeWeapon Object
* unit can have a unit.meleeWeapon object as a value that defaults to null for unarmed
* use meleeWeapon object in unitMod.meleeAttack method to figure additional deltas for a final attack range
* meleeWeapon object has an array property just like baseAttack of the unit object
* final unit.attack value is just the sum of baseAttack, and the attackProp of the weapon
* start a setAttack helper in unitMod that set a final attack value for a unit
* call setAttack in unitMod.create
* call setAttack in each call of unitMod.meleeAttack

## ( done 12/07/2021 ) - 0.1.0 - unitMod.meleeAttack method, baseAttack, baseDefense 
* (done) have a baseAttack stat for units in the from of an array such as [5, 8] which means a base attack of 5 to 8
* (done) start a unitMod.meeleeAttack method that takes a attacker a target argument
* (done) use unitMod.meeleeAttack and unit.baseAttack for melee attacks
* (done) have an roll for each attack and use a random attack value between the range of baseAttack
* (done) have a baseDefense stat for units just like baseAttack
* (done) figure a defense value for the target just like with base attack
* (done) subtract defelse value from attack value to get a final attack value
* (done) final attack value can not go below zero

## ( done 12/07/2021 ) - 0.0.0 - units.js lib
* (done) start out with the source code from js-javascript-example-grid-unit-movement r7
* (done) start a new unit.js lib
* (done) start with using a unitMod.create('player') method in place of createPlayerUnit
* (done) use a unitMod.create('enemy') method in place of createEnemyUnit in game.js
* (done) use a unitMod.create('wall') method in place of createWallUnit in game.js
* (done) remove old create unit code from game.js
