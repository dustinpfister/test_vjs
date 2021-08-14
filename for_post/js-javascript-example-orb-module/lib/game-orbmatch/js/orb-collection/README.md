# orbCollection

This is a module that is used to create and return an object that is a collection of Orb objects created with the orb client module.

## Main object structure

The main object structure is an instance of an plain object literal, with an orbs property. This orbs property is then the actual collection of orbs.

```
var collection = {
    faction: opt.faction || 'ai',
    key: opt.key || 'orbCollection',
    orbs: [] // the main array of orb objects in this orb collection
};
```