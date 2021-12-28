sm.states.init = {
    key: 'init',
    start: function(sm){
        utils.log('**********', 'debug');
        utils.log('init state start', 'debug');
        utils.log('app ver: ' + sm.ver, 'debug');
        // load items once at this time
        unitMod.loadItems(sm.data);


        utils.log('**********', 'debug');
        // switch to title state
        sm.setState('title');
    },
    update: function(sm, secs){},
    draw: function(sm, layers){},
    events: {
        pointerEnd: function(e, pos, sm){}
    }
};