# game-orbmatch

A simple game that I have made just for the sake of testing out this orb module and make sure that things are working the way they should be when it comes to using the module to make a game as intended. The general idea for this game is to just have a simple turn base style game that involves having two collections of orb objects, one of which is under player control, and the other under control of an AI opponent. Each player has four slots, and a collection of orbs from which they can swap orbs to and from when it is there turn. In addition to setting which orbs are in the slots, they can also choose an orb that will attack for the turn, and which target ai orb to attack. The other orbs can still have an effect for a turn when it comes to a supportive role.

## libs

The game consists of a number of javaScript files in which I am separating certain concerns. I have a general utility module that contains methods like a distance formula and other basics tools, alone with the orb client module or course, and many other modules that have to do with the over all game logic.

### utils.js

This is the general utility library for this game that contains methods like the distance formula, and many other usual suspect type methods that are found in many games like this.

### ratio.js

### orb-client.js

### orb-collection.js

## game.js

## draw.js

## main.js