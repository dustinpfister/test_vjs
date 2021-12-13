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
        pointerEnd: function(e, pos, sm){

            // change to game state
            sm.setState('game');
        }
    }
};