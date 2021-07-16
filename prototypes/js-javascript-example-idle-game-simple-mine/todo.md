# todo list for js-javascript-example-idle-game-simple-mine

## () - 0.2.0 - more than one ore at a mine
* have a hard coded MINE DATA DEFAULT value and opt.MINEDATA option for create method in home.js
* a mineProp in the mine data object contains info for each mine
    * mineProp.name     - can set a custom name for the mine
    * mineProp.ores     - an array of objects for each ore at the mine
        * ore.index     - an index number for the ore in OREDATA
        * ore.points    - can set a points value as a way to set yield

## () - 0.1.0 - /lib/mine.js module started
* (done) start a /lib/mine.js module
* (done) The mine module will just create and return a single mineObj
    * (done) mineObj.distance      - the distance of the mine from the 'home location' in km
    * (done) an array or ore objects for each ore that is at the mine
        * (done) mineObj.ore.name      - the name of the ore
        * (done) mineObj.ore.amount    - the amount of ore at the mine
        * (done) mineObj.yield         - the yield of the ore relative to others
    * mineObj.ship.speed    - the current speed of the ship kmps
    * moneObj.ship.distance - the current distance of the ship between 0 and mineObj.distance
    * mineObj.ship.dir      - the current direction of the ship 1 or -1 for going away from home and back again
    * mineObj.ship.cargoMax - the max amount of ore the ship can hold to take back home
    * mineObj.ship.cargo    - the current amount of cargo in the ship.
* start an update method for the mine module that will update a mineObj with a given home object
* update home.js so that it will create a mine object for each ore collection object

## ( done 07/16/2021 ) - 0.0.0 - /lib/home.js module started
* ( done ) start a home.js module that will create and return a main home object.
* ( done ) the home object will be the main game state object.
    * (done) home.oreCollection - an array of objects for each ore in the game