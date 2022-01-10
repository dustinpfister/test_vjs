# js-javascript-example-digital-art-unsteady-stars

This is the second javaScript project where the aim is to just make a quick, simple, digital art type thing within the span of just a few days, or even just a few hours if possible. The source code in this example is based off of what I have worked out in various other project examples that in turn also helper to speed along the progress of getting this done.

The Minimum Viable Product with this digital art project is to have an object pool, and each object has a collection of points that are a kind of star. Over time though the positions of the various points of the star will move around within a given range from each home point of a star. Thus it is a kind of 'unsteady star' that will consist of points that will move out of place into various other locations that are still close to where they should be, but will be a little off base. That is it, nothing fancy with the beyond that, the goal is to just create a MVP, add a few features, and then maybe just a little maintenance. In other words follow threw with a project, *FINISH THE PROJECT*, and then move on to something else.

## The Main Goal of this Project is not the Project itself, but a new process of working on projects

The main goal hear was to just start a new habit that I intend to continue with when it comes to additional javaScript examples, as well as canvas examples, and any other projects that I might start at any point in the future. There is thinking in terms of fine grain revisions, and also breaking things down in three phases where each phase is one if not more revisions. These three phases are then also follows:

* The Minimum Viable Product phase
* The Additional Features Phase
* The Maintenance Phase

So then there is working one what the basic idea is, and that is it. Even if that basic idea is very crude, and also maybe a bit bland, it does not matter. Just getting the core idea up and running is all the matters first, then I can progress into a phase that has to do with adding features that make the idea more interesting, easy to use, or fun. Once it would seem that there are enough features then it is just a matter of making sure that the code will continue to work okay. While in this final phase the main focus should be Fixing any and all bugs, making code more readable, improving any documentation such as this that describes what the deal is with everything and so forth.

## General Idea or Minimum Viable Product ( r0 - r2 )

As of this writing the MVP for this idea is done for what it is worth at revision 2. If I set the bar very low at first as to what the core idea is, then it should not be to hard to get to that point and that as the case with this project. The real goal here is to start to think this way with all future projects moving forward, not just this one.

### r0 - Start with source code from various other projects

With revision 0 I started out with the source code from revision 5 of my [reduce pool digital art example](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-digital-art-reduce-pool) as such I also started out with a number of core features right off the bat then including a basic object pool library. I also took the star.js module that I worked out for my canvas examples series [project on drawing stars](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-star), while I was at it I also added a draw points method that I worked out for that project to the draw.js lib for this example.

### r1 - Expand star.js with 'unsteady stars'

In this revision the goal was to just simply start, but not necessary finish the main feature of this example by expanding on the star.js module that I copied over from an older project by starting a unsteady star object. There is a method to create and return a uStar object, as well as a method to update one as well. In addition to this I also worked out what values I would like to have randomized.

### r2 - New positions over deltas, random point counts, colors, size + radius

This is where I have finished with this example as far as the core idea of what it will be at least. The points of the stars move around the way that I had in mind, and everything seems to be working okay. The next step is to add at least one or two additional features to help making the digital art project a little more interesting, and also I will want to start working out some bugs, but at this point the project is all ready pretty much done.

## Additional Features ( r3 - r4 )

After I have a Minimum Viable Product chances are that MVP for short will be just simply that, as such it will typically be called for to add at least one, if not more additional features once the core idea is done. Because this digital art project is for the most part just a kind of exercise of an over all model of how to start, improve, and maintain a project, I will only be adding a few features at this point.

### r3  - New 'rebirth' mode

In r3 the first additional feature that I added was a rebirth mode as a first additional unit mode beyond just the basic move mode that just moves a unit by the current heading and pps. The birth mode does not move the unit to a new position, but rather causes a transformation of sorts from the current state of the unit to a new state. This is done by reducing the size of the unit down to zero, at which point values that have to do with the size, color, number of points in the star, heading, speed, ect are changed. At which point the size which is currently at zero is the increased to a set new size. Once the new size is reached the unit then changed back to move mode.

Other changes at this point have to do with starting to work out how to go about managing how the various modes will change for a unit. For now there are just two, the move and rebirth modes, but looking ahead to the next planed out revision there will be at least one more for this example. So then I added a change mode helper, and also a new init method for a mode object beyond just the update method that such an object had before hand.

At this time I have also address the first of what I am sure of will be a few bugs. This bug \#0 had to do with not reseting the uStar.frame value back to zero when switching modes.

### r4 - New 'move2' mode

At least one more additional mode might be nice that is a more advanced form of movement that will not just move by a fixed pps and heading, but also change heading and or pps while moving also. This the main feature of this revision was the introduction of the second move mode just called simply move2 as I am bad with names. Sense there are now three modes one of which has to do with just transition from one set of values to another, and the other two with just movement the other main area of focus was to revisit how units switch from one mode to another. If I where to continue working on this mode switching is something that I would want to put even more thought into, but for now I just fond something that seems to work okay. 

In this revision I also fixed an additional two bugs that had to do with clamping in this new move2 mode for units. Lots of additional changes most of which have to do with just the over all style of the digital art project, as well as a number of helper functions to help keep the over all body of code a little more fine grain.

## Maintenance ( r5+ )

When it comes to Maintenance of this project I think that there is only so much that I will be willing to do, at least as long as I am the only one that shows interest in this. Still there is making at least a few changes, as well as removing any unused code that is there from other projects that I pull this from that I am not using and things to that effect. The main goal then with this is to just improve the readability of the source code, as well as fix any bugs that might pop up. The only other thing that comes to mind is maybe making just a few simple changes that might need to be made to adjust things if I aim to deploy this in some way, other than that I do not think that much will be added in terms of new features at this point. 

### r5 - Remove unused code


