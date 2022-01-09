# js-javascript-example-digital-art-unsteady-stars

This is the second javaScript project where the aim is to just make a quick, simple, digital art type thing within the span of just a few days, or even just a few hours if possible. The source code in this example is based off of what I have worked out in various other project examples that in turn also helper to speed along progress. The

The Minimum Viable Product with this digital art project is to have an object pool, and each object has a collection of points that are a kind of star. Over time though the positions of the various points of the star will move around within a given range from each home point of a star. Thus it is a kind of 'unsteady star' that will consist of points that will move out of place into various other locations that are still close to where they should be, but will be a little off base. That is it, nothing fancy with the beyond that, and as such this should not take me that long to make, at least when it comes to getting to that point that represents a Minimum Viable Product. 

After the Minimum Viable product is done I will then want to maybe add a few more features beyond the Basic core idea. I do not think that I will want to put to much time into this one, but for the sake of following threw with something I think I will add at least one or more additional revisions after that of the MVP. Once I get a few additional feature in I will then get to a point where it is just about cleaning up the code, fixing any and all bugs, and making just simple changes as needed to keep code from breaking. In other words a kind of maintenance phase of sorts.

## The Main Goal of this Project is not the Project itself, but a new process of working on projects

The main goal hear was to just start a new habit that I intend to continue with when it comes to additional javaScript examples, as well as canvas examples, and any other projects that I might start at any point in the future. There is thinking in terms of fine grain revisions, and also breaking things down in three phases where each phase is one if not more revisions. 

## General Idea or Minimum Viable Product ( r0 - r2 )

As of this writing the MVP for this idea is done for what it is worth at revision 2. If I set the bar very low at first as to what the core idea is, then it should not be to hard to get to that point and that as the case with this project. The real goal here is to start to think this way with all future projects moving forward, not just this one.

### r0 - Start with source code from various other projects

With revision 0 I started out with the source code from revision 5 of my [reduce pool digital art example](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-digital-art-reduce-pool) as such I also started out with a number of core features right off the bat then including a basic object pool library. I also took the star.js module that I worked out for my canvas examples series [project on drawing stars](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-star), while I was at it I also added a draw points method that I worked out for that project to the draw.js lib for this example.

### r1 - expand star.js with 'unsteady stars'

In this revision the goal was to just simply start, but not necessary finish the main feature of this example by expanding on the star.js module that I copied over from an older project.

### r2 - new positions over deltas, random point counts, colors, size + radius



## Additional Features ( r3 - r4 )

### r3  - rebirth mode

In r3 the first additonal feature that I added was a rebirth mode as a first addtional unit mode beyond just the basic move mode that just moves a unit by the current heading and pps. The birth mode does not move the unit to a new position, but rather cuases a transformation of sorts from the current state of the unit to a new state. This is done by reducing the size of the unit down to zero, at which point values that have to do with the size, color, number of points in the star, heading, speed, ect are changed. At which point the size which is currently at zero is the incressed to a set new size. Once the new size is reached the unit then changed back to move mode.

Other chnages at this point have to do with starting to work out how to go about managing how the various modes will chnage for a unit. For now there are just two, the move and rebirth modes, but looking ahead to the next planed out revision there will be at least one more for this example. So then I added a change mode helper, and also a new init method for a mode object beyond just the update method that such an object had before hand.

At this time I have also address the first of what I am sure of will be a few bugs. This bug \#0 had to do with not reseting the uStar.frame value back to zero when switching modes.

## Maintenance ( r5+ )

When it comes to Maintenance of this project I think that there is only so much that I will be willing to do, at least as long as I am the only one that shows interest in this. Still there is making at least a few changes, as well as removing any unused code that is there from other projects that I pull this from that I am not using and things to that effect. The main goal then with this is to just improve the readability of the source code, as well as fix any bugs that might pop up. The only other thing that comes to mind is maybe making just a few simple changes that might need to be made to adjust things if I aim to deploy this in some way, other than that I do not think that much will be added in terms of new features at this point. 

### r5 - remove unused code


