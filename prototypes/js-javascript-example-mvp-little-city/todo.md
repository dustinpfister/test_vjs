# js-javascript-example-mvp-little-city

## known bugs

* ( fixed in r0 ) - #0 - some res units do not gain land value even when within 3 cells away from road
* ( fixed in r1 ) - #1 - fix bug with grid menu click in build menu
* ( fixed in r2 ) - #2 - road start pos should be within 3 cells

<!-- Maintenance -->



<!-- Additional Features -->

## () - rx - noise polution

## () - rx - air polution

## () - rx - crime

<!-- Minimum Viable Product -->

## () - rx - info button working
* have the info button work in game rather than having it spit out cell data to the console

## () - rx - popDelta revisit 
* the popDelta value will increse or decress population at a given cell

## () - r3 - gameBudget state, Mean Income, Property Tax
* rethink property tax at this point to take into account avg landValue, and mean income

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
