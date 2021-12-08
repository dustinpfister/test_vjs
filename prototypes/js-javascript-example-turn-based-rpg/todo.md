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

## () - 0.8.0 - unit sub-types starting with enemy unit type
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

## () - 0.7.0 - inventory and drops
* an item can be a drop that will be shown in the grid along with "wall", and "enemy" types
* a unit will then need to have an unit.inventory property that will be another kind of standard object
* an inventory object should contain a slotCount property that is the max number of items a unit can carry.

## () - 0.6.0 - new unit type "item" Collection, weapons
* start a new type of unit called an 'item'

## () - 0.5.0 - keyboard events and more work on menu game mode
* add keyboard events
* use wasd keys to move a cell selector, and use the 'j' key to 'click' that cell
* when at an edge of a corner relavent wasd key press will result in a map change
* in menu game mode the 'ad' keys can be used to select an option and 'j' will result in a click
* in menu game mode the 'ws' keys can be used to switch between inner and outer rings
* a back button will also have a simular effect to just clicking outside of the button circle
* if at a corner the menu will always show up even with a short click
* when a button is clicked prefrom the animation is reverse and then call the button.onClick method
* when at the edege of a 'inner circle' options show up to go to the next map

## ( done 12/08/2021 ) - 0.4.0 - Game mode property, with 'map', and 'menu' mode
* (done) add an object pool librray to the js lib folder
* (done) start using the game.map mode to have more than one game mode in gameMod
* (done) the current game as it stands can be called 'map' mode
* (done) start a new 'menu' mode that can be used to switch between various 'options'
* (done) gameMod.update will need to be updated to take an sm object, not a game object
* (done) an sm object will need to be the 'state' inside spawn, and update methods for the options pool
* (done) draw.options method added to draw.js
* (done) I will want a gameMod.pointerEnd method that will be called in the game state pointerEnd event
* (done) rename gameMod.playerPointer to gameMod.pointerStart
* (done) the player can switch to the menu mode by long pressing anywhere for now
* (done) the player can switch back to the game by just not clicking a button when in menu mode
* (done) spawn buttons in gameMod.pointerEnd for now
* (done) the menu will show up as a collection of objects in a circle around the center of the canvas
* (done) the circles will then move out to a outer and or inner radius
* (done) with pointer events I can just click the option that I want in the circle of buttons
* (done) in the menu have a 'quit' option that will cause a return to the title state
* (done) draw desc for a button

## ( done 12/08/2021 ) - 0.3.0 - state machine started with title, and game states
* (done) start a state machine as \/js\/sm.js for now
* (done) have a \/js\/states folder with a state-game.js files
* (done) use sm.js in main loop to call update and draw method for a current state object.
* (done) state-game.js is just the game as it is before
* (done) update build.sh and index.html files to work with new collection of files
* (done) \/js\/main.js is now just a loop that works with a final sm object
* (done) add utils.boundingBox
* (done) have a sm.setState method, and a sm.stateObj prop that is a ref to the current state object
* (done) have a callStateEvent helper in sm.js
* (done) have a state-title.js for the sake of just having more than one state object for now
* (done) state-title.js is just a plain text title screen
* (done) just clicking on the title screen will case the app to progress to the game state for now

## ( done 12/08/2021 ) - 0.2.0 - unit.currentWeapon Object
* (done) adjust for canvas scale
* (done) unit can have a unit.currentWeapon object as a value that defaults to null for unarmed
* (done) use currentWeapon object in unitMod.meleeAttack method to figure additional deltas for a final attack array
* (done) currentWeapon object has an array property just like baseAttack of the unit object
* (done) final unit.attack value is just the sum of baseAttack, and the attack prop of the current weapon
* (done) start a setAttack helper in unitMod that set a final attack value for a unit
* (done) call setAttack in unitMod.create
* (done) call setAttack in each call of unitMod.meleeAttack

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
