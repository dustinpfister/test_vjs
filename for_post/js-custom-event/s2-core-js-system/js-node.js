let path = require('path'),
eventMod = require(path.join(__dirname, 'event-system.js'));

var player = {
    hp: 10
};

let eventObj = {
    eventKey: 'hit',
    forDispatch: function (obj, dispatchOpt) {
        obj.hp -= dispatchOpt.damage;
        obj.hp = obj.hp < 0 ? 0 : opb.hp;
        // return an event object that will be in the listener
        return {
            target: obj, // ref to the object
            dead: obj.hp === 0
        };
    }
};

// add a hit event for the player object
eventMod.addEvent(player, eventObj);

eventMod.addListener(player, 'hit', function (e) {

    console.log('yes');

});

eventMod.dispatch(player, 'hit', {
    damage: 10
});
