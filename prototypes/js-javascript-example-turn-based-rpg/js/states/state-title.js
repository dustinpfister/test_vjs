sm.states.title = {
    key: 'title',
    update: function(sm, secs){
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.titleText(sm);
        draw.ver(sm);
    },
    events: {
        pointerStart: function(e, pos, sm){
            sm.setState('game');
        }
    }
};