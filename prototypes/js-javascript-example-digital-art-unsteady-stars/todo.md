# js-javascript-example-digital-art-unsteady-stars todo list

<!-- Maintenance -->

<!-- Additional Features -->

### () - r3 - rebirth mode, and main update pool method

<!-- General Idea or MVP of Project done -->

### ( done 01/08/2022 ) - r2 - new postions over deltas, random point counts, colors, size + radius
* (done) go with a system that has to do with getting random points from home points rather than deltas
* (done) have the number of points be 5 to 10
* (done) random fill colors for the stars
* (done) random base colors
* (done) random base size + radius
* (done) new pos radius option for main unsteady create method

### ( done 01/07/2022 ) - r1 - expand star.js with 'unsteady stars'
* (done) Add methods to create and return an 'unsteady stars' object
* (done) The methods can still return a object that will work with draw.points buy with addital data attached by way of named keys
* (done) Add update method to star.js that can be used mutate one of these 'unsteady stars'

### ( done 01/06/2022 ) - r0 - Start with source code from various other projects
* (done) start with the source code from r5 of reduce pool digital art example
* (done) start with the star.js file from my canvas-example-star project
* (done) expand draw.js with methods from the draw.js file in canvas-example-star
* (done) new game.js file where the over all state for now is just an object pool with the objects just moving around randomly
* (done) use star.js to create an array of points for each display object in the main units pool
* (done) update the draw.pool method to draw and points array, star or otherwise
* (done) update main.js with any needed changes