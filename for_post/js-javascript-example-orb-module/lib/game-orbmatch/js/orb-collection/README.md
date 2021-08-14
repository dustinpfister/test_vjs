# orbCollection

This is a module that is used to create and return an object that is a collection of Orb objects created with the orb client module. The module also appends custom data for the data objects of each orb object that is closely tied to the core game logic of my orb match game, and any additional games that follow the same logic when it comes to setting core orb status for properties such as attack, hp, range, ect.

So then a list of features for this module are as follows

* create and return an object that serves as a collection of orbs, rather than just a single orb object instance
* create custom data for each data object of an orb in the collection that has to do with stats like attack, hp, ect
* provide methods that are useful for working with a collection of orbs.

## Main object structure

The main object structure is an instance of an plain object literal, with an orbs property. This orbs property is then the actual collection of orbs.

```
var collection = {
    faction: opt.faction || 'ai',
    key: opt.key || 'orbCollection',
    orbs: [] // the main array of orb objects in this orb collection
};
```