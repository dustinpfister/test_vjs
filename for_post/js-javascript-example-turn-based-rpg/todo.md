# todo list for js-javascript-example-grid-game-unit-movement

<!--****** **********
    KNOWN BUGS / ISSUES / MISC CHANGES WANTED
********** *******-->
* (#0 done-r009) fix Weird bug with portals and walls when not setting game.mapIndex to portal.mi in setupGame helper in gameMod
* (#1) I should not have to have a setupGame2 method in gameMod
* (#2) I should have a main update loop for object pools
* (#3) Rename unit.children to unit.over in units.js, and make the changes in gameMod also
* (#4) have folders with README files for each lib
* (#5) Have demos for each lib as a way to enforce that each lib works as a stand alone project
* (#6) Pull code that has to do with the circle menu out of game.js and into its own lib folder
* (#7) smooth unit animation when it comes to movement from one cell to another
* (#8) Fix bug where an enemy will spawn at the player start location
* (#9) Fix bug where player attack will not update until next attack when switching weapons
* (#10) tell the user that an item can not be dropped when in such a situation
* (#11) strange outcome when setting buttonDATA.ta in createMenu helper in gameMod
* (#12 done-r019) change color of drop item button to red when player can not drop an item
* (#13) getDropObj will not create or add under player and enemy cells
* (#14) fix drop map cary over bug where enemy item drops cary over to the next map with the player unit

<!--****** **********
    World MENUS and new worlds
********** *******-->

## () - r29 - Start world menu system
* start a new world menu system that will pop up each time the player enters a portal to a new world from home
* In this world menu the player will know what classes of items there are in terms of drops
<!-- json/world-forest.js -->
* for the forest make it so the player can set the level range of enemies
* higher level enmeies means better item drops

<!--****** **********
    RANGE WEAPONS
********** *******-->

## () - r28 - start range weapons
* start range weapons

<!--****** **********
    ARMOR ITEMS
********** *******-->

## () - r27 - start armor items
* I will want to add armor items

<!--****** **********
    SAVE STATE MENU - unit json files
********** *******-->

## () - r26 - save state menu
* start a new save state menu

<!--****** **********
    UNIT SUB-TYPES - unit json files
********** *******-->

## () - r25 - unit sub-types starting with enemy unit type
* I will want to have more than one type of the unit.type 'enemy' of course so then I am going to want to have some kind of sub type system
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
    MISC IMPROVEMENTS
********** *******-->

## () - r24 - init state
* start an init state

## () - r23 - message system
* start a message system that wil be used to inform the player of things
* fix #10 by using mesage system to inform the user that they can not drop an item here

<!--****** **********
    ITEMS AND DROPS - item json files
********** *******-->

## () - r22 - new game-pouch state
* Start a new game-pouch state along with the many other states thus far that will work in place of the item menu in gameMod
* The pouch size will now be though of in terms of 4 by 4 grids
* Start the player off with 2 4x4 grids which means a total size of 32 items
* The player can switch between two or more grids of item slot locations in there pouch

## () - r21 - make use of item-class.js
<!-- index.html and build.sh -->
* (done) update index.html and build.sh to make use of item-class.js
<!-- world-home.json -->
* (done ) add itemClassPool and itemSubTypes keys to define what classes, and what items will drop
<!-- world-forest.json -->
* (done ) add itemClassPool and itemSubTypes keys to define what classes, and what items will drop

<!-- js/game.js -->
* (done) itemClassPool and itemSubTypes for void world

* looks like I am going to need a createEnemyOptions helper


* make use of itemClass.create to make a game.itemClass object with the itemClassPool of the current world map
* make use of new options object to set what the pouch should be for an enemy in setupGame and setupGame2



<!-- js/lib/units.js -->
* (done) add an option object for enemey create method that can be used to define what subtypes can be used for an enemy pouch
* (done) by default the only drops should be 'sword' as that is the only built in
* (done) I will want to be able to set min and max number of pouch weapons by way of the new options object

* I will want to be able to set min and max levels for item drops
* I will want to set points range values for each subtype for each class with this enemey obtions object


<!-- items-home.json -->
* add at least one epic class item


## ( done 12/26/2021 ) - r20 - enemy unit pouch, enemy unit item drops
<!-- js/game.js -->
* (done) start new getDropObj helper that will be used to help work out what needs to happen with drops in general
* (done) use getDropObj helper to create a canDropAtCell helper
* (done) use canDropAtCell helper in place of getDropItemGroup in MENUS.item 
* (done) new playerItemDrop helper
* (done) use playerItemDrop helper in place of getDropItemGroup in MENUS.item
* (done) remove getDropItemGroup if it is no longer used
* (done) start an enemyPouchDrop helper
* (done) when an enemy unit dies it should drop its items to one or more cells new enemyPouchDrop helper
<!-- js/lib/units.js -->
* (done) An enemy unit should have items in its pouch
* (done) one of the items in the pouch should be a weapon, and that weapon should be equipped for it

## ( done 12/26/2021 ) - r19 - fixed bug (#12)
<!-- js/game.js -->
* (done) rename createMapButtonOnClick to createMapButtonOnExit
* (done) cyan color for items in pouch menu
* (done) ro fix #12 start by making item_drop button a gen button in MENUS.item in gameMod
* (done) I will want to have a getDropItemGroup helper that will return a ref to a group unit, or false to fix #12
* (done) use getDropItemGroup helper in onClick event of drop button in MENUS.item to set buttonType and color
* (done) use getDropItemGroup helper in onExit to know group to drop to
* (done) at this point #12 should be fixed

## ( done 12/26/2021 ) - r18 - player pouch limits, new onExit button event
<!-- js/game.js -->
* (done) make it so that the player can not pick up an item if the player pouch is full
* (done) add a new onExit button event for buttons
* (done) regardless of button type, onClick should fire the very moment that a button is clicked
* (done) the onExit event should fire when pd.frame === 0 and md.mode === 'exit'
* (done) make all needed changes to all buttons with new event options	
* (done) dynamic button typing for the pickup item gen buttons in MENUS.pickup
* (done) createMenu helper is now using Object.assign to create a spawnOpt object
* (done) change color of buttons in pickUp menu to red when player pouch is full
<!-- js/lib/units.js -->
* (done) have a player.pouch_max value

## ( done 12/25/2021 ) - r17 - Item count limit for groups
<!-- json/world-home.js -->
* (done) have 30 items in 3 groups for now for testing that drops will work as they should in r17
<!-- js/lib/map.js -->
* (done) the mapMod.getNeighbors method now has a dirCount option
<!-- js/game.js -->
* (done) set a GROUP POUCH MAX const limit for the number of items in a group
* (done) when dropping items I will want to select another cell in which to place items in the event that current one is full
* (done) In the event that there are no empty cells the player can not drop

## ( done 12/24/2021 ) - r16 - item json files, more than one weapon
<!-- json/items-home.json -->
* (done) start a new type of json file format for defining at least two items for the game
<!-- js/sm.js -->
* (done) I will need to add items-home.json to the lost of json files to load
<!-- js/game.js -->
* (done) fix bug where an enemy that dies over a group ends up deleting the group
* (done) button subtext to display at least level for each item
<!-- js/lib/utils.js -->
* (done) add a utils.setPath method
<!-- js/lib/units.js -->
* (done) I will need a way to load items into the ITEMS global from json files
<!-- json/world-home.js -->
* (done) update json of home world to make use of at least one item from items-home.json
<!-- js/draw.js-->
* (done) update draw.js to draw a subtext value if any

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
