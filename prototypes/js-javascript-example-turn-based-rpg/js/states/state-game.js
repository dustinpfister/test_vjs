sm.states.game = {
    key: 'game',
    update: function(sm, secs){
        gameMod.update(sm.game);
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    },
    events: {
        pointerStart: function(e, pos, sm){
            gameMod.playerPointer(sm.game, pos.x, pos.y);
        },
        pointerMove: function(e, pos, sm){
            console.log('move');
        },
        pointerEnd: function(e, pos, sm){
            console.log('end');
        }
    }
};