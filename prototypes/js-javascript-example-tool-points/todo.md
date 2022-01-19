# js-javascript-example-tool-points

## Known bugs
* ( fixed in r1 ) - #0 - Fix deal with fill:false not working as it should in draw.js 

<!-- Maintenance -->

## () - rx - json input validation
* I will want an input validation helper

<!-- Additional Features -->

## () - rx - points, and line rotation

## () - rx - menu bar
* start a menu bar area that will contain typical options like 'file', 'edit', 'help' ect


<!-- Minimum Viable Product -->

## () - r5 - FileReader api to load background image
* I will want at least two canvas elements, one for the background and another for the points
* use the FileReader api to load an image and use that as a the content of a background canvas

## () - r4 - FileReader api to load and save points
* load and save points using FileReader api

## () - r3 - draw new mode
* create a new object by just clicking points in the canvas with a 'draw new mode'

## () - r2 - point, and line indices Selection system
* (done) I will want a projectMod.getObjectCenter method that will return a position that is at the center of a given project object
* (done) start to have more than one state object in main.js, have the current app be a 'init' state
* (done) start an 'editProject' state

* (done) I will want a draw.selectors method

* in 'editProject' state use projectMod.getObjectCenter to place disp objects at the center of each object
* in 'editProject' state move a whole object by clicking and draging the center disp object

* start an 'editObject' state that will be used to mutate just one object in a current tab
* when one of these display objects in 'edit.project' are clicked enter 'edit.object' state with that object selected
* select a single index value in a single object that will be a current point index value
* can move a single point of a single line by moveing the mouse

## ( done 01/19/2022 ) - r1 - text area element, start a points.js, and utils.js file
* (done) have a text area element that can be used to create a points array with text
* (done) any change to the text area input area will update the canvas if it is valid
* (done) any change to a tab will update the text content to the current project
* (done) if more than one object in a project draw them all
* (done) See if I can get JSON.stringify working the way I would like it to with a replacer and regex formating maybe
* (done) start a utils.js and have a utils.removeAllChildNodes
* (done) add a utils.jsonPretty method
* (done) start a points.js file and have a pointMod.createBox helper
* (done) have a utils.defaults object method and use that for the options of pointMod.createBox
* (done) use pointMod.createBox in project.js to create the build in starting box
* (done) see about fixing bug #0
* (done) fill option for pointMod.createBox

## ( done 01/18/2022) - r0 - Start with draw points example code, sm.tab and Project object started
* (done) start out with the system that I worked out for my js-javascript-example-draw-points post
* (done) use the draw points method from js-javascript-example-draw-points post in draw.js
* (done) have an sm.tab array that will be an array of loaded points projects
* (done) each element in a tab array wil then be a Project object
* (done) a Project object will contain a fileName prop
* (done) a project object will contain an array of points arrays
* (done) have a collection of tabs above the canvas that can be used to switch between tabs