# js-javascript-example-mvp-composite-tank

This aims to be a game prototype where I figure out all the features that I want to have before I even get started.

## Minimum Viable Product versions (r0 - )

### R0 - new object pool system

Have display objects be a separate thing from pools. This is because the player will control one or more units where each of unit will be a composition of several display objects. So this is the main thing that I would want to get solid in revision zero.

### R1 - crude basics of game working

In this revision I would like to get the crude basics of the game working. This week just be one or more player units that are fixed to the bottom of the canvas. Enemy units will then spawn from the top of the canvas and move down to the bottom of the canvas. When enemy units come into range of the player units they will open fire.

At this point the player can die but when they do the have will just reset for now.

The player can also do manual damage to enemy units by just clicking on a location on the canvas which will fire any and all manual control components of all player units.

The player units should also have components that fire at the enemy units when they are in range.

### R2 - config state

In this revision I would like to get the state machine worked out. I would also like to start the first set of states. So have the following states: loader, init, title, save, config, and game.

When it comes to the loader state that can just directly switch to int for now. The main focus at this time should be the config state.

### R3 - loader

When it comes to the loader I am thinking that I might want to start out with what I worked out in the turn based rpg rather than Clucker.
This loader will have to be revised to allow for images on top of JSON.

Have some basic art for the game this far.

## R4 - save state menu





## Some Addtional Features, fixes and general changes (rx - )


## Software Architecture ( rx - )




