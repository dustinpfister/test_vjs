var gameMod = (function(){

    var UNIT_TYPES = {};

    UNIT_TYPES.res = {
        cost: 100,
        fillStyle : '#880000'
    };

    UNIT_TYPES.com = {
        cost: 150,
        fillStyle : '#000088'
    };

    UNIT_TYPES.road = {
        cost: 10,
        fillStyle : '#888888'
    };


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

        game.map.cells.forEach(function(cell){
            cell.data.fillStyle = 'white';
        });

        console.log(mapMod.getCollectionByPos(game.map, 2, 2, 2, 2));

        return game;
    };

    api.buildAt = function(game, unitKey, a, b){
        var cell = null;
        var unitType = UNIT_TYPES[unitKey];
        if(typeof a === 'object'){
           cell = a;
        }
        if(typeof a === 'number'){
           cell = mapMod.get(game.map, a, b)
        }
        if(game.money >= unitType.cost && cell){
            game.money -= unitType.cost;
            cell.data.unit = {
                unitKey: unitKey,
                fillStyle: unitType.fillStyle
            }
        }
    };

    var getDeltaMoney = function(game){
        var deltaMoney = game.map.cells.reduce(function(acc, cell){
            if(cell.data.unit){
                if(cell.data.unit.unitKey === 'com'){
                    acc += 10 + 50 * sm.game.population;
                }
            }
            return acc;
        }, 0); 
        return deltaMoney;
    };

    // GET UNIT TYPE COUNT
    // This is a helper that will get a count of unit types at a max distance
    // from the given cell location. This is used in the update process to find out
    // if one or more roads are at a distnace of 3 or less from a cell that has a res
    // type unit on it
    var getUnitTypeCount = function(game, cell, unitKey, dist){
        var x = cell.x,
        y = cell.y,
        collection = mapMod.getCollectionByPos(game.map, x - dist, y - dist, dist * 2, dist * 2);



        return collection.reduce(function(acc, cell){

            var cDat = cell.data; 
            if(cDat.unit){



                if(cDat.unit.unitKey === unitKey){
                   acc += 1;
                }
            }
            return acc;
        }, 0);
    };

    api.update = function(game, secs){
        // set population
        game.population = getUnitTypeCount(game, game.map.cells[0], 'res', game.map.w)

        // new year?
        game.secs += secs;
        var spy = game.secsPerYear;
        game.secs = game.secs > spy ? spy : game.secs;
        if(game.secs === spy){
            game.year += 1;
            game.secs = 0;
            game.money += getDeltaMoney(game);
        }
    };

    return api;


}())