
<!--****** **********
    PIXMAPS Graphics game world
********** *******-->

## () - rx - pixmaps
* see about using the pixmap json standard that I worked out, as a way to add images

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
    Taxonomy and Apothecary ( making potions )
    https://en.wikipedia.org/wiki/Taxonomy_%28biology%29
    https://en.wikipedia.org/wiki/Fungus
    https://en.wikipedia.org/wiki/Laetiporus_sulphureus
    https://en.wikipedia.org/wiki/Apothecary
********** *******-->

## () - rx - start Apothecary
* have an Apothecary button in the circle menu that will lead to a menu that can be used to make potions

## () - rx - start taxonomy and fungi items
* start a new subtype of items 'fungi' with a 'fungi.laetiporus.sulphureus' item (chicken of the woods)
* have the itemClass of laetiporus.sulphureus be Epic
* I will want junk, common, and rare class types of fungi also
* have these items spawn in the forest
* the player can pick them up and add them to there pouch just like any other drop

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