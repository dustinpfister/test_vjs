# game-orbmatch - todo list

### () 0.x.0 - speed state object started

### () 0.x.0 - range.splashDamageMulti, and range.splashPer
* have a splash damage multi, and splash per prop added to the range stat object
* If caps are hit for range.minRange, and range.plusOnePer more earth elements still makes sense becuase of range.splashDamageMulti

### () 0.x.0 - Main Menu, and Crafting states started
* start a new crafting state
* have a mainMenu state that will just be a way to progress to gameConfig, or the new crafting state

### () 0.x.0 - Main state machine, game, and gameConfig state
* start a main state machine in main.js that will have just a game, and gameConfig state for now
* the gameConfig state can be used to set the state of the player, and AI pouch
* when the player wins or looses a game they return to gameConfig state
* have a 'gameOptions' game state that can be used to leave game state

### () 0.x.0 - AI Improvements II
* The AI should swap orbs between slots as needed
* in the event that the AI has \< 4 orbs remaining it should swap orbs to make sure that no player orb is out of range

### () 0.x.0 - target selection
* target section can be a feature of orb types
* pure types can always select all orbs in range, and thus divide attack by target array length, and attack all targets pure turn
* dual types can select a single target in range that is always the most powerful orb in terms of attack
* triple types can select a single target in range that is always the weakest
* quad types can select a random count of targets in range
* recipe types can have these values set depeding on the state of the recipeDef object

### () 0.x.0 - minRange, and plusOnePer chance
* the range stat object can have a minRange prop which is the base range that will be set for a turn
* the range stat object can have a plusOne prop that is the chance that the effictive range will be one more than the min
* the minRange stat will then have a range between 1 and 3 depending on level
* the plusOnePer change prop can then have a a rane between 0 and 1.
* if minRange = 3 and plusOnePer = 1 then that will result in the range always being 4

### () 0.x.0 - targets and range statObject
* have an orb.data.range stat object with a current prop that is the range of an orb
* a range of 1 means it can just attack the orb in front of it alone
* a range of 2 means it can attack the orb in front, and on each side
* So then the max range for the range prop would be 1 to 4
* have a orb.data.attack.targets array that will be all the enemy orbs to attack
* for now just have orb.attack.current / orb.attack.targets.length

### () 0.x.0 - On orb death event
* have an on orb death event that fires when orb.data.hp <=0;

### () 0.x.0 - fix bugs
* make it so orbs can be moved from slot to slot
* fix bug where an orb can be placed in a slot that all ready has an orb

### () 0.x.0 - AI improvements I
* The AI should swap in orbs from its pouch during aiTurn game state
* The AI should make choices when it comes to setting orbs in attackMode or not

### () 0.x.0 - recipe types started
* orb-client: to allow for injection of orb recipe defs in the from of calling a public method Orb.loadRecipe
* orb-client: make changes so that will result in orb.type being set to recipe if orb.ratio matches what is in a recipe object
* orb-client: a ref to the recipe object should be a top level prop of orb such as orb.recipeDef
* orbCollection: calls of Orb.loadRecipe can be made here, and for now they can be hard coded object literals
* orbCollection: start out with a recipe where the focus is more on attack
* orbCollection: have a recipe where the focus is more on hp
* orbCollection: the state of orb.level, and orb.recipeDef should be what has an inpact on stat objects such as orb.data.attack

### () 0.x.0 - Orb type stat deltas started
* orbCollection: have it so that orb.type will impact stat values in orb.data.attack and orb.data.hp objects

### () 0.13.0 - ratio stat deltas
* (done) make it so that the color of the orbs will differ based on the state of orb.ratio
* (done) have a set of deltas that will apply just for the state of the ratio, raised by level
* have a aiPouch, and playerPouch options for gameMod.create

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

