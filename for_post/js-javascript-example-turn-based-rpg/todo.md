# todo list for js-javascript-example-grid-game-unit-movement

<!--****** **********
    KNOWN BUGS / ISSHUES / MISC CHANGES
********** *******-->
* (#0 done in r9) fix Weird bug with portals and walls when not setting game.mapIndex to portal.mi in setupGame helper in gameMod
* (#1) I should not have to have a setupGame2 method in gameMod
* (#2) I should have a main update loop for object pools
* (#3) Rename unit.children to unit.over in units.js, and make the changes in gameMod also
* (#4) have folders with README files for each lib
* (#5) Have demos for each lib as a way to enforce that each lib works as a stand alone project
* (#6) Pull code that has to do with the circle menu out of game.js and into its own lib folder

<!--****** **********
    The Library game world
********** *******-->

The idea of the library game world is to have a game world that acts as a portal to at least one if not more words that follow some kind of story.

## () rx - Start the library game world


<!--****** **********
    MISC IMPROVEMENTS
********** *******-->

## () - rx - Custom MAP EVENTS
* I will also want to be able to assign a function for onPlayerDeath and onNoEnemies that can be used to define custom logic

## () - rx - respawnPlayer map event
* respawnPlayer map event

## () - rx - Cell movement animation
* see about having a move animation where the unit cell moves on a pps basis to the new cell location

## () - rx - custom events.js file
* start a new lib/events.js file that will be used by map.js

## () - rx - spell turnState
* have a new 'spell' turnState in which all units that have chosen to use a spell for there turn
* have spell turn state be preformed last

## () - rx - range turnState
* have a new 'range' turnState in which all units that have chosen to use a ranged attack will have there turn processed
* see about fixing bug where the player, or any unit can 'jump' over a unit in the way

<!--****** **********
    MENU UI IMPROVEMENTS
********** *******-->

## () - rx - keyboard events
* add keyboard events
* when at an edge of a corner relevant wasd key press will result in a map change
* use wasd keys to move a cell selector, and use the 'j' key to 'click' that cell
* in menu game mode the 'ad' keys can be used to select an option and 'j' will result in a click
* in menu game mode the 'ws' keys can be used to switch between inner and outer rings

## () - rx - lib menu-circle.js, and pool.js improvements
* take code in game.js that has to do with the circle menu, and turn it into its own lin file
* use new menu-circle.js lib file in game.js
* have a main update loop for a pool object created with pool.js
* remove old circle menu code from game.js that is no longer used

<!--****** **********
    GAME WORLDS - world json files that make use of built in features the present different kinds of games
********** *******-->

## () - rx - The forest game world
  continue work on the world-forest.json file to make the kind of game mode that I have in mind with this. The general idea of the forest game world is that the player can enter at the main game level at home, and the enemies found in the forest will be of a similar level to that of the player. The units are all unarmed beast like units, but the player can take whatever gear that they want with them from the home world. So then the idea is to just have a world where the player can go to just do a little easy grinding if they would like to.

## () - rx - The caves game world

## () - rx - The home game world

<!--****** **********
    JSON - pixmap json files 
********** *******-->

## () - rx - pixmaps
* see about using the pixmap json standard that I worked out, as a way to add images

<!--****** **********
    UNIT SUB-TYPES - unit json files
********** *******-->

## () - rx - unit sub-types starting with enemy unit type
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

<!--****** **********
    ITEMS AND DROPS - item json files
********** *******-->

## () - rxx - make use of item-class.js
* make use of the item-class.js file from js-math-random for post folder

## () - rxx - enemy unit item drops, and enemy unit inventory
* when the player moves over an 'item' or 'itemStack' this should cause the 'circle menu' to show up
* a new button should show up in the circle menu called 'drops'
* clicking drops


## () - r16 - item json files, weapons
<!-- json/items-junk-weapons.json -->
* (done) start a new type of json file format for defining at least two items for the game
<!-- js/sm.js -->
* (done) I will need to add items-home.json to the lost of json files to load
<!-- js/game.js -->
* (done) fix bug where an enemy that dies over a group ends up deleteing the group
* button subtext
<!-- js/lib/units.js -->
* I will need a way to load items into the ITEMS global from json files
* set limit for number of items the player can carry in the pouch
* have an equip button in the circle menu that allows for the player to equip a weapon in the players pouch


## ( done 12/23/2021 ) - r15 - plyaer starting items, equip item in pouch
<!-- js/game.js -->
* (done) when the player drops the currentWeapon set the currentWeapon prop to null
* (done) start an equip button to MENUS.item
* (done) I will want a new wait mode for menuPool.data.mode
* (done) when then enter mode is complete the mode will progress to the 'wait' mode
* (done) I will want to be able to set the type of a button
* (done) an action type button should just call the onClick method, and clear activeButton back to null, and keep current mode in 'wait'
* (done) make BUTTON.item_equip an 'action' type button
* (done) when BUTTON.item_equip onClick is called, set game.player.currentWeapon to the item
<!-- js/lib/units.js -->
* (done) have a starting weapon for the player in the player pouch and make that the current weapon
<!-- js/draw.js -->
* (done) display current weapon info with at least base attack
* (done) display unarmed if the player has no weapon
* (done) in item menu I will need to display player.currentWeapon info
* (done) in item menu I will need to display menuOpt.item info

## ( done 12/21/2021 ) - r14 - player pouch, pickup and drop
<!-- js/game.js -->
* (done) meuKey defauts in main on each start
* (done) new startMenu helper
* (done) when an item button is clicked that item should be transfered to the players pouch, and the menu should exit
* (done) after exiting from pickup menuKey, the pickup menu will recreate with up to date buttons
* (done) if the group is empty clear the cell, and return to main menu key
* (done) I will need a MENUS.pouch
* (done) if the player has a pouch button that will show up in the main menu of the circle menu
* (done) generate a button for each item in the pouch
* (done) I will need a MENUS.item
* (done) I will want a menuPool.data.menuOpt
* (done) use menuPool.data.menuOpt to know what the current item is in the player pouch
* (done) from the MENUS.item menu the player can drop an item to the current cell, creating a new group if needed
<!-- js/draw.js -->
* (done) display item info with new lines array of menuPool

## ( done 12/19/2021 ) - r13 - new circle menu system with more than one menu
<!-- js/game.js -->
* (done) see about having an out animation when not clicking a button in menu mode
* (done) when the player is over a group have a pickup button show up in the circle menu
* (done) new MENUS const
* (done) I will want a menuPool.data.menuKey prop that will default to 'main'
* (done) the createMenu helper will need to be a main method that will call one of several menus in a new MENUS const
* (done) have a MENUS.main.buttonKeys that will create an array of hard coded button keys to use for the main menu
* (done) one click to circle menu if player is clicked for now
* (done) have a MENUS.pickup.buttonKeys method
* (done) I will need a MENUS.pickup.genButtons that will create buttons for each item in a current group that the player is over
* (done) have a createButtonDataObjects helper that will create an array of buttonData objects from buttonKeys and calling genButtons
* (done) changes will need to be made to the createMenu helper to make use of a genButtons method as another way to create menu buttons
* (done) remove old code for creating buttons that is no longer used
* (done) in pickup menu key, generate a button for each item in the group
* (done) have a to main button in pickup menu

## ( done 12/18/2021 ) - r12 - ITEM global and perLevel object in units.js
<!-- js/lib/utils.js -->
* (done) new utils.getPath method
<!-- js/lib/units.js -->
* (done) have a unit.pouch prop that will serve as an inventory for a unit
* (done) start a new type of unit called an 'item' in lib\/units.js
* (done) start an ITEMS global
* (done) item.subType and item.data are now base item object props
* (done) update UNIT_TYPES.group.create so that it will create and append Items to the pouch array of the group
* (done) the contents of a group is based on what is given by way of an options object when calling create
* (done) I am going to need a new perLevel object for a unit that contains values that will be used to set stats based on level
* (done) single perLevel object for player
* (done) single perLevel object for enemies (for now)
* (done) the perLevel object should be part of an itemRect object in the ITEMS global
* (done) use itemRect data and itemOpt level prop to set base attack of a weapon in the group
* (done) starting weapon for the player using new subType and level options
* (done) starting weapon for all enemies
* (done) I will want a setStat.baseDefense method
<!-- world-home.json -->
* (done) work out new object standard to define the nature of a mapGroup

## ( done 12/16/2021 ) - r11 - new unit types 'group', and 'item' started
<!-- js/lib/units.js -->
* (done) start a new 'group' unit type that will act as a container to allow more than one unit on a cell
* (done) unit.children prop is now a base unit prop
* (done) start a new 'item' unit type
* (done) I will want to have a walkable prop for all units
* (done) a group should be walkable like portals
<!-- js/game.js -->
* (done) I will want a setUp groups helper just like with setupPortals
* (done) make to so that adding groups from a world map is part of the setup process
* (done) when a player or enemy unit moves over a group, that group should be in the children prop of that unit
* (done) each time a unit moves to a new cell it will unload a child that it has to the cell it is leaving
* see about doing the same with portals as with groups where the portal becomes a child of the unit
<!-- js/lib/draw.js -->
* (done) update drawCell helper to make it so it will draw stroke lines for all units
* (done) update draw.js to make it so that a group is shown as a black rec outline for now
<!-- world-home.json -->
* (done) have a worldMap.mapGroups array just like worldMap.mapPortals but with groups

<!--****** **********
    utils.XP - level objects for player and enemy units
********** *******-->

## ( done 12/15/2021 ) - r10 - level objects for player and enemy units
<!-- js/lib/utils.js -->
* (done) add utils.XP from Clucker 0.7.1
<!-- js/lib/units.js -->
* (done) use utils.XP to create a unit.levelObj for all base units
* (done) have a unitMod.giveXP public method
* (done) have unit.levelObj have an impact on hit points
* (done) have unit.levelObj effect base Attack
* (done) have unit.levelObj effect base defense
<!-- js/game.js -->
* (done) use unitMod.giveXP in processMelee in gameMod
<!-- js/draw.js -->
* (done) draw getY helper for draw.info method
* (done) display level for player in draw.info
* (done) display hp / maxHp for player
* (done) display base attack
* (done) display base defense for player

<!--****** **********
    JSON LOADER - world map json files
********** *******-->

## ( done 12/15/2021 ) - r9 - onMapLeave, onMapEnter, onWorldMapLeave, and onWorldMapEnter map events
<!-- js/game.js -->
* (done) add support for a worldMap.onMapLeave and enter methods
* (done) add support for worldMap.onWorldMapLeave and enter methods
* (done) logging more into for built in 'nothing' map event
* (done) have a applyMapStringsToMaps helper and use that in setUpGame first
* (done) start a MAP_EVENTS.respawnWorldEnemies event that by default will re-spawn all world enemies except the current map
* (done) had to work out a whole other kind of setupGame block of code in MAP_EVENTS.respawnWorldEnemies
* (done) see if the weird bug with the wall in map index 0 can be fixed
<!-- world-home.json -->
* (done) worldMap.onMapLeave and enter events should be 'nothing' for world-home.json
<!-- world-forest.json -->
* (done) worldMap.onMapLeave should be 'respawnWorldEnemies' for world-forest.json
* (done) worldMap.onNoEnemies should be 'nothing'
<!-- bugs -->
* (done) fixed bug #0 

## ( done 12/14/2021 ) - r8 - new conditions for end game, player death, spawning
<!-- js/game.js -->
* (done) processTurn end turnState should make use of a worldMap.onPlayerDeath prop
* (done) processTurn end turnState should make use of a worldMap.onNoEnemies
* (done) default for worldMap.onNoEnemies could be 'hardMapReset' which is what the deal is all ready
* (done) default for worldMap.onPlayerDeath could be a 'softMapReset of the current world map
* (done) I will want to have 'nothing' option for onNoEnemies and onPlayerDeath
* (done) have a parseMapEvent helper
* (done) the parseMapEvent helper will return an object from a string containing a method, options, and so forth
* (done) callMapEvent helper
* (done) change world map helper
* (done) I will want to have a 'toMap:dataKey,mi,x,y' short hand for these methods along with a toMap method
<!-- world-home.json -->
* (done) worldMap.onPlayerDeath should be a 'softMapReset'
* (done) worldMap.onNoEnemies should be 'nothing'
<!-- world-forest.json -->
* (done) redo the layout of world-forest.json
* (done) set worldMap.onPlayerDeath to 'toMap:wm_home,0,2,3'

## ( done 12/13/2021 ) - r7 - JSON - loader improvements, gameMOD.VOID\_WORLD object
<!-- state.loader -->
* (done) switch directly to title state in the event of any error in update hook in loader state
* (done) make sure that the void world will be used if error count is greater than zero in game state
* (done) in start hook check location object to see if the script is running in the file protocol, if so jump to title
<!-- The void world that game drops into when running in file protocol, or if there is an loading error -->
* (done) mapStrings generator helper for gameMod.create for when no map String is given for now
* (done) have a standard hard coded gameMod.VOID\_WORLD
* (done) if one or more errors happen while loading files in the loader state drop into the void world.
<!-- sm.js -->
* (done) sm.startLoop method in place of loop in main.js
* (done) have a main-pkg.js in place of hard coded script tag in bottom.txt
* (done) have a main-index.js in place of hard coded script tag in index.html

## ( done 12/13/2021 ) - r6 - JSON folder, server.js, loader state, world maps
<!-- loader state -->
* (done) I will want end and start hooks for the sm object
* (done) start a sm.data object that will contain all data objects loaded by way of json
* (done) have an sm.loader object that contains a base url, and a list of files to load at that base url
* (done) start a new states-loader.js file that will be a simple json file loader state
* (done) just base the states-loader off of what I worked out in gameframe.js in Clucker for now as that seems to work well
<!-- World map standard -->
* (done) start a root json folder that will contain all the json files for the game
* (done) start a new world map json file standard
* (done) have a world-home.json file that will be the start of the main home start world for the game
* (done) have a world-forest.json file that is the start of a forest game mode idea that I will be working on it a future revision
<!-- Portals -->
* (done) have a way to define portals in a game map, giving them data that defines what worldmap, mapindex and location to use
* (done) take a worldMap object as an argument for gameMod.create
* (done) game.marginX and game.marginY
* (done) update setupGame helper to use props like game.worldMap.mapStrings over props like game.mapStrings
* (done) use game.worldMap.mapWorldWidth over game.mapWorldWidth in getToIndexOptions helper
* (done) do alway with game.mapStrings, and game.mapWorldWidth in favor of game.worldMap object
* (done) update createCleanMaps helper to use game.worldMap over options object given to gameMod.create
* (done) have a unit type for portals
* (done) update draw.js to display a portal as a purple box for now
* (done) update gameMod.create and gameMod.setupGame to use worldMap.portals array to create portal units
* (done) updated moveUnit helper in gameMod to allow the player object to move over a portal
* (done) have a game.sm ref
* (done) use game.sm.data in moveUnit helper to set game.worldMap to the map given in portalUnit.data
* (done) get portals working using word-home and world-forest world map files
* (done) have a way to make it so the player unit spawns near the portal rather than the usual start location of the world map
<!-- booting for index.html and pkg.html files -->
* (done) start a boot script tag that will just set a relative path to JSON assets and start the main app loop
* (done) path to json will be './json' for main index.html files, and will need to be '../json' for pkg_rx.html files


<!--****** **********
    UI
********** *******-->

## ( done 12/09/2021 ) - r5 - More work on menu game mode
* (done) createMenu helper and BUTTON const in game.js
* (done) add a back button that will also have a similar effect to just clicking outside of the button circle
* (done) get oc and ic count in createMenu
* (done) when a button is clicked preform the animation is reverse and then call the button.onClick method
* (done) update getToMap helper to append and array of objects that contain mi,x,y, and dir like this:
```
[
  {mi:7, x:8, y:0, dir: 'south'},
  {mi:5, x:0, y:6, dir: 'east'}
]
```
* (done) use new toMap options array in place of older system
* (done) use new toMap options array to crate proper dir buttons in menu
* (done) remove old code that has to do with to map object in game.js
* (done) if at a corner the menu will always show up even with a short click

## ( done 12/08/2021 ) - r4 - Game mode property, with 'map', and 'menu' mode
* (done) add an object pool library to the js lib folder
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

## ( done 12/08/2021 ) - r3 - state machine started with title, and game states
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

## ( done 12/08/2021 ) - r2 - unit.currentWeapon Object
* (done) adjust for canvas scale
* (done) unit can have a unit.currentWeapon object as a value that defaults to null for unarmed
* (done) use currentWeapon object in unitMod.meleeAttack method to figure additional deltas for a final attack array
* (done) currentWeapon object has an array property just like baseAttack of the unit object
* (done) final unit.attack value is just the sum of baseAttack, and the attack prop of the current weapon
* (done) start a setAttack helper in unitMod that set a final attack value for a unit
* (done) call setAttack in unitMod.create
* (done) call setAttack in each call of unitMod.meleeAttack

## ( done 12/07/2021 ) - r1 - unitMod.meleeAttack method, baseAttack, baseDefense 
* (done) have a baseAttack stat for units in the from of an array such as [5, 8] which means a base attack of 5 to 8
* (done) start a unitMod.meeleeAttack method that takes a attacker a target argument
* (done) use unitMod.meeleeAttack and unit.baseAttack for melee attacks
* (done) have an roll for each attack and use a random attack value between the range of baseAttack
* (done) have a baseDefense stat for units just like baseAttack
* (done) figure a defense value for the target just like with base attack
* (done) subtract defense value from attack value to get a final attack value
* (done) final attack value can not go below zero

## ( done 12/07/2021 ) - r0 - units.js lib
* (done) start out with the source code from js-javascript-example-grid-unit-movement r7
* (done) start a new unit.js lib
* (done) start with using a unitMod.create('player') method in place of createPlayerUnit
* (done) use a unitMod.create('enemy') method in place of createEnemyUnit in game.js
* (done) use a unitMod.create('wall') method in place of createWallUnit in game.js
* (done) remove old create unit code from game.js
