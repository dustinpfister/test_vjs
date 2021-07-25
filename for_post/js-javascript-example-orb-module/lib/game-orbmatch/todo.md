# game-orbmatch - todo list

### () - start of player object in game.js
* the game.js file should have two objects that are 'player objects' one for a human controlled player and the other for the AI
* the player object will have an orbCollection instance that is the players collection of orbs to work with for the game
* the player object will have a slots array which are the four slots in the game area that will hold currently active orbs

### () - start the orb-collection.js, game.js, and draw.js files
* (done) start an orb-collection.js that will be used to create a main collection or orbs for a player human or ai
* start a game module that will create and return the game object
* start a draw.js that will be used to draw a view for the current state of a game object

### ( done 07/24/2021 ) - main.js file and very crude start of game
* (done) have a main sm object that will be the start of what will be a state machine instance
* (done) have a canvas lib that will create and return a canvas element
* (done) have a sm.game object that will be the start of the object that will be created and returned by a game module later on
* (done) have a draw object that will be the start of the draw module
* (done) have a game.update method
* (done) have a draw.info method that will just draw info of a single orb object