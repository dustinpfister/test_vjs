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

console.log(game);

return game;

    };

    return api;


}())