var gameMod = (function(){

    var MAX_CELL_POPULATION = 100;

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
            taxRate: {
                propertyTax: 0.07
            },
            map: mapMod.create({
                w: 10,
                h: 8,
                marginX: 128,
                marginY: 32,
                cellSize: 40
            })
        };
        game.map.cells.forEach(function(cell){
            var cDat = cell.data;
            cDat.fillStyle = 'white';
            cDat.landValue = 0;
            cDat.population = 0;
            cDat.popDelta = 0;
        });
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

    // figure out what the current deltaMoney amount is for a year
    var getDeltaMoney = function(game){
        // !!! Property tax ( https://en.wikipedia.org/wiki/Property_tax )
        // !!! as of r0 I just worked out a system system for 'property tax' that will 
        // need to be improved at a latter point as the expression at that point
        // is just Math.floor(game.population * game.raxRate.propertyTax)
        var propertyTax = Math.floor(game.population * game.taxRate.propertyTax);

/*
        var deltaMoney = game.map.cells.reduce(function(acc, cell){
            if(cell.data.unit){
                if(cell.data.unit.unitKey === 'com'){
                    acc += Math.floor(sm.game.population * 10 * 0.07);
                }
            }
            return acc;
        }, 0);
*/ 
        var deltaMoney = propertyTax;

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

    // run over all cells and just update population
    var updatePop = function(game){
        // total game population defaults to 0
        game.population = 0;
        // for each cell...
        mapMod.forEachCell(game.map, function(cell, x, y, i, map){
            var cDat = cell.data;
            if(cDat.unit){
                if(cDat.unit.unitKey === 'res'){
                    
                    //game.population += 10 * cDat.landValue;
                    cDat.popDelta = cDat.landValue;
                    cDat.population += cDat.popDelta;
                    if(cDat.population > MAX_CELL_POPULATION){
                        cDat.population = MAX_CELL_POPULATION;
                        cDat.popDelta = 0;
                    }
                    if(cDat.population < 0){
                        cDat.population = 0;
                    }
                }else{
                    // any unit other then res will not have any population or popDelta
                    cDat.popDelta = 0;
                    cDat.population = 0;
                }
            }else{
                // any blank cell that does not have a unit, will not have any population or popDelta
                cDat.popDelta = 0;
                cDat.population = 0;
            }
            // tabulate cDat.population for this cell
            game.population += cDat.population;
        });
    };

    // run over all cells, and update just land value
    var updateLandValue = function(game){
       game.population = 0;
        mapMod.forEachCell(game.map, function(cell, x, y, i, map){
            var cDat = cell.data;
            // land value should default to 0
            cDat.landValue = 0;
            if(cDat.unit){
                if(cDat.unit.unitKey === 'res'){
                    // people like roads, because people likt to go places
                    var roadCount = getUnitTypeCount(game, cell, 'road', 3);
                    cDat.landValue += roadCount;
                }
            }
        });
    };


    api.update = function(game, secs){

        updateLandValue(game);
        updatePop(game);

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