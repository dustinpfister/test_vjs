var gameMod = (function(){

    var api = {};

    api.create = function(opt){
        var game = {
            money: 1000,
            population: 0,
            year: 1900,
            secsPerYear: 10,
            secs: 0,
            map: mapMod.create({
                w: 10,
                h: 8,
                marginX: 128,
                marginY: 32,
                cellSize: 40
            })
        };
        return game;
    };

    api.buildAt = function(game, unitKey, a, b){
        var cell = null;
        if(typeof a === 'object'){
           cell = a;
        }
        if(typeof a === 'number'){
           cell = mapMod.get(game.map, a, b)
        }
        if(game.money >= 100 && cell){
            game.money -= 100;
            cell.data.unit = {
                unitKey: unitKey,
                fillStyle: unitKey === 'res' ? 'red' : 'blue'
            }
        }
    };

    return api;


}())