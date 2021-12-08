sm.states.game = {
    key: 'game',
    update: function(sm, secs){
        gameMod.update(sm.game);
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.map(sm);
  
        if(sm.game.mode === 'map'){
            draw.info(sm);
        }

        if(sm.game.mode === 'menu'){
            draw.back(sm, 'rgba(0,0,0,0.5)');
            draw.options(sm);
        }

        draw.ver(sm);
    },
    events: {
        pointerStart: function(e, pos, sm){
            //gameMod.playerPointer(sm.game, pos.x, pos.y);
            gameMod.pointerStart(sm, pos.x, pos.y);
        },
        pointerEnd: function(e, pos, sm){
            //gameMod.playerPointer(sm.game, pos.x, pos.y);
            gameMod.pointerEnd(sm, pos.x, pos.y);
        }
    }
};