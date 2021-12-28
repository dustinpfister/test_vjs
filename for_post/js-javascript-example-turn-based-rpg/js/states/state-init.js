sm.states.init = {
    key: 'init',
    start: function(sm){
        utils.log('init state start', 'debug');
        // load items once at this time
        unitMod.loadItems(sm.data);
        // switch to title state
        sm.setState('title');
    },
    update: function(sm, secs){},
    draw: function(sm, layers){},
    events: {
        pointerEnd: function(e, pos, sm){}
    }
};