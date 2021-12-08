sm.states.game = {
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
        }
    }
};