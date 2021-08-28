# game-orbmatch

A simple game that I have made just for the sake of testing out this orb module and make sure that things are working the way they should be when it comes to using the module to make a game as intended. The general idea for this game is to just have a simple turn base style game that involves having two collections of orb objects, one of which is under player control, and the other under control of an AI opponent. Each player has four slots, and a collection of orbs from which they can swap orbs to and from when it is there turn. In addition to setting which orbs are in the slots, they can also choose an orb that will attack for the turn, and which target ai orb to attack. The other orbs can still have an effect for a turn when it comes to a supportive role.

## TypeKey file format

```js
// pure typeKey example
OrbCollection.load({
    typeKey: 'pure',
    baseStats: { // how base stats values will level up (these values are effected only by level and not ratio)
        attack: {
            startValue: 1,
            deltaIncPerLevel: 1 // delta value that will be added per level
        },
        hpMax: {
            startValue: 10,
            deltaIncPerLevel: 10
        },
        heal: {
            startValue: 0.25,
            deltaIncPerLevel: 0.25
        }
    },
    elementDeltas: { // additional deltas to stats that are applyed per element
        0 : { // fire elements add to attack
            attack: 0.25
        },
        1: {},
        2: { // water elements add to hpMax, and heal
            hpMax: 5,
            heal: 0.25
        },
        3: {}
    }
});
```

## libs

The game consists of a number of javaScript files in which I am separating certain concerns. I have a general utility module that contains methods like a distance formula and other basics tools, alone with the orb client module or course, and many other modules that have to do with the over all game logic.

### utils.js

This is the general utility library for this game that contains methods like the distance formula, and many other usual suspect type methods that are found in many games like this.

### ratio.js

### orb-client.js

### orb-collection.js

## game.js

## draw.js

## main.js