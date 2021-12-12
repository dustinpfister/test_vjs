sm.states.game = {
    key: 'game',
    start: function(sm){

        var map = sm.data.wm_home || {
            mapStrings: [
    "111111111120000003100000000100000000100000000100000000100000000",
    "111111111000000000000000000000000000000000000000000000000000000",
    "111111111000000001000000001000000001000000001000000001000000001",
    "100000000100000000100000000100000000100000000100000000100000000",
    "000000000000000000000000000000000000000000000000000000000000000",
    "000000001000000001000000001000000001000000001000000001000000001",
    "100000000100000000100000000100000000100000000100000000111111111",
    "000000000000000000000000000000000000000000000000000000111111111",
    "000000001000000001000000001000000001000000001000000001111111111"
            ]
        };

        sm.game = gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            mapStrings : map.mapStrings
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