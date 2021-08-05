# js-javascript-example-orb-module

This is the source code for my orb module that I would like to use in at least one if not more games. The general idea is to have an orb object that is the combination of one or more elements, such as four elements. When it comes to this there is the current point array of elements that is how many of each element composes the current orb. There is then also ascertaining the simple ratio of these element point values, which in turn can also be used to find integer values that can represent level. 

## The simple ratio and orb types

The simple ratio can be used as a way to find what type of orb an orb is. This can then result in all kinds of interesting possibles when it comes to making orb types, especially when it comes to the idea of making a database of orb types that follow an kind of recipe type. For examples an orb with a ratio like 1,0,0,0 can be thought of as a 'pure' type, while a ratio like 1,1,0,0 or 1,0,0,1 can be thought of as a 'duel' type. Then there are ratios like 3,1,0,5 that could be one of many 'recipe' type orbs in a data base. So then a 'composite' type can be assumed by default, and then some quick conditionals can be used to find out if it is any known type. These types can then be used to apply all kinds of effects to additional properties of the orbs. the specifics of which will differ a little from one game to another.


## The Orb Types

This will be an overview of the various values for the type property of an orb

### null type

```js
var orb = orbMod.createFromLevel([0,0,0,0], 0);
console.log(orb.type); // null
```

### pure type

```js
var orb = orbMod.createFromLevel([1,0,0,0], 7);
console.log(orb.type); // 'pure'
```

### dual type

```js
var orb = orbMod.createFromLevel([1,0,1,0], 7);
console.log(orb.type); // 'dual'
```