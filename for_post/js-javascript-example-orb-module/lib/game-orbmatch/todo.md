# game-orbmatch - todo list

### () 0.3.0 - Main state machine, and basic UI working
* start a main state machine in main.js that will have just a game, and gameConfig state for now
* the gameConfig state can be used to set certain stats for a new game, and enter the game state when done
* when the player wins or looses a game they return to gameConfig state
* have a basic ui working when it comes to setting up a game state, and playing around with things in the game state

### () 0.2.0  - start of player object in game.js
* the game.js file should have two objects that are 'player objects' one for a human controlled player and the other for the AI
* the player object will have an orbCollection instance that is the players collection of orbs to work with for the game
* the player object will have a slots array which are the four slots in the game area that will hold currently active orbs

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