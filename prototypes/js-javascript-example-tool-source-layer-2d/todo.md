# js-javascript-example-tool-source-layer

## Known bugs
* 

<!-- Maintenance -->


<!-- Additional Features -->

## ( ) - r5 - more draw ui options
* set size of brush
* set color of brush

## ( ) - r4 - 'fill' and 'fit' bgModes

## ( ) - r3 - 'stretch' bgMode

## ( ) - r2 - sourceLayer.createUI method


<!-- Minimum Viable Product -->

## ( ) - r1 - bgMode modes starting with 'custom', and 'center'
<!-- source layer -->
* (done) place holder code generated background when no image is loaded

* start bgModes starting with a custom mode that should be able to set all values that matter
* have text input elements for source.dx, source.dy, source.dw, and source.dh
* each mode has an array of key names for inputs that will show up in the ui when that made is active

<!-- draw -->
* have an eraser tool for the draw app
* make it so that sm.down will set to false when a mouse pointer leaves the canvas
* touch events


## ( done 01/24/2022 ) - r0 - Basic idea working
* (done) have a canvas element that will serve as a 'source layer'
* (done) have a div area that will serve as a ui for the 'source layer'
* (done) use the file input element type to load and image to draw in the 'source layer'
* (done) have a canvas element on top of the source layer that will serve as a 'draw layer'
* (done) for now have it so that each mouse or touch move while down will cause a circle to draw there with a single color
* (done) have a clear draw canvas button