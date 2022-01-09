# js-javascript-example-digital-art-unsteady-stars todo list

<!-- Maintenance -->

## Known bugs
* #0 - ( fixed in r3 ) - Bug where a uStar points would move around all over the place as the size goes down in rebirth mode
* #1 - () - there are issues that happen when tab becomes inactive

## () - r5 - remove unused code
* remove any unused create method from star.js such as create2 if it is still not in use at this point

<!-- Additional Features -->

### () - r4 - move2 mode with heading change, and variable speed
* (done) new utils method that will help to get the shortest direction to targetHeading
* (done) new utils method to get angular distance from oldHeading to targetHeading
* (done) start a new mode that is like move mode but will also change heading over time
* (done) I will want a targetHeading value for the unit data object that will be the new target heading to go to
* (done) I will want a oldHeading value that will store the current unit.heading value at the moment that a heading change starts
* (done) There will then need to be a radiansPerSec value that will be the rate at which the unit.heading value will change to targetHeading

* variable speed with move2 with uDat.targetPPS
* figure out a way to handle switching with move, move2, and rebirth modes
* see about fixing bug #1 as the size change should not happen when a tab becomes inactive

### ( done 01/09/2022 ) - r3 - rebirth mode
* (done) start a new mode that is a rebirth mode that will cause a unit to reset with all new values
* (done) in rebirth mode the position will stay the same
* (done) randomPPS helper
* (done) start an init method for unit mode objects that will be called each time the mode changes
* (done) have a changeMode helper that will be used to change mode, rather than just setting the string value
* (done) in rebirth mode the size of a unit will go down from the current size down to zero
* (done) once at zero the unit will have all new values for the star, as well as heading, speed, ect
* (done) once all values are set the size will then go back up from zero to the new full size
* (done) once the new size is set the mode with switch to move mode
* (done) make it so that the size of points will update for the old points as the unit size goes down to zero
* (done) make it so that the size of points will update and unit size goes back up
* (done) fix bug #0 where stars will move around weird as the size goes down in rebirth mode
* (done) see about adjusting so that the unit size goes down to the center rather than the upper left corner

<!-- General Idea or MVP of Project done -->

### ( done 01/08/2022 ) - r2 - new positions over deltas, random point counts, colors, size + radius
* (done) go with a system that has to do with getting random points from home points rather than deltas
* (done) have the number of points be 5 to 10
* (done) random fill colors for the stars
* (done) random base colors
* (done) random base size + radius
* (done) new pos radius option for main unsteady create method

### ( done 01/07/2022 ) - r1 - expand star.js with 'unsteady stars'
* (done) Add methods to create and return an 'unsteady stars' object
* (done) The methods can still return a object that will work with draw.points buy with additional data attached by way of named keys
* (done) Add update method to star.js that can be used mutate one of these 'unsteady stars'

### ( done 01/06/2022 ) - r0 - Start with source code from various other projects
* (done) start with the source code from r5 of reduce pool digital art example
* (done) start with the star.js file from my canvas-example-star project
* (done) expand draw.js with methods from the draw.js file in canvas-example-star
* (done) new game.js file where the over all state for now is just an object pool with the objects just moving around randomly
* (done) use star.js to create an array of points for each display object in the main units pool
* (done) update the draw.pool method to draw and points array, star or otherwise
* (done) update main.js with any needed changes