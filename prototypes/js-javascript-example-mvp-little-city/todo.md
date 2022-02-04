# js-javascript-example-mvp-little-city

## known bugs

* ( fixed in r0 ) - #0 - some res units do not gain land value even when within 3 cells away from road
* ( fixed in r1 ) - #1 - fix bug with grid menu click in build menu
* ( fixed in r2 ) - #2 - road start pos should be within 3 cells
* ( fixed in r4 ) - #3 - fixed a bud that was caused by an old line of code with popDelta

## REF

There is looking over the manual of Sim City
```
https://www.abandonwaredos.com/docs.php?sf=simcity_manual.txt&st=manual&sg=SimCity&idg=2662
```

This is a good FAQ of Sim cirt classic
```
https://www.ign.com/articles/2007/02/05/simcity-1989-megalopolis-faq-753007
```


<!-- Maintenance -->

## () - rx - smarter updaing of cells
* have a new system for updaing cells where it does not happen on each frame
* so the rate at which cells update is slower than the main frame rate
* the cells can also be updated by one row, or maybe even one cell at a time

<!-- Additional Features -->

## () - rx - revisit tax
* rethink property tax at this to take into account avg landValue, and a mean income

## () - rx - noise polution

## () - rx - air polution

## () - rx - crime

## () - rx - death rate and birth rate
* I will want to think in terms of a death rate and birth rate that will result in a posative or negative pop growth
```
cell.data.popDelta = {
   birth: 3,
   immigration: 3,
   death: 2,
   exodus: 1,
   valueOf: function(){
       return this.birth + this.immigration - ( this.exodus + this.death );
   }
};
```

<!-- Minimum Viable Product -->

## () - rx - load state and sprite graphics

## () - rx - difficulty settings
* when starting a new city the player should be able to choose one of three difficulty settings easy, normal, and hard
* The starting money will be different for each setting
* there can be more than one tolerance setting for each problem

## () - rx - Load City state
* I will want to be able to use FileReader to read a json file of city data

## () - rx - Title state, New City state
* start a main title screen state

## () - rx - traffic problem, road conditions, and road upkeep cost
* start a new trafic problem like that of the highTax problem that can incress exodus
* I will want a new process for path updating where more than one thing is prefromed for each res cell path
* on top of using paths to figure land value it will also need to be used to set what trafic is for each road cell

## () - r4 - budget projection, Voice state started, problems
<!-- budget projection -->
* (done) display what a current projection is for next years budget in the budget state
<!-- cell info window -->
* (done) update gameBuild state so that a window will show up when a cell is clicked
* (done) when this cell window is active any click will just make the window no longer active
* (done) the cell winodw should display the x and y pos
* (done) if any unit is at the cell, the unitKey should be displayed
* (done) display pop, land value, ect
* (done) fixed bug #3
<!-- voice state / problems -->
* (done) there is all ready one problem that just needs to be in a more standard form in terms of a collection of objects
* (done) start a PROBLEMS collection that will be a collection of objects that have an impact on cell.data.poDelta values
* start a new jobs problem that is the result of a poor comm to res ratio

* have a voice state that will display what the current problems are for a city
* I will want a gameMod.getProblemsReport that will create a collection of problem names, and % of how bad that problem is

## ( done 02/04/2022 ) - r3 - Property Tax, popDelta object, gameBudget state started
* (done) start a gameBudget state for the game
* (done) The player should be able to set the tax rate in the gameBudget state
* (done) display current tax rate in budget menu
* (done) So then cell.data.popDelta can be an object rather than a number with immigration and exodus props
* (done) create a getPopDeltaObj helper in game.js to create such an object
* (done) use getPopDeltaObj helper in updatePop helper in game.js

## ( done 02/02/2022 ) - r2 - Paths to com units
* (done) fixed bug #1 with grid menu click in sm.js
* (done) all cells of map should default to false
* (done) have a walkable map for debug help
* (done) have roads set walkable values for cells to true when creating a game object for first time
* (done) when a road unit is built walkable will need to be set to true
* (done) walkable will need to be set back to false when a unit of any kind is sold
* (done) update drawCell.value and population to only draw black for a value of zero
* (done) have a getRoadCountValue helper in game.js that will be a method to just get a land value delta based on a count of roads
* (done) have a getTypeFromCellDist helper
* (done) I will want a getNear helper that will give the cell that is near the given cell from a collection
* (done) getZonePaths helper
* (done) have a getPathsToZoneValue helper that will get a value based on a count and avg length of paths to a target zone
* (done) have an update process that will use path detection to set land value for units
* (done) for 'res' units the number of paths to 'com' units will raise land value
* (done) for 'res' units the avg length of paths to 'com' units will rase land value (lower would be better)
* (done) more const values for game.js to help adjust things with balancing 
* (done) looks like I might want a createUnit helper in game.js to be used in gameMod.create and gameMod.buildAt
* (done) I want to have hard coded settings that can be used to set % of max land cell value for each process to do so
* (done) see about fixing #2 when it comes to land value

## ( done 01/31/2022 ) - r1 - lib and states folders, 'init', 'gameBuild', and 'gameMap' state
* (done) start a lib folder and have utils.js and map.js in that folder
* (done) start a sm.js lib in the lib folder that will have a plug in systme for state objects
* (done) start a states folder to which the first file will be game-build.js
* (done) start an init state that will do everything that needs to happen to set things up for the first time
* (done) the current game state can be a gameBuild state
* (done) start a smMod.gridMenu object with a create and click method
* (done) use sm.gridMenu.create for the buildMenu in states/init.js
* (done) use sm.gridMenu.click in the click event for states/game-build
* (done) use sm.gridMenu to create a new tab selection menu in init
* (done) start a gameMap state
* (done) use sm.gridMenu.click to switch to gameMap and back again from gameBuild state
* (done) in gameMap have a system like the build menu only to switch between more than one state
* (done) update draw.js to allow for more than one way to draw a cell
* (done) have a 'value' map that will show the the current land values are for each cell
* (done) have a 'pop' map display in gameMap
* (done) I will need a sm.mapMenu for gameMap state
* (done) use mapSelectMenu in gameMap state to switch between value and population
* (done) display text values on top of the colors for each map
* (done) have a button.desc as the standard key of a button with sm.gridMenu and update all files for this in sm.js, init.js, and draw.js
* (done) new getArea helper that uses array.filter to create an array of units in a given area
* (done) use getArea helper when using the info button in build mode to test that it works the way that it should
* (done) fix #0 bug with 'res' units not devloping by using getArea helper in updateLandValue to see about fxing this 
* (done) have max pop for each cell based on land value

## ( done 01/30/2022 ) - r0 - start with r2 of map-system-paths, cell.data.pop, popDelta
* (done) starting with source code of r2 of map-system-paths
* (done) ver number in main.js should be used for main canvas display
* (done) start a new population system where each cell has a population value as a data object value
* (done) landValue, and in time future revisions other factors will inpact a popDelta value
* (done) over all population is then just a tabulation of all cell.data.pop values
* (done) have a MAX POP PER CELL setting in game.js
* (done) new place holder system for tax
* (done) remove unused code from utils
