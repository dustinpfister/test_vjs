var gameMod = (function(){

    var hardSet = {
        MAX_CELL_POPULATION : 100,
        MAX_CELL_LAND_VALUE : 500,   // 500 point scale for land value as of r2
        MAX_AVG_DIST: 10,
        LVPER_ROADCT: 0.10, 
        LVPER_COMCT: 0.10,
        LVPER_COMDIST: 0.80
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
            if(unitKey === 'road'){
                cell.walkable = true;
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

    // GET AN AREA IN THE MAP
    var getArea = api.getArea = function(game, x, y, w, h){
        return game.map.cells.filter(function(cell){
            return utils.boundingBox2(x, y, w, h, cell.x, cell.y, 1, 1);
        });
    };

    // GET A UNIT TYPE IN AN AREA OF THE MAP
    var getTypeInArea = api.getTypeInArea = function(game, unitKey, x, y, w, h){
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        w = w === undefined ? game.map.w : w;
        h = h === undefined ? game.map.h : h;
        return getArea(game, x, y, w, h).filter(function(cell){
            if(cell.data.unit){
                return cell.data.unit.unitKey === unitKey;
            }
            return false;
        });
    };

    var getTypeFromCellDist = api.getTypeFromCellDist = function(game, cell, unitKey, dist){
        dist = dist === undefined ? 3: dist;
        var s = dist * 2 + 1;
        return api.getTypeInArea(game, 'road', cell.x - dist, cell.y - dist, s, s);
    };

    // with the given collection return the cell in the colletion that is near the given cell
    // might return null of no cell is near at all in the collection
    var getNear = function(cellCollection, cell){
        var dist = Infinity,
        nearCell = null;
        cellCollection.forEach(function(target){
            var d = utils.distance(cell.x, cell.y, target.x, target.y);
            if(d < dist){
                dist = d;
                nearCell = target;
            }
        });
        return nearCell;
    };

    var getZonePaths = function(game, zoneUnitKey, a, b){
        var homeCell;
        if(typeof a === 'object'){
            homeCell = a;
        }else{        
            homeCell = mapMod.get(game.map, a, b);
        }
        var roads = getTypeInArea(game, 'road');
        var zones = getTypeInArea(game, zoneUnitKey);
        var sCell = getNear(roads, homeCell);
        var pathsObj = {
            homeCell: homeCell,
            sCell: sCell,
            zones: []
        };
        zones.forEach(function(zoneCell){
            var eCell = getNear(roads, zoneCell),
            path = mapMod.getPath(game.map, sCell.x, sCell.y, eCell.x, eCell.y);
            path.push([sCell.x, sCell.y]);
            pathsObj.zones.push({
                zoneCell: zoneCell,
                eCell: eCell,
                path: path
            });
        });
        return pathsObj;
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

    // LAND VALUE
    // main update method as well as all relavent helper methods for figuring land value for each cell

    // just get a land value delta based just on the count of roads around a cell
    var getRoadCountValue = function(cell, roads){
        var per = roads.length / 10;
        per = per > 1 ? 1 : per;
        // 25% based on road count (r2)
        return hardSet.MAX_CELL_LAND_VALUE * hardSet.LVPER_ROADCT * per;
    };

    // get a value based on count of zones and avg path length to zones
    var getPathsToZoneValue = function(game, cell, unitKey){
        // get raw paths obj
        var pathsObj = getZonePaths(game, unitKey, cell);
        // figure avg dist
        var avgDist = pathsObj.zones.reduce(function(acc, zoneObj){
            return acc + zoneObj.path.length;
        }, 0) / pathsObj.zones.length;
        // avgDist should never be lower then 1, and if over 10
        // then that is all ready the worst
        var maxAvgDist = hardSet.MAX_AVG_DIST;
        avgDist = avgDist < 1 ? 1 : avgDist;
        avgDist = avgDist > maxAvgDist ? maxAvgDist : avgDist;
        var dPer = 1 - (avgDist - 1) / ( maxAvgDist - 1);
        // 50% based on distance (r2)
        var val = hardSet.MAX_CELL_LAND_VALUE * hardSet.LVPER_COMDIST * dPer;
        // 25% based on count (r2)
        var count = pathsObj.zones.length;
        var cPer = count / 5;
        cPer = cPer > 1 ? 1 : cPer;
        val += hardSet.MAX_CELL_LAND_VALUE * hardSet.LVPER_COMCT * cPer;
        // return val
        return val;
    };

    // UPDATE LAND VALUE
    // run over all cells, and update just land value for each cell
    var updateLandValue = function(game){
       game.population = 0;
        mapMod.forEachCell(game.map, function(cell, x, y, i, map){
            var cDat = cell.data;
            // land value should default to 0
            cDat.landValue = 0;

            if(cDat.unit){
                if(cDat.unit.unitKey === 'res'){
                    // a res zone must have at least one or more roads within 3 cells
                    // or else it wil not devlope at all
                    var roads = getTypeFromCellDist(game, cell, 'road', 3);
                    if(roads.length >= 1){
                        // simple road count value for res, and also paths to 'com' cells
                        cDat.landValue += getRoadCountValue(cell, roads);
                        cDat.landValue += getPathsToZoneValue(game, cell, 'com')
                    }
                }
            }
            cDat.landValue = Math.round(cDat.landValue);
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