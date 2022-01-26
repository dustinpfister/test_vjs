# js-javascript-example-tool-source-layer

## Known bugs
* 

<!-- Maintenance -->


<!-- Additional Features -->

## ( ) - r3 - 'fit' bgMode
* have a 'fit' mode that will set the source.dw and source.dh values to the size of the canvas, but preseve aspect ratio
* if fit mode is working the way that it should there should be bars on the top and bottom, or side to side

## ( done 01/26/2022 ) - r2 - init mode for bgMod objects, 'stretch' bgMode, draw app improvements
* (done) tool size option
* (done) color picker option
* (done) have an eraser tool for the draw app
* (done) make it so that sm.down will set to false when a mouse pointer leaves the canvas
* (done) touch events
* (done) I will want a disp for the curent size
* (done) add an init mode for each bgMod object that will just be called once when a mode change happens
* (done) start a new stretch mode

<!-- Minimum Viable Product -->

## ( done 01/25/2022 ) - r1 - sourceLayer.createUI, bgMode modes starting with 'custom', and 'center'
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