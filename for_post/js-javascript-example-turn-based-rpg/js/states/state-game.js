sm.states.game = {
    key: 'game',
    start: function(sm){
        // figure out what the starting world map should be
        var worldMap = sm.data.wm_home || gameMod.VOID_WORLD;
        // create game object
        sm.game = gameMod.create({
            sm: sm,
            worldMap: worldMap,
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            mapStrings : worldMap.mapStrings
        });
    },
    update: function(sm, secs){
        gameMod.update(sm, secs);
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
            gameMod.pointerStart(sm, pos.x, pos.y);
        },
        pointerEnd: function(e, pos, sm){
            gameMod.pointerEnd(sm, pos.x, pos.y);
        }
    }
};