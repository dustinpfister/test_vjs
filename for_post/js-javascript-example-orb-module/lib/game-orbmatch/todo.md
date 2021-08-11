# game-orbmatch - todo list

### () 0.8.0 - Main state machine
* start a main state machine in main.js that will have just a game, and gameConfig state for now
* the gameConfig state can be used to set certain stats for a new game, and enter the game state when done
* when the player wins or looses a game they return to gameConfig state
* have a 'gameOptions' game state that can be used to leave game state

### () 0.7.0 - game over game state started
* have a 'gameOver' game state that will fire when the game is over

### () 0.6.0 - game.js playerTurn, aiTurn, and process turn game states started
* (done) add utils.boundingBox to utils.js
* (done) buttons object should be part of state object
* (done) have a draw.gameState method that will draw the current game state
* (done) start a 'playerTurn' game state object that is a main state during a turn that will allow for entering other states or end the turn

* have a 'set orbs' button in playerTurn that will process to playerTurnOrbMenu state
* have a done button in playerTurnOrbMenu state that will result in the the current state being set to playerTurn
* have a draw.button method

* I will want an 'aiTurn' game state
* have a 'processTurn' state that will process the current turn, mutate orb properties, step a turn number, and progress back to playerTurn.

* have an end turn button in playerTurn that will result in a change to aiTurn state
* have aiTurn state be the state that will set the state to processTurn state
* processState turn will then change to playerTurn state

### ( done 08/09/2021 ) 0.5.0 - game.js states started with playerTurnOrbMenu state
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