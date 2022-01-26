# js-javascript-example-tool-source-layer

## Known bugs
* 

<!-- Maintenance -->


<!-- Additional Features -->

## ( ) - r4 - more draw ui options
* set size of brush
* set color of brush

## ( ) - r3 - 'fill' and 'fit' bgModes

## ( ) - r2 - init mode for bgMod objects and 'stretch' bgMode
* add an init mode for each bgMod object that will just be called once when a mode change happens
* the 'update' method of a mode might not need to do anything actually for most moes

<!-- draw -->
* (done) tool size option
* (done) color picker option
* (done) have an eraser tool for the draw app
* (done) make it so that sm.down will set to false when a mouse pointer leaves the canvas
* (done) touch events
<!-- misc -->
* I will want lables for current values of range input elements


<!-- Minimum Viable Product -->

## ( done 01/24/2022 ) - r1 - sourceLayer.createUI, bgMode modes starting with 'custom', and 'center'
<!-- source layer -->
* (done) place holder code generated background when no image is loaded
* (done) start MODES with the center mode
* (done) start a sourceLayer.createUI method where I just pass a source object along with a mount point element to create a ui
* (done) I will need to add a mode select to source ui
* (done) create a method that will update the visibility of input elements based on source.mode
* (done) add a 'custom' mode that should be able to set all values that matter
* (done) have text input elements for source.dx, source.dy, source.dw, and source.dh
* (done) each mode has an array of key names for inputs that will show up in the ui when that made is active

## ( done 01/24/2022 ) - r0 - Basic idea working
* (done) have a canvas element that will serve as a 'source layer'
* (done) have a div area that will serve as a ui for the 'source layer'
* (done) use the file input element type to load and image to draw in the 'source layer'
* (done) have a canvas element on top of the source layer that will serve as a 'draw layer'
* (done) for now have it so that each mouse or touch move while down will cause a circle to draw there with a single color
* (done) have a clear draw canvas button