sm.states.title = {
    key: 'title',
    start: function(sm){
        utils.log('**********', 'debug');
        utils.log('title start', 'debug');
        utils.log('**********', 'debug');
    },
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