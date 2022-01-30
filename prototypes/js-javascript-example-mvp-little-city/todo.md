# js-javascript-example-mvp-little-city


<!-- Maintenance -->



<!-- Additional Features -->


<!-- Minimum Viable Product -->

## () - rx - 

## () - r2 - Paths to com units
* have an update process that will use path detection to set land value for units
* have roads set walkable values for cells to true
* for 'res' units the number of paths to 'com' units will raise land value
* for 'res' units the avg length of paths to 'com' units will rase land value (lower would be better)

## () - r1 - map modes
* I will want to start a system that will be more than one way to display info about the map
* have a normal map that is just the current view
* have a landValue map that will show the the current land values are for each cell

## () - r0 - start with r2 of map-system-paths, cell.data.pop, popDelta
* (done) starting with source code of r2 of map-system-paths
* (done) ver number in main.js should be used for main canvas display
* (done) start a new population system where each cell has a population value as a data object value
* (done) landValue, and in time future revisions other factors will inpact a popDelta value
* (done) over all population is then just a tabulation of all cell.data.pop values
* (done) have a MAX POP PER CELL setting in game.js


* the popDelta value will increse or decress population at a given cell
