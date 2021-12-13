sm.states.game = {
    key: 'game',
    start: function(sm){

// void world object
var voidWorld = {
    dataKey: "wm_void",
    mapName: "Void World",
    mapWidth: 9,
    mapHeight: 7,
    mapWorldWidth: 3,
    mapWorldHeight: 3,
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
    ],
    mapPortals: [],
    mapWorldUnits: [] 
};


        var worldMap = sm.data.wm_home || voidWorld;


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