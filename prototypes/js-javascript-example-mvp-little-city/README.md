# js-javascript-example-mvp-little-city

I would like a very basic city simulator game like that of sim city classic, but I am not sure if I will even want to create all the features that are found in that game actually at least when it comes to the MVP of the game at least. Speaking of Minimal Viable Product that is also one of the core thems with this, to just start out with a striped down, simple core of what the game should be with the smallest possible set of features. One major problem with this is even that might still prove to be a fair amount of work, but never the less that is what I want to do with this project.

## Zone Types

When it comes to zone types I think that I am going to want to just start out with three, residential, commercial, and road. That is becuase I think that one of the main starting points here is to figure out what land value should be for each cell, and as such land value will also in turn determine a lot more about the city in terms of population, Mean Income of that population, and thus also Tax revenue.

* (done r0) 'res' cells that are cells that are zoned as residential areas of a game map where people live
* (done r0) 'com' cells that are cells in a map that are zoned for commercial use
* (done r0) 'road' cells which as the name imples are just simply roads that are used in path to determine land value

## Cell data props

When it comes to cell data object properties for now I am thinking that land value, population, and a delta value for population are good starting points for this kind of game. In time there are a lot more properties that I might want to have on a cell by cell basis such as crime, polution, and so forth, however I think much of that will extend beyond that of what the scope of an MVP would be.

* (done r0) landValue
* (done r0) population
* (done r0) popDelta

## City Problems

There is what will cause land value to go up, and there is also what will case land value to go down, or for one reason or another nagativly impact over all population, happness of population, Mean income of population, ect. Thus there should be at least a few things that are a kind of problem with the city that can be solved by better layout, or incresed funding to some kind of public service, or lower Taxes. For a full blown little city game there might be a lot of problems, but for this MVP I will want to keep this list short and focus more so on the over all base of things.

* High Taxes - a problem that is caused by a tax rate that is higher than a set max tolerence
* Bad Roads - This is the result of lack of funding to roads
* Unemployment - A problem that is the result of low com unit count

## States

I will want to have a state machine, and a lot of states, even for an MVP of this.

### Map State of game
* (done r1) start the map state that shows various vishual states of values for the city
* (done r1) value map - a map that shows land value
* (done r1) pop map   - a map that shows pop
* (done r2) roads map - a map that just shows the current state of roads in the city

### Budget gameState
* I will want a budget state that can be used to set a tax rate, as well as how much money to spend on public services

### Voice gameState
* a state that shows what the current problems of the city are, and what the over all score is
* display each problem and an index value as to how big of a problem it is
* display % yes and no values to the question 'is the major doing a good job'
* display a score

### totals gameState
* a state that shows totals for 'res', 'com', and 'road' units

### main menu state
* have a main menu state that can be used to start a new game, or load an older one

### start new state
* a app state that is a menu that can be used to set values for a new city

### load state
* an app state that can be used to load a city

### loader state
* a state that is used to load art assets used to skin the game


## Minimum Viable Product versions (r0 - rx )

For this whole javaScript example the whole idea is to create and maintain a Minimal Viable Product and to not go nuts with features. So for my mvp little city game here I am breaking away from my MVP => Addtional Features => Maintenance way of thinking about a project, and just worrying about what the MVP state of a project is. Once I have a solid MVP worked out I might then create one or maybe even a few addtional projects based off of the MVP and a given revision number of this MVP.

### r0 - Crude start of Little City

I was able to get much of the general idea up and working with this very first revision of Little City. At this point I have all the zones as well as the core data props started. However the process at which I am figuring land value and population is very primative and I am not taking into acount the distance to com zones from res zones. There are also many varios applaction states that are missing at this point that I think are still very much needed even for an MVP.

### r1 - Init, Build, and Map state

For this revision I added states and have a better over all system for software architecture of the game.

### r2 - Paths to com units to figure land value

With this revision I now have a good system for figuring what the value of a res zone should be by using the path detection of my map module to find how many com zones there are, and the avg distance to them. However I might still want to work out a few things with the system that is used for this, but at this point much of that might just be a few simple details.

### r3 - Tax


