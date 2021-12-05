var gameMod = (function () {
/********** **********
     UNITS
*********** *********/
    // create a base unit
    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            maxCellsPerTurn: 2,
            currentCellIndex: null,
            active: false
        }
    };
    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.active = true;
        player.sheetIndex = 2; // player sheet
        return player;
    };
    // create a player unit
    var createWallUnit = function () {
        var wall = createBaseUnit();
        wall.active = true;
        wall.sheetIndex = 1;
        return wall;
    };
    // place a unit at the given location
    var placeUnit = function (game, unit, x, y) {
        var map = game.maps[game.mapIndex];
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // any old cellIndex that may need to have walkable
            // set back to true?
            if (unit.currentCellIndex != null) {
                var oldCell = map.cells[unit.currentCellIndex];
                oldCell.walkable = true;
                // set unit ref back to null
                map.cells[unit.currentCellIndex].unit = null;
            }
            // set new cell to not walkable as a unit is now located here
            newCell.walkable = false;
            // set current cell index for the unit
            unit.currentCellIndex = newCell.i;
            // place a ref to the unit in the map cell
            map.cells[unit.currentCellIndex].unit = unit; // map ref to unit
        }
    };
    // place player helper
    var placePlayer = function(game){
        var map = game.maps[game.mapIndex],
        toMap = game.toMap,
        toCell = null,
        i = map.cells.length;
        // get a toCell ref if we have a pos in game.toMap
        if(toMap.x != null && toMap.y != null){
            toCell = mapMod.get(map, toMap.x, toMap.y);
        }
        // if we have a toCell
        if(toCell){
            if(!toCell.unit){
                placeUnit(game, game.player, toCell.x, toCell.y);
                game.toMap = getToMap(game);
                return;
            }
        }

        while(i--){
            var cell = map.cells[i];
            if(cell.unit === null){
                placeUnit(game, game.player, cell.x, cell.y);
                game.toMap = getToMap(game);
                return;
            }
        }
    }
/********** **********
     SETUP GAME
*********** *********/
    // setUp game helper with game object, and given maps
    var setupGame = function (game, mapStrings) {
        var playerPlaced = false,
        startMapIndex = 0;
        game.mapIndex = 0;
        game.maps = game.maps.map(function(map, mi){
            var mapStr = mapStrings[mi] || '';
            game.mapIndex = mi;
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                // wall block
                if(cellIndex === 1){
                    var wall = createWallUnit();
                    placeUnit(game, wall, x, y);
                }
                // player
                if(cellIndex === 2){
                    playerPlaced = true;
                    startMapIndex = mi;
                    placeUnit(game, game.player, x, y);
                }
                return cell;
            });
            return map;
        });
        // if player is not palced then place the player unit
        // at a null cell
        if(!playerPlaced){
            placePlayer(game);
        }
        game.mapIndex = startMapIndex;
        game.toMap = getToMap(game);
    };
/********** **********
     PUBLIC API
*********** *********/
    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var mapStrings = opt.maps || ['2'];
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            mapWorldWidth: 3, // used to find toIndex
            toMap: {
                index: null,
                x: null,
                y: null
            },
            targetCell: false, // a reference to the current target cell to move to, or false
            player: createPlayerUnit()
        };
        mapStrings.forEach(function(){
            game.maps.push(mapMod.create({
                marginX: opt.marginX === undefined ? 32 : opt.marginX,
                marginY: opt.marginY === undefined ? 32 : opt.marginY,
                w:  opt.w === undefined ? 4 : opt.w,
                h:  opt.h === undefined ? 4 : opt.h
            }));
        });
        setupGame(game, mapStrings);
        return game;
    };
    // get to index helper
    var getToIndex = function(game){
        var toIndex = null,
        p = game.player,
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game),
        mwx = game.mapIndex % game.mapWorldWidth,                 // map world x and y
        mwy = Math.floor(game.mapIndex / game.mapWorldWidth );   
        // if player cell x equals 0 ( left side )
        if(pCell.x === 0){
            var x = mwx - 1;
            x = x < 0 ? game.mapWorldWidth - 1 : x;
            toIndex = mwy * game.mapWorldWidth + x;
        }
        // if player cell x equals map.w - 1 ( right side )
        if(pCell.x === map.w - 1){
            var x = mwx + 1;
            x = x >= game.mapWorldWidth ? 0 : x;
            toIndex = mwy * game.mapWorldWidth + x;
        }
        // if player cell y equals 0 ( top side )
        if(pCell.y === 0){
            var y = mwy - 1;
            y = y < 0 ? game.maps.length / game.mapWorldWidth - 1 : y;
            toIndex = y * game.mapWorldWidth + mwx;
        }
        // if player cell y map.h - 1 ( bottom side )
        if(pCell.y === map.h - 1){
            var y = mwy + 1;
            y = y >= game.maps.length / game.mapWorldWidth ? 0 : y;
            toIndex = y * game.mapWorldWidth + mwx;
        }
        return toIndex;
    };

    // get to map object
    var getToMap = function(game){
        var toMap = {};
        var map = game.maps[game.mapIndex];
        var pCell = api.getPlayerCell(game);
        var mi = toMap.index = getToIndex(game);
        // set toMap.x, and toMap.y
        toMap.x = pCell.x === 0 ? map.w - 1 : pCell.x;
        toMap.y = pCell.y === 0 ? map.h - 1 : pCell.y;
        toMap.x = pCell.x === map.w - 1 ? 0 : toMap.x;
        toMap.y = pCell.y === map.h - 1 ? 0 : toMap.y;
        return toMap;
    };

    // update a game object
    api.update = function (game, secs) {
        var cell,
        radian,
        target = game.targetCell,
        pCell = api.getPlayerCell(game);
        // if target cell is not player cell
        if (target != pCell) {
            radian = utils.angleToPoint(pCell.x, pCell.y, target.x, target.y);
            var cx = Math.round(pCell.x + Math.cos(radian)),
            cy = Math.round(pCell.y + Math.sin(radian));
            // change player unit postion
            placeUnit(game, game.player, cx, cy);
            // update toMap and target cell
            game.toMap = getToMap(game);
            game.targetCell = false;
        }

    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };

    // get an array of cells to move pased on a units
    // maxCellsPerTurn value and the given target cell location
    var getMoveCells = function(game, unit, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        // get the raw path to that target cell
        var path = mapMod.getPath(map, pCell.x, pCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        path = path.slice(0, unit.maxCellsPerTurn);
        // return the path
        return path;
    };

    // preform what needs to happen for a player pointer event for the given pixel positon
    api.playerPointer = function(game, x, y){
        var cell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        if (cell) {
            // if player cell is clicked and there is a toIndex value
            if(cell === pCell && game.toMap.index != null){
                console.log('map index change');
                game.mapIndex = game.toMap.index;
                game.toMap = getToMap(game);
                pCell.unit = null;
                pCell.walkable = true;
                game.player.currentCellIndex = null;
                placePlayer(game);
            }else{
                // player unit was not clicked see about moving
                var path = getMoveCells(game, game.player, cell);
                var pos = path.shift();
                if(pos){
                    var tCell = mapMod.get(map, pos[0], pos[1]);
                    game.targetCell = tCell;
                }
            }
        }
    };
    // return the public API
    return api;
}
    ());
