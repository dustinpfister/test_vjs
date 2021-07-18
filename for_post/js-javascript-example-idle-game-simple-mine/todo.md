# todo list for js-javascript-example-idle-game-simple-mine

## () - 0.4.0 - basic vjs ui
* just have a basic vjs user interface to create and work with a home object

## () - 0.4.0 - collection of mine objects in home state object
* update home.js so that it will create a mine object for each ore collection object

## () - 0.3.0 - ship over object
* (done) have a ship.over object that will contain data that was used to figure credits, cargo when the ship goes over
* (done) ship.over.credits prop that is the number of times to credit the home object with assumed round trips
* (done) ship.over.load is a boolen that if true means that the ship should have the cargo hold loaded
* (done) rename processCargo to processOver in mine.js
* (done) the processOver method will always credit anything in the ship cargo to the home object
* the processOver method will deduct from the mine and credit the home object
* the processOver method will load the cargo prop of the ship of over.load is true
* start a very simple visual display of the state of the a mine object in main.js

## ( done 07/17/2021 ) - 0.2.0 - update ore method in mine.js
* (done) start and update ore method in mine.js
* (done) the update mine method needs to add to the amount values in the ore objects

## ( done 07/16/2021 ) - 0.1.0 - /lib/mine.js module started
* (done) start a /lib/mine.js module
* (done) The mine module will just create and return a single mineObj
    * (done) mineObj.distance      - the distance of the mine from the 'home location' in km
    * (done) an array or ore objects for each ore that is at the mine
        * (done) mineObj.ore.name      - the name of the ore
        * (done) mineObj.ore.amount    - the amount of ore at the mine
        * (done) mineObj.yield         - the yield of the ore relative to others
    * (done) mineObj.ship.speed    - the current speed of the ship kmps
    * (done) moneObj.ship.distance - the current distance of the ship between 0 and mineObj.distance
    * (done) mineObj.ship.dir      - the current direction of the ship 1 or -1 for going away from home and back again
    * (done) mineObj.ship.cargoMax - the max amount of ore the ship can hold to take back home
    * (done) mineObj.ship.cargo    - the current amount of cargo in the ship.
* (done) start an update method for the mine module that will update a mineObj with a given home object
* (done) start process cargo helper
* (done) start an update ship method and use that in the main update method

## ( done 07/16/2021 ) - 0.0.0 - /lib/home.js module started
* ( done ) start a home.js module that will create and return a main home object.
* ( done ) the home object will be the main game state object.
    * (done) home.oreCollection - an array of objects for each ore in the game