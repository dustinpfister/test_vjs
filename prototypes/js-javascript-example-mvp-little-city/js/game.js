var gameMod = (function(){

    // public api
    var api = {};

    var hardSet = {
        MAX_CELL_POPULATION : 100,
        MAX_CELL_LAND_VALUE : 500,   // 500 point scale for land value as of r2
        MAX_AVG_DIST: 10,            // used in getPathsToZoneValue helper for figuring land value
        MAX_IMMIGR: 15,              // max immigration per update used in getPopDeltaObj helper
        MAX_EXODUS: 15,              // max exodus per update used in getPopDeltaObj helper
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

    // ////////// //////////
    // CREATE A NEW CITY
    // ////////// //////////

    // create a unit for the given cell that is of the given unitKey
    var createUnit = function(cell, unitKey){
        var unitType = UNIT_TYPES[unitKey];
        cell.data.unit = {
            unitKey: unitKey,
            fillStyle: unitType.fillStyle
        };
        // by default walkable bool for a cell should be false
        // and should be set to true just for roads
        cell.walkable = false;
        if(unitKey === 'road'){
            cell.walkable = true;
        }
    };

    api.create = function(opt){
        opt = opt || {};
        // if loading a city, cellData will be needed
        opt.cellData = opt.cellData || [];
        var game = {
            name: 'New City',
            hardSet: hardSet,
            money: 1000, //100,
            population: 0,
            year: 1900,
            secsPerYear: 10,
            secs: 0,
            totals: { com:0, res: 0, road:0 },
            problems: { },
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
            cDat.popDelta = getPopDeltaObj(game, cell);
            // walkable defaults to false;
            cell.walkable = false;
        });
        // set up cells for any given cellData array
        opt.cellData.forEach(function(cellData){
            var cell = mapMod.get(game.map, cellData.x, cellData.y),
            unitKey = cellData.unitKey;
            createUnit(cell, unitKey);
        });
        return game;
    };

    // ////////// //////////
    // MISC HELPERS AND METHODS
    // ////////// //////////

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
            createUnit(cell, unitKey);
        }
    };

    // figure out what the current deltaMoney amount is for a year
    var getDeltaMoney = api.getDeltaMoney = function(game){
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
        var pathsObj = {
            homeCell: homeCell,
            sCell: null,
            zones: []
        };
        var roads = getTypeFromCellDist(game, homeCell, 'road', 3);
        if(roads.length >= 1){
            var zones = getTypeInArea(game, zoneUnitKey);
            var sCell = pathsObj.sCell = getNear(roads, homeCell);
            var roads = getTypeInArea(game, 'road');
            zones.forEach(function(zoneCell){
                var eCell = getNear(roads, zoneCell),
                path = mapMod.getPath(game.map, sCell.x, sCell.y, eCell.x, eCell.y);
                path.push([sCell.x, sCell.y]);
                // distance from end of path to zoneCell
                var d = utils.distance(zoneCell.x, zoneCell.y, path[0][0], path[0][1] );
                if(d <= 3){
                    pathsObj.zones.push({
                        zoneCell: zoneCell,
                        eCell: eCell,
                        path: path
                    });
                }
            });
        }
        return pathsObj;
    };

    // ////////// //////////
    // PROBLEMS
    // ////////// //////////

    // COLLECTION OF PROBELMS THAT INPACT THE HEALTH OF THE CITY
    var PROBLEMS = {};

    // problems that impact popDelta
    PROBLEMS.popDelta = {};

    // if taxes are two high that can being down immgr, and increase exodus
    // however lower taxes can increase immgr and reduce exodus
    PROBLEMS.popDelta.highTaxes = function(game, cell){
        var deltas = {
            index: 0,
            immigr: 0,
            exodus: 0
        };
        // tax rate and tax per
        var tr = game.taxRate.propertyTax,
        taxPer = tr / 0.20;
        // index value for the high tax problem
        deltas.index = taxPer;
        //immigrRate best: [5, 15], worst: [4, 13]
        //exodusRate best = [0, 10], worst: [5, 15]
        var immigrRate = [1, 5];
        var exodusRate = [0, 0];
        immigrRate[0] = utils.valueByRange(  1 - taxPer, [ 4, 5 ] ); 
        immigrRate[1] = utils.valueByRange(  1 - taxPer, [ 13, 15 ] );
        exodusRate[0] = utils.valueByRange(  taxPer, [ 0, 5 ] ); 
        exodusRate[1] = utils.valueByRange(  taxPer, [ 10, 15 ] );
        deltas.immigr = utils.valueByRange( Math.random(), immigrRate);
        deltas.exodus = utils.valueByRange( Math.random(), exodusRate );
        // return the deltas that are the result of this problem for this cell
        return deltas;
    };

    // people will move out if the comm to res ratio is to low
    PROBLEMS.popDelta.unemployment = function(game, cell){
        var deltas = {
            index: 0,
            immigr: 0,
            exodus: 0
        };
        var t = game.totals;
        var comRatio = t.com / t.res;
        if(String(comRatio) === 'NaN' || comRatio === Infinity){
            comRatio = 1;
        }
        if(comRatio < 0.25){
            deltas.index = ( 0.25 - comRatio ) / 0.25;
            deltas.exodus = Math.round( 1 + 2 * deltas.index );
        }
        return deltas;
    };

    // ////////// //////////
    // POPULATION
    // ////////// //////////

    // get a pop delta object for the given cell
    var getPopDeltaObj = function(game, cell){
        // starting pop delta
        var popDelta = {
            immigr: 0, 
            exodus: 0,
            valueOf : function(){
                return this.immigr - this.exodus;
            }
        };

        Object.keys(PROBLEMS.popDelta).forEach(function(problemKey){
            var problemFunc = PROBLEMS.popDelta[problemKey];
            var delta = problemFunc(game, cell);
            popDelta.immigr += delta.immigr;
            popDelta.exodus += delta.exodus;
            // !!! Tabulating problem index totals here
            var p = game.problems[problemKey];
            if(p){
                p.count += delta.index > 0 ? 1 : 0;
                p.index += delta.index;
            }
        });

        // apply caps for immigr and exodus 
        popDelta.immigr = popDelta.immigr > hardSet.MAX_IMMIGR ? hardSet.MAX_IMMIGR : popDelta.immigr;
        popDelta.exodus = popDelta.exodus > hardSet.MAX_EXODUS ? hardSet.MAX_EXODUS : popDelta.exodus;
        popDelta.immigr = popDelta.immigr < 0 ? 0 : popDelta.immigr;
        popDelta.exodus = popDelta.exodus < 0 ? 0 : popDelta.exodus;

        return popDelta;
    };

    // update pop value for a single cell to be used in main update loop ( see api.update )
    var updatePopForCell = function(game, cell){
        // for each cell...
            var cDat = cell.data;
            if(cDat.unit){
                if(cDat.unit.unitKey === 'res'){
                    cDat.population += cDat.popDelta.valueOf();
                    var per = cDat.landValue / hardSet.MAX_CELL_LAND_VALUE;
                    var currentCellPopCap = Math.round( per * hardSet.MAX_CELL_POPULATION );
                    if(cDat.population > currentCellPopCap){
                        cDat.population = currentCellPopCap;
                    }
                    if(cDat.population < 0){
                        cDat.population = 0;
                    }
                }else{
                    // any unit other then res will not have any population or popDelta
                    cDat.population = 0;
                }
            }else{
                // any blank cell that does not have a unit, will not have any population or popDelta
                cDat.population = 0;
            }
    };

    // ////////// //////////
    // LAND VALUE
    // ////////// //////////

    // main update method as well as all relevant helper methods for figuring land value for each cell

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
        // on zones? return 0
        if(pathsObj.zones.length === 0){
            return 0;
        }
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

    // update land value for a single cell to be used in main update loop ( see api.update )
    var updateLandValueForCell = function(game, cell){
        var cDat = cell.data;
        // land value should default to 0
        cDat.landValue = 0;
        if(cDat.unit){
            if(cDat.unit.unitKey === 'res'){
                // a res zone must have at least one or more roads within 3 cells
                // or else it will not develop at all
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
    };

    // ////////// //////////
    // TOTALS
    // ////////// //////////

    // reset totals
    var resetTotals = function(game){
        var t = game.totals;
        t.com = 0;
        t.res = 0;
        t.road = 0;
        t.land = 0;
        
        // index values for each problem
        Object.keys(PROBLEMS.popDelta).forEach(function(problemKey){
            game.problems[problemKey] = {
                count: 0,
                index: 0,
                key: problemKey
            }
        });

    };
    // step totals, to be called in main cell update loop ( see api.update )
    var stepTotalsForCell = function(game, cell){
        var t = game.totals;
        var unit = cell.data.unit; 
        if(unit){
            t[unit.unitKey] += 1;
        }else{
           t.land += 1;
        }
    };

    // The Main gameMod.update method
    api.update = function(game, secs){

        // reset, and re tabulate totals
        resetTotals(game);
        var i = 0, len = game.map.cells.length, cell;
        while(i < len){
            cell = game.map.cells[i];
            stepTotalsForCell(game, cell);
            i += 1;
        }

        // global population defaulting to zero
        game.population = 0;
        // single loop of cells here in the main app loop
        var i = 0, len = game.map.cells.length, cell;
        while(i < len){
            cell = game.map.cells[i];
            updateLandValueForCell(game, cell);
            cell.data.popDelta = getPopDeltaObj(game, cell);
            updatePopForCell(game, cell); 
            // tabulate for total pop
            game.population += cell.data.population;
            i += 1;
        };

        // create index values for game.problems
        Object.keys(PROBLEMS.popDelta).forEach(function(problemKey){
             var p = game.problems[problemKey];
             p.index = p.index / p.count;
             p.index = String(p.index) === 'NaN' ? 0 : p.index;
        });

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