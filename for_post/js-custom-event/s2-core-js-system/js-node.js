let path = require('path'),
eventMod = require(path.join(__dirname, 'event-system.js'));

var player = {
    hp: 10
};

// CREATE AND ADD A 'HIT' EVENT FOR THE PLAYER OBJECT
let eventObj = {
    eventKey: 'hit',
    forDispatch: function (obj, dispatchOpt) {
        obj.hp -= dispatchOpt.damage;
        obj.hp = obj.hp < 0 ? 0 : obj.hp;
        // return an event object that will be in the listener
        return {
            target: obj, // ref to the object
            damage: dispatchOpt.damage,
            dead: obj.hp === 0
        };
    }
};
eventMod.addEvent(player, eventObj);

// ATTACH A LISTNEER FOR THE 'HIT' EVENT
eventMod.addListener(player, 'hit', function (e) {
    console.log(e.dead, e.target.hp);
});

// DISPATCH THE EVENT
eventMod.dispatch(player, 'hit', {
    damage: 3
});
// false 7
eventMod.dispatch(player, 'hit', {
    damage: 7
});
// true 0
