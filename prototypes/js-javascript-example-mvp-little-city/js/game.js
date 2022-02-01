var gameMod = (function(){

    var hardSet = {
        MAX_CELL_POPULATION : 100,
        MAX_CELL_LAND_VALUE : 10
    };

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
        opt = opt || {};
        // if loading a city, cellData will be needed
        opt.cellData = opt.cellData || [];
        var game = {
            hardSet: hardSet,
            money: 100,
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
                marginY: 96,
                cellSize: 40
            })
        };
        game.map.cells.forEach(function(cell, i){
            var cDat = cell.data;
            cDat.fillStyle = 'white';
            cDat.landValue = 0;
            cDat.population = 0;
            cDat.popDelta = 0;
            // walkable defaults to false;
            cell.walkable = false;
        });
        // set up cells for any given cellData array
        opt.cellData.forEach(function(cellData){
            var cell = mapMod.get(game.map, cellData.x, cellData.y),
            unitKey = cellData.unitKey;
            var unitType = UNIT_TYPES[unitKey];
            cell.data.unit = {
                unitKey: unitKey,
                fillStyle: unitType.fillStyle
            }
			if(unitKey === 'road'){
				console.log('road, setting walkbale to true');
				cell.walkable = true;
			}
        });
        return game;
    };

    // build a unit an the given cell, or cell location
    // gameMod.buildAt(game, 'res', cell)
    // gameMod.buildAt(game, 'res', x, y)
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
        // !!! property tax is all that makes money
        var deltaMoney = propertyTax;
        return deltaMoney;
    };

    // GET UNIT TYPE COUNT
    // This is a helper that will get a count of unit types at a max distance
    // from the given cell location. This is used in the update process to find out
    // if one or more roads are at a distnace of 3 or less from a cell that has a res
    // type unit on it
    /*
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
    */

    // GET AN AREA IN THE MAP
    var getArea = api.getArea = function(game, x, y, w, h){
        return game.map.cells.filter(function(cell){
            return utils.boundingBox2(x, y, w, h, cell.x, cell.y, 1, 1);
        });
    };

    // GET A UNIT TYPE IN AN AREA OF THE MAP
    var getTypeInArea = api.getTypeInArea = function(game, x, y, w, h, unitKey){
        return getArea(game, x, y, w, h).filter(function(cell){
            if(cell.data.unit){
                return cell.data.unit.unitKey === unitKey;
            }
            return false;
        });
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
                    cDat.popDelta = cDat.landValue;
                    cDat.population += cDat.popDelta;

                    var per = cDat.landValue / hardSet.MAX_CELL_LAND_VALUE;
                    var currentCellPopCap = Math.round( per * hardSet.MAX_CELL_POPULATION );
                     
                    if(cDat.population > currentCellPopCap){
                        cDat.population = currentCellPopCap;
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
                    var dist = 3,
                    s = dist * 2 + 1,
                    roads = api.getTypeInArea(game, cell.x - dist, cell.y - dist, s, s, 'road'),
                    roadCount = roads.length;
                    cDat.landValue += roadCount;
                }
            }
            // apply max land value limit
            cDat.landValue = cDat.landValue > hardSet.MAX_CELL_LAND_VALUE ? hardSet.MAX_CELL_LAND_VALUE : cDat.landValue; 
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