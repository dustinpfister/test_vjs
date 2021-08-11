
## () - fertPoints
* the grid-plants module should have a grid.fertPoints property
* start with just one fertPoint
* cell.data.plantIndex prop
* cell.data.fertPoints prop
* start a gridPlantMod.update method
* have a way to make it so the first fertPoint can be spent to increase fert of a cell
* if fert of a cell is >= 1 for first plant type, that plant can grow there

## (done 08/11/2021) - grid-plants.js started
* (done) clicking the selected cell results in it being de-selected
* (done) gridPlantsMod.create uses gridMod.create to create a base grid mod object
* (done) have a gridMod.selectedCheck method that will just set cellSelected to null or cell

## ( done 08/10/2021 ) - grid.js file basic features working
* (done) have a gridMod.create method that will create and return an object with a cells prop
* (done) the cells prop is a linear array of objects
* (done) each cell object has properties for index, x, and y pixel and X, and Y cell position values
* (done) have a grid.xOffset and grid.yOffset that is the x and y starting position of the upper left corner
* (done) have a draw.grid method
* (done) have a getCellByPixlePos helper
* (done) have state handlers working
* (done) use getCellByPixlePos in game state onPointerStart event
* (done) have a grid.selectedCell prop
* (done) have a grid.data object for user data
* (done) have a selected cell be red

## ( done 08/09/021 ) - start with a few files
* (done) start a js-javascript-example-idle-game-wild-plant-grid proto folder
* (done) have a lib/utils.js
* (done) have a lib/draw.js
* (done) have a main.js file
* (done) have a readme file
* (done) have a todo.md
* (done) have a lib/grid.js
* (done) have a lib/grid-plant.js
* (done) have a lib/game.js
