# js-javascript-example-digital-art-invaders

This is yet another one of my digital art javaScript examples this time it is a simple project involving invading display objects that move in to a loctation in which there are other stationary display objects that are to be destroyed. These statioary display objects also fight back the invadiors 

This is the third digital art project example, continuing with a trend that I think I think is working out well so far when it comes to planing out a project in a way where there is a clear idea as to how long it will take to make.


## General Idea or Minimum Viable Product ( r0 - r3 )

### r0 - Start project, and units.js

When I first started this project I copied what I had for revision 4 of my unsteady stars example, and then striped that down to a crude starting point. Off of that I started a new units.js library as I would like to start a new system for this sort of thing while working on this project.

### r1 - pool-normalized.js

One addtional goal that I hade in mind while working on this project was to make an updated object pool module. This was what I set out to do, and finish with r1 of invaders. The original object pool libray that I started in my canvas example on the topic worked okay, but one thing that bothered me with it was that the x and y values of a display object refer to the upper left corner of the display object. I have found that a better system is to think in terms of the x and y value always refering to the center of a display object, and adjust from there as needed.

### r2 - first unit types, units-buildings.js, units-attackers.js, and units-shots.js

In this revision I added a load method to units.js that will allow for adding more than one type of unit pool to create for a main game object. I then did away with all logic in units.js that is used to define a pool, taking the librray in a direction in which it is a kind of library that is always going to need to be used with at least one plug in, rather than having some kind of built in type. The unit.js lib is then now a project that is used to load an exteral file that defines a type of unit pool, and also a file that has a whole bunch of methods that are usful for creating such an exteral plugin file.

### r3 - More work on shots, buildings attacking back

Addtional work was done on the shots unit.js plugin, allowing for chnages that made it so that attackers fire shots rather than doing direct damage. In addtion I also made it so that buildings fire back at the attackers also.

## Additional Features ( r4 - rx )

### r4 - unitMod totalPower method, shot accuracy

Added a unitMod.totalPower method as a way to get an idea of how powerful one side is compared to the other. For now this method will just take into account over all Damage Per Second. However the aim of this method is to just have a basic tool that might help with balancing stats as I play around with some figures with that moving forward with addtional revisions of this. Another note worth feature added at this point was some additonal logic that will allow for setting an accuracy value for shots in the form of a 0 to 1 value. For now I am thinking that it might be best to have a system that will adjust the given heading value when spawning a shot bu that of a delta value. This delta value will be set by a given accuracy option, a hard coded max angle, and the use of the Math.random method.

### r5 -

## Maintenance ( rx+ )



