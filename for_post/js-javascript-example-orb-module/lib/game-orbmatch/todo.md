# game-orbmatch - todo list

### () 0.x.0 - single stat object
* have all stats like attack, hp, hpMax, heal, ect be props of a single object at orb.data.stats

### () 0.x.0 - processTrun.events.onOrbChainAttack
* what to do for a chain attack event


### () 0.x.0 - Array of Pouch collections, and Pouch mangament for crafting state
* Make it so there is an array of craft.playerPouches in a craft object.
* The currentPouch is then a refernce to a pouch in the craft.playerPouches
* Make it so that the player can select a current pouch in the crafting state
* the player should be able to delete a pouch
* the player should be able to transfer an orb from one pouch to another

### () 0.30.0 - AI improvements I
* The AI should swap in orbs from its pouch during aiTurn game state
* The AI should swap orbs between slots as needed
* The AI should make choices when it comes to setting orbs in attackMode or not
* in the event that the AI has \< 4 orbs remaining it should swap orbs to make sure that no player orb is out of range

### () 0.29.0 - utils methods for creating button collections
* have a utils.buttonCreate method that will create and return a simgle button object
* have a utils.buttonCollectionCreate method to help with the creating of a collection of button objects

### () 0.28.0 - fix bugs
* make it so orbs can be moved from slot to slot
* fix bug where an orb can be placed in a slot that all ready has an orb

### () 0.27.0 - target selection
* target section can be a feature of orb types
* pure types can always select all orbs in range, and thus divide attack by target array length, and attack all targets pure turn
* dual types can select a single target in range that is always the most powerful orb in terms of attack
* triple types can select a single target in range that is always the weakest
* quad types can select a random count of targets in range
* recipe types can have these values set depending on the state of the recipeDef object

### () 0.26.0 - speed stat  started
* start a speed stat that will contain props that determine who attacks first, and damage/heal/effect multipliers
* The speed of an orb determines which orb will attack/buff first
* speed will not result in additional turns for an orb, but can result in additional attacks, and buffs per turn

### () 0.25.0 - orb.data.stat.splashDamageMulti, and orb.data.stat.splashPer
* have a splash damage multi, and splash per prop added to the range stat object
* If caps are hit for range.minRange, and range.plusOnePer more earth elements still makes sense because of range.splashDamageMulti

### () 0.24.0 - minRange, and plusOnePer chance
* the range stat object can have a minRange prop which is the base range that will be set for a turn
* the range stat object can have a plusOne prop that is the chance that the effective range will be one more than the min
* the minRange stat will then have a range between 1 and 3 depending on level
* the plusOnePer change prop can then have a range between 0 and 1.
* if minRange = 3 and plusOnePer = 1 then that will result in the range always being 4
* for now have it so that the range prop starts at 1 and goes up to 4 by a given level say 100

### () 0.23.1 - simple type overlays for draw.orb
* have simple type overlays for draw.orb starting with pure type which will be just a thick black circle
* null type should just have no overlay so use a noop function for it
* dule, triple, and quad types can just be two, three, or four lines coming from the center of the orb
* composite type can just have a ? over it
* recipe orbs can just have a R over them for now.

### () 0.23.0 - recipe types started
* orb-client: to allow for injection of orb recipe defs in the from of calling a public method Orb.loadRecipe
* orb-client: make changes so that will result in orb.type being set to recipe if orb.ratio matches what is in a recipe object
* orb-client: a ref to the recipe object should be a top level prop of orb such as orb.recipeDef
* orbCollection: calls of Orb.loadRecipe can be made here, and for now they can be hard coded object literals
* orbCollection: start out with a recipe where the focus is more on attack
* orbCollection: have a recipe where the focus is more on hp
* orbCollection: the state of orb.level, and orb.recipeDef should be what has an impact on stat objects such as orb.data.attack


### () 0.22.2 - draw.print
* have a basic draw.print method for printing text in a standard way
* use draw.print to create a crude title text in mainMenu state

### () 0.22.1 - Create Orb helper method in OrbCollection, and orbCollection.clone
* I should have a create orb helper method in orb collection that will create a single orb with its data object setup
* have an orbCollection.clone method that will return a single orb that is a clone of the given orb
* see abount using OrbCollection.clone over that of orbCollection.setOrbPropsToOrb in game.js
* see abount using OrbCollection.clone over that of orbCollection.setOrbPropsToOrb in crafting.js
* remove orbCollection.setOrbPropsToOrb if it is no longer being used

### () 0.22.0 - OrbMod.load, and orbDefinition files started
* I will need a OrbMod.load method that can be called in an exteral file that will contain orb type data
* make a collection of files to define what the stats are for each type starting with pure.
* have a dual orbDefinition file
* have a tiple orbDefinition file
* have a quad orbDefinition file
* have a composite orbDefinition file
* have a reference to the orbDef object as part of the core set of orb properties
* see/update README for orbDefinition object format




### ( 08/28/2021  ) 0.21.5 - use draw methods in game.js
* (done) the draw methods in draw.js for each game state should be in game.js start with the playerTurn game state
* (done) playerTurnOrbMenu
* (done) gameOver
* (done) remove uneeded draw.forGameState object in draw.js

### ( 08/28/2021 ) 0.21.4 - gameOptions game state
* (done) start a new gameOptions game state in game.js
* (done) I should have a game options button in the upper right corner of the canvas
* (done) the game options button allows for entering into a game options state
* (done) the game options state can be used to quit the current game
* (done) the game options state can be used to continue the current game

### ( 08/26/2021 ) 0.21.3 - utils push state method
* (done) have a utils.smPushState method that will push a new state object to an sm object, filling in blanks
* (done) use utils.smPushState in main.js
* (done) use utils.smPushState in craft.js
* (done) use utils.smPushState in game.js

### ( 08/26/2021 ) 0.21.2 - set state method
* (done) have a utils.SMSetState method that works like the setState method in main.js
* (done) use utils.SMSetState in main.js
* (done) use utils.SMSetState in craft.js
* (done) use utils.SMSetState in game.js

### ( 08/26/2021 ) 0.21.1 - utils methods for creating sm style state objects
* (done) have a utils.SMCreateMin method that will create and return a clean object formatted like sm in main.js with states object
* (done) have a utils.SMCreateMain method that will create and return a main sm object to be used in main.js
* (done) use utils.SMCreateMain in main.js
* (done) make the main loop in main.js be part of SMCreateMain
* (done) pointer events in main.js should be the default
* (done) use utils.SMCreateMin in craft.js
* (done) use utils.SMCreateMin in game.js

### ( 08/24/2021 ) 0.21.0 - utils methods to help with buttons
* (done) start button utils methods that will be used by the main.js, game.js, and crafting.js
* (done) have a utils.buttonGet method to help with getting a single button in a collection by pos
* (done) have a utils.buttonCheck method that will call a button.onClick method
* (done) use utils.buttonCheck in main.js
* (done) use utils.buttonCheck in crafting.js
* (done) game.gameStates should just be game.states
* (done) use utils.buttonCheck in game.js
* (done) remove redundant old helpers getButton and buttonCheck in main.js, game.js, and crafting.js

### ( 08/24/2021 ) 0.20.6 - delete puch orbs in crafting state
* (done) In deleteOrb craft state I should be able to delete an orb from the craft.currentPouch orbCollection

### ( 08/24/2021 ) 0.20.5 - apply craft pouch to game
* (done) mutate level setting for craft.createByRatio
* (done) have an initial state of craft.currentPouch
* (done) have a craftingMod.getCurrentPoints method
* (done) craft.currentPouch should always be what is used to create the state of the player pouch when starting a new game

### ( 08/23/2021 ) 0.20.4 - craft object orb pouch started
* (done) I will want to have a craft.currentPouch property that is an instance of OrbCollection
* (done) I will want to display the state of the current pouch in all states
* (done) have a craft.createByRatio object that contains settings for byRatio state
* (done) display state of craft.createByRatio object in byRatio state
* (done) have buttons in byRatio state that mutate values in craft.createByRatio
* (done) have a craft button that will push a new orb to the current pouch at the first null type based on values on

### ( 08/23/2021 ) 0.20.3 - creafting.js, and crafting state ui started
* (done) start a update ai puch settings helper
* (done) I will want to start a new crafting lib
* (done) I will want states just like with gameMod, only follow the same pattern worked out in main.js
* (done) I will need a craftingMod.emitStateEvent public method just like in gameMod
* (done) use craftingMod.emitStateEvent in crafting state in main.js
* (done) display current state of craft as part of draw method in main.js crafting state
* (done) have back buttons in byRatio, and deleteOrb that bolth return to main menu

### ( 08/22/2021 ) 0.20.2 - gameConfig buttons
* (done) have buttons that can will be used to increase and decrease the count of ai orbs
* (done) have buttons that can will be used to set the min and max level for orbs
* (done) starting sm.createGameOptions object defined outside of starting object literal
* (done) have a sm.aiPouchSettings object
* (done) display state of sm.aiPouchSettings in gameConfig
* (done) buttons in gameConfig state can be used to mutate state of sm.aiPouchSettings count prop
* (done) use sm.aiPouchSettings to create new ai pouch in game state start hook
* (done) back button in gameConfig state
* (done) mutate level settings

### ( 08/22/2021 ) 0.20.1 - gameConfig state createAIPouch arguments including typer methods
* (done) gameMod.createAIPouch method has count, minOrbLevel, maxOrbLevel arguments
* (done) typer methods are arguments that can be functions or strings.
* (done) a typer function returns a base points ratio for an orb
* (done) randomPure hard coded default typer 
* (done) random levels between min and max values

### ( 08/22/2021 ) 0.20.0 - Main Menu, better gameConfig state, and Crafting states started
* (done) when the player wins or looses a game they return to gameConfig state
* (done) show level for each orb
* (done) start a mainMenu state that will just be a way to progress to gameConfig, or the new crafting state
* (done) start a new crafting state with a button going to it in the main menu
* (done) have a draw.buttonCollection method and use it in all main state objects that use buttons
* (done) have a global error hander in main.js

### ( 08/22/2021 ) 0.19.0 - Main state machine, game, and gameConfig state started
* (done) start a main state machine in main.js that will have just a game, and gameConfig state for now
* (done) game state object started in main.
* (done) a state object should have an update method
* (done) start a gameConfig state object
* (done) I will want a gameMod.createAIPouch public method, that will create and return an array that can be used with gameMod.create
* (done) a state object should have a draw method
* (done) have a start game button in gameConfig state, when this button is clicked start a new game object and change to game state
* (done) the gameMod.createAIPouch public method will take just a level number from 1 - 100 and return an array of points
* (done) have a sm.ver string and display that

### ( 08/19/2021 ) 0.18.0 - process turn events
* (done) have an onOrbAttack event for processTurn game state
* (done) have an onOrbBuff event for processTurn game state
* (done) have an on orb death event that fires when orb.data.hp <=0;
* (done) have an onOrbGetTargets event

### ( 08/19/2021 ) 0.17.0 - can target own orbs in !attackMode
* (done) have a aiAttackModes, and playerAttackModes options that can set starting values for slot attack modes
* (done) fix updateInRangeOrbs helper so that it will make friendly orbs inRange orbs with !attackMode
* (done) apply heal to any friend orb in range when not in attackMode for an orb

### ( 08/18/2021 ) 0.16.0 - targets array
* (done) have an orb.data.targets array that will be all the enemy orbs to attack during a turn for an orb
* (done) have a startingOrbs option for gameMod.create
* (done) have the default for the startingOrbs option be just setting pouchIndexs from left to right that are nt null types
* (done) default orb type is now null
* (done) have a getTargets helper for processTurn game state
* (done) for now just selecting first target if any
* (done) attack targets in new processFactionTrun helper
* (done) have orb.data.attack / orb.data.targets be the damage that is applied to all target orbs
* (done) no longer display total Attack and heal values as they no longer apply

### ( 08/18/2021 ) 0.15.0 - range stat started
* (done) have an orb.data.range stat object with a current prop that is the current effective range of an orb
* (done) in playerTurn game stat display the range of the current selected orb
* (done) start an orbCollection.getRangeOrbs method that will return the slot orbs that are in range for a given orb
* (done) have an orb.data.inRangeOrbs prop that is a collection of enemy orbs that are in range
* (done) have updateInRangeOrbs helper in game.js
* (done) a range of 1 means it can just attack the orb in front of it alone
* (done) a range of 2 means it can attack the orb in front, and on each side
* (done) So then the fixed constant range for the data.range.current prop would be 1 to 4

### ( done 08/14/2021 ) 0.14.0 - Orb type stat deltas started
* (done) orbCollection: have it so that orb.type will impact stat values in orb.data.attack and orb.data.hp objects

### ( done 08/14/2021 ) 0.13.0 - ratio stat deltas
* (done) make it so that the color of the orbs will differ based on the state of orb.ratio
* (done) have a set of deltas that will apply just for the state of the ratio, raised by level
* (done) have a aiPouch, and playerPouch options for gameMod.create

### ( done 08/14/2021 ) 0.12.0 - Orb Level deltas started in collection.js
* (done) display hp.heal if !orb.attackMode in draw.info
* (done) orbCollection: have it so that I can pass an array of points values
* (done) start README file on orbCollection
* (done) orbCollection: start a createStatObjects helper
* (done) orbCollection: forLevel helper that returns base stat value deltas that are based just on level only
* (done) createStatObjects starts all values on a set min value for each stat it is then a matter of what deltas apply
* (done) orbCollection: have it so that orb.level will impact stat values

### ( done 08/13/2021 ) 0.11.0 - new playerTrunOrbConfig
* (done) orb.data.attack, and orb.data.hp objects should be set up in orb-collection.js
* (done) start a new playerTurnOrnConfig game state
* (done) in playerTurn game mode make it so that clicking on a player orb displays info about that orb

### ( done 08/12/2021 ) 0.10.0 - game over game state started
* (done) have a 'gameOver' game state that will fire when the game is over
* (done) when an orb.hp.current value is <= 0 then the type of that orb should become 'null'
* (done) if a faction has all 'null' type orbs in slots current processTurn state, that will result in gameOver

### ( done 08/12/2021 ) 0.9.0 - ai orbs, hp objects, and attack objects started
* (done) only display orb attack mode arrows in draw.slots for types pf orbs that are not null
* (done) have the ai orbs slots set up with starting orbs from the ai pouch on creation of game object and do the same for player slots
* (done) start an orb.data.hp object that contains current, max, and heal values
* (done) start an orb.data.attack object that contains just a current prop for now
* (done) update draw.slots so that the hp of an orb is dispaled
* (done) have an attackTargets helper function for processTrun state that will attack orbs of the other faction
* (done) have attack value in attackTargets be the some of the current propery of all orbs
* (done) have stand alone getTotalAttack helper function
* (done) getTotalAttack should not add up current attack values of orbs that have an hp <=0
* (done) have a playerObj.totalAttack value and have that be what is set by the getTotalAttack helper
* (done) display current attack values for player and ai with a draw.slotsInfo method
* (done) have a playerObj.totalHeal prop
* (done) display playerObj.totalHeal as part of draw.slotsInfo
* (done) make it so that totalHeal is applied in processTurn

### ( done 08/11/2021 ) 0.8.0 - Player can set orbs in attack or defense mode
* (done) have a orb.data.attackMode that will be a boolen value
* (done) draw attack mode state of each orb in the draw.slots method
* (done) in playerTurn have it so the player can toggle attackMode by clicking the slots

### ( done 08/11/2021 ) - 0.7.0 - start aiturn, and processTurn state objects
* (done) I will want an 'aiTurn' game state object started
* (done) have a processTurn game state object started
* (done) have aiTurn state be the state that will set the state to processTurn state
* (done) have processTrun game state process back to playerTurnState
* (done) have an end turn button in playerTurn that will result in a change to aiTurn state

### ( done 08/11/2021 ) 0.6.0 - game.js playerTurn game state and buttons
* (done) add utils.boundingBox to utils.js
* (done) buttons object should be part of state object
* (done) have a draw.gameState method that will draw the current game state
* (done) start a 'playerTurn' game state object that is a main state during a turn that will allow for entering other states or end the turn
* (done) have a getButton helper in game.js
* (done) have a 'set orbs' button in playerTurn that will process to playerTurnOrbMenu state
* (done) have a draw.button method
* (done) have a done button in playerTurnOrbMenu state that will result in the the current state being set to playerTurn

### ( done 08/10/2021 ) 0.5.0 - game.js states started with playerTurnOrbMenu state
* (done) make selectedOrb path of the game object rather than sm
* (done) a game object will need to have states like that of a main state machine so have a game.currentState prop
* (done) have a 'playerTurnOrbMenu' game state where the player is in a menu that allows for them to set what orbs are in the slots 
* (done) have a gameMod.emitStateEvent method that will take and event key as an argument
* (done) have a separate draw.slotAreas method
* (done) have a separate draw.orbCollection method
* (done) have a gameState.playerTurnOrbMenu.update method that will just flash the color of the player slot areas
* (done) have a gameMod.update method, and call it in the main loop
* (done) have a secs value to use for gameMod.update

### ( done 08/09/2021 ) 0.4.0 - Swap orbs to an from slots
* (done) I should be able to click and drag a slot orb, back to a location in the pouch that is null

### ( done 08/09/2021 ) 0.3.0  - The player object, and slots
* (done) The game.js file should have two objects that are 'player objects'
* (done) One player object for a human controlled player and the other for the AI controlled player
* (done) The player object will have an orbCollection instance that is the players collection of orbs to work with for the game
* (done) The player object will have a slots array which are the four slots in the game area that will hold currently active orbs
* (done) the slots should also be an instance of orb collection
* (done) new null orb type
* (done) draw.js: I will want a draw.slots method
* (done) draw.slots should show an empty brown square if the current type of orb is of type null
* (done) If I drag and drop an orb from the bottom to one of the slots, that values of the orb in the slot will be set to that orb.

### ( done 08/05/2021 ) 0.2.0 - draw.orb, utils.distance, canvas event hander, and app loop
* (done) start a draw orb method
* (done) have a utils.distance method
* (done) have a main app loop started
* (done) use the distance method to find out if an orb is being clicked or not
* (done) start an OrbCollection.getOrbAtPos method
* (done) move an orb around in the canvas

### ( done 07/25/2021 ) 0.1.0 - start the orb-collection.js, game.js, and draw.js files
* (done) start an orb-collection.js that will be used to create a main collection or orbs for a player human or ai
* (done) start a game module that will create and return the game object
* (done) start a draw.js that will be used to draw a view for the current state of a game object
* (done) have a local js folder for the game-orbmatch folder and have a folder for each JavaScript file in that folder

### ( done 07/24/2021 ) 0.0.0 - main.js file and very crude start of game
* (done) have a main sm object that will be the start of what will be a state machine instance
* (done) have a canvas lib that will create and return a canvas element
* (done) have a sm.game object that will be the start of the object that will be created and returned by a game module later on
* (done) have a draw object that will be the start of the draw module
* (done) have a game.update method
* (done) have a draw.info method that will just draw info of a single orb object

