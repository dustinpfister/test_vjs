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

## () - 0.4.0 - unit sub-types starting with enemy unit type
* I will want to have more than one type of the unit.type 'enemy' of course so then I am goinf to want to have some kind of sub type system
* maybe a standard like 'enemy.blob' to have a unit type of 'enemy' with a sub type of 'blob'
* when it comes to defining what a sub type is I might also want to have several 'variants' of a sub type such as 'enemy.blob.green'
* I think I will also want to have a way to set level by a type string also like 'enemy.blob.red.5'

```
{
  type : "enemy",                   // the unit type to append to "enemy"
  subType : "blob",                 // the sub type for the type collection "enemy.blob"
  variants : ["red", "green"],      // possible variants "enemy.blob.red", "enemy.blob.green"
  variantDefault : 1,               // default index in variants array to use if no variant type is given (default 0)
  rangeWeapons: [null, "fireball"], // ranged wepaons in the "items.weapon.ranged" db
  meleeWeapons: [null]
  sheetIndex: 5,                    // the sprite sheet index to use
  cellIndex: [0, 1],                // cell index values in the sheet for each variant
  create: function(api, enemy){     // what to do when unit is created for first time
      // by default a blob has no ranged weapon (rangeWeapons[0] === null)
      // but a red blob will be equiped with a 'fireball' ranged weapon
      if(blob.variant === "red"){
          blob.rangeWeapon = api.createRanged(1);
      }
  }
}
```

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
