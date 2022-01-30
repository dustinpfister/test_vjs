# js-javascript-example-mvp-little-city


<!-- Maintenance -->



<!-- Additional Features -->

## () - rx - noise polution

<!-- Minimum Viable Product -->

## () - rx - info button working
* have the info button work in game rather than having it spit out cell data to the console

## () - rx - air polution

## () - rx - crime

## () - rx - popDelta revisit 
* the popDelta value will increse or decress population at a given cell

## () - r3 - Mean Income, Property Tax
* rethink property tax at this point to take into account avg landValue, and mean income

## () - r2 - Paths to com units
* have an update process that will use path detection to set land value for units
* have roads set walkable values for cells to true
* for 'res' units the number of paths to 'com' units will raise land value
* for 'res' units the avg length of paths to 'com' units will rase land value (lower would be better)

## () - r1 - game states, and 'map' state
* have a system like the build menu only
* have a normal map that is just the current view
* have a landValue map that will show the the current land values are for each cell

## ( done 01/30/2022 ) - r0 - start with r2 of map-system-paths, cell.data.pop, popDelta
* (done) starting with source code of r2 of map-system-paths
* (done) ver number in main.js should be used for main canvas display
* (done) start a new population system where each cell has a population value as a data object value
* (done) landValue, and in time future revisions other factors will inpact a popDelta value
* (done) over all population is then just a tabulation of all cell.data.pop values
* (done) have a MAX POP PER CELL setting in game.js
* (done) new place holder system for tax
* (done) remove unused code from utils
