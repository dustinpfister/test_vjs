# js-javascript-example-map-system-paths


<!-- Maintenance -->

<!-- Additional Features -->

## () - rx - mapMod.getCollectionByBox, mapMod.getCollectionByCircle, and mapMod.getCollectionByFilter

## () - rx - paths and roads
* have an update process that will use path detection to set land value for units
* have roads set walkable values for cells to true
* for 'res' units the number of paths to 'com' units will raise land value
* for 'res' units the avg length of paths to 'com' units will rase land value (lower would be better)

## () - rx - new system for population
* start a new system for population where land value will cause population to go up or down
* if land value is 0 for a 'res' unit population will be 0

## () - rx - map modes
* I will want to start a system that will be more than one way to display info about the map
* have a normal map that is just the current view
* have a landValue map that will show the the current land values are for each cell

<!-- Minimum Viable Product -->

## ( done 01/29/2022 ) - r2 - mapMod.getCollectionByPos, mapMod.forEachCell, roads, land value
* (done) have a mapMod.getCollectionByPos helper that will return a collection of cells that are in a given area
* (done) I will want a UNIT TYPES const in game.js
* (done) add a road unitType
* (done) button.action prop in main.js
* (done) info action button in main.js 
* (done) start a cell.data.landValue prop that will default to 0
* (done) mapMod.forEachCell method
* (done) have it so that the count of roads from a 'res' unit will inpack landValue
* (done) start a population update method that will take landValue into account

## ( done 01/29/2022 ) - r1 - unit type selection menu, population, money, basic game idea started
* (done) have a draw.unitTypeMenu draw method
* (done) start a buildMenu that when clicked sets the current menu cell index
* (done) when a cell is clicked the cell is set to the current type in the build menu
* (done) have game.money, and game.population values
* (done) display money and pop values
* (done) have each unit cost 100 money to build
* (done) start a main app loop
* (done) have a house unit type that will rase population by 1
* (done) have a commercial type that will rase money over time
* (done) start a game.js file in which to start placing logic that should go there
* (done) gameMod.create
* (done) gameMod.buildAt
* (done) gameMod.update
* (done) delta money as helper in gameMod

## ( done 01/28/2022 ) - r0 - starting point
* (done) start with the map.js from my turn based rpg javascript example
* (done) start with the utils.js form turn based rpg also
* (done) new draw.js
* (done) new main.js
* (done) start with just a simple demo that involves just clicking squares to change color
* (done) display mapMod.ver in canvas
