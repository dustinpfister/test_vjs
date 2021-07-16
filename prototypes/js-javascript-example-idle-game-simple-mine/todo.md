# todo list for js-javascript-example-idle-game-simple-mine

## () - 0.1.0 - /lib/mine.js module started
* start a /lib/mine.js module
* The mine module will just create and return a single mineObj
    * mineObj.distance      - the distance of the mine from the 'home location' in km
    * mineObj.ore.name      - the name of the ore
    * mineObj.ore.amount    - the amount of ore at the mine
    * mineObj.ship.speed    - the current speed of the ship kmph
    * moneObj.ship.distance - the current distance of the ship between 0 and mineObj.distance
    * mineObj.ship.dir      - the current direction of the ship 1 or -1 for going away from home and back again
    * mineObj.ship.cargoMax - the max amount of ore the ship can hold to take back home
    * mineObj.ship.cargo    - the current amount of cargo in the ship.
* start an update method for the mine module that will update a mineObj with a given home object

## () - 0.0.0 - /lib/home.js module started
* start a home.js module that will create and return a main home object.
* the home object will be the main game state object.
    * home.oreCollection - an array of objects for each ore in the game