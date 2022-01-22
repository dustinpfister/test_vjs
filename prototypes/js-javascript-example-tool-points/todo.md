# js-javascript-example-tool-points

## Known bugs
* ( fixed in r1 ) - #0 - Fix deal with fill:false not working as it should in draw.js 
* ( fixed in r2 ) - #1 - when moving the project.js built in POINTS.WEIRD points the selector postion updates to a wrong position 

<!-- Maintenance -->

## () - rx - json input validation
* I will want an input validation helper

<!-- Additional Features -->

## () - rx - Background transformation
* background transform flip horizontal
* background transform flip vertical

## () - rx - Background - rotation
* background rotation angle option

## () - rx - Background - Additional modes, 'tiled', 'fit', and 'fill'
* I will want to have a 'fit' background mode that will fill the whole canvas, but with a preserve aspect ratio with bars
* have a 'fill' mode like 'fit', but without bars resulting in image loss if source image and the canvas ratios do not match.
* have a 'tiled' bg mode

## () - rx - Background - Additional mode 'custom'
* start a 'custom' bgMode that will allow for setting
* I will then want text input elements for dx dy dw and dh in the area-background div

## () - rx - menu bar
* start a menu bar area that will contain typical options like 'file', 'edit', 'help' ect

## () - rx - FileReader api to load and save projects
* load and save points using FileReader API

## () - rx - new tab buttons
* in the tab selection area there should be a button that when clicked will create a new tab

## () - rx - delete tab button
* each tab in the tab selection area should have a button that when clicked will purge that project

## () - rx - draw new mode
* create a new object by just clicking points in the canvas with a 'draw new mode'

## () - rx - object rotation

## () - rx - line rotation

## () - r6 - Background - bgMode options starting with zoom level for center mode
* (done) break down backgroundModes in draw.js into an object for each bgMode
* each function for each bgMod should be a parseBGOpt method for the mode, and update setBackgroundOptDefaults to work with this
* start having options for each bgMod starting with center mode which will just need a zoom option
* I will need to add a bgModeOptions div in index.html that will change depending on the bgMode

## ( done 01/21/2022 ) - r5 - view state, basic background options with modes and solid color set, circle points method
* (done) start a new 'view' state that will be used to just view the current project in the canvas
* (done) click anyware in the canvas other than a selector location while in 'editProject' state to enter 'view' state
* (done) have an empty selectors array and do not draw selectors at all even while in 'view' state
* (done) do not draw ver or any debug mode data while in 'view' state
* (done) when in 'view' state click anywahere in the canvas to enter 'editProject' state again
* (done) I will want background.dx, dy, dw, and dh values to set the destanation position and size of the background image
* (done) I will want a number of typical background modes to choose from starting with what is often called 'stretch' mode
* (done) I will want to have a 'center' background mode
* (done) draw.BGParseOpt method that will parse and return a background object that can then be used with draw.background
* (done) I will want a background mode selection element in the html
* (done) have a way to clear the background image with a 'none' bgMode
* (done) I will want to have a way to set the solid color for the background
* (done) have a points.createEllipse method
* (done) use pointMod.createEllipse to create a POINTS.CIRCLE const in project.js
* (done) use POINTS.CIRCLE for untitled 0
* (done) use POINTS.BOX for untitled 1
* (done) new untiled2 using a POINTS.TRI
* (done) new untitled3 using a POINTS.ELLIPSE

<!-- Minimum Viable Product -->

## ( done 01/20/2022 ) - r4 - FileReader api to load background image
* (done) I am going to want a area-background div
* (done) update style and html so that the area-background is next to area-json
* (done) have an sm.background object starting with a solid prop
* (done) update draw.background to use sm.background to set solid background color
* (done) I will need a file type input element in the area-background div that will be used with fireRead to open a background image
* (done) use the FileReader api to load an image and set that as an sm.background.image prop
* (done) I will want an on load event for the image object, and call the current state over when that event fires

## ( done 01/20/2022 ) - r3 - editObject state
* (done) start an 'editObject' state that will be used to mutate just one object in a current tab
* (done) add utils.chunk method
* (done) add utils.newChunked method
* (done) I will need a createPointSelectors helper in main.js
* (done) when one of these selector objects in 'editProject' are clicked enter 'editObject' state with that object selected
* (done) in editObject mode when a selctor is clicked that results in a point being selected
* (done) can translate a single point of a single line by moveing the mouse in editObject mode
* (done) add and use utils.createCanvas

## ( done 01/19/2022 ) - r2 - point, and line indices Selection system
* (done) I will want a projectMod.getObjectCenter method that will return a position that is at the center of a given project object
* (done) start to have more than one state object in main.js, have the current app be a 'init' state
* (done) start an 'editProject' state
* (done) I will want a draw.selectors method
* (done) in 'editProject' state use projectMod.getObjectCenter to place selector objects at the center of each object
* (done) pointsMod.numbersOnly method
* (done) I will need a pointsMod.translatePoints method
* (done) in 'editProject' state move a whole object by clicking and draging the selector of an object
* (done) see about fixing bug #1
* (done) I think I will want a draw method for each state
* (done) call the draw method for the current state where and when needed when switching tabs, editing json, and using the selector objects

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