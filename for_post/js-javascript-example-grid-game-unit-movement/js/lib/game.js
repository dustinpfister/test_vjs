var gameMod = (function () {
/********** **********
     UNITS
*********** *********/
    // create a base unit
    var createBaseUnit = function () {
        return {
            // current unit stats
            maxHP: 100,           // max number of hit points for the unit
            maxCellsPerTurn: 3,   // the max number of cells a unit can move
            // current values
            HP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            moveCells: [], // array of cells to move
            currentCellIndex: null,
            active: false
        }
    };
    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.type = 'player';
        player.active = true;
        player.sheetIndex = 2; // player sheet
        return player;
    };    // create a player unit
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.type = 'enemy';
        enemy.active = true;
        enemy.sheetIndex = 3;
        return enemy;
    };
    // create a player unit
    var createWallUnit = function () {
        var wall = createBaseUnit();
        wall.type = 'enemy';
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
        // if we get this far just find a spot
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
                // player
                if(cellIndex === 3){
                    var enemy = createEnemyUnit();
                    placeUnit(game, enemy, x, y);
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
    // is at corner
    var isAtCorner = function(game, cell){
        var map = game.maps[game.mapIndex],
        w = map.w - 1,
        h = map.h - 1;
        return (cell.x === 0 && cell.y === 0) || 
            (cell.x === w && cell.y === h) || 
            (cell.x === 0 && cell.y === h) || 
            (cell.x === w && cell.y === 0);
    };
    // get to map object
    var getToMap = function(game){
        var toMap = {};
        var map = game.maps[game.mapIndex];
        var pCell = api.getPlayerCell(game);
        var mi = toMap.index = getToIndex(game);
        // at corner?
        if(isAtCorner(game, pCell)){
           if(pCell.y === map.h - 1){
               toMap.x = pCell.x;
               toMap.y = 0;
           }else{
               toMap.x = pCell.x;
               toMap.y = map.h - 1;
           }
        }else{
            // not at corner
            toMap.x = pCell.x === 0 ? map.w - 1 : pCell.x;
            toMap.y = pCell.y === 0 ? map.h - 1 : pCell.y;
            toMap.x = pCell.x === map.w - 1 ? 0 : toMap.x;
            toMap.y = pCell.y === map.h - 1 ? 0 : toMap.y;
        }
        return toMap;
    };

    // update a game object
    api.update = function (game, secs) {
        var p = game.player,
        pCell = api.getPlayerCell(game);
        if(p.moveCells.length > 0){
            var ci = p.moveCells.shift();
            var moveToCell = mapMod.get(game.maps[game.mapIndex], ci);
            placeUnit(game, game.player,moveToCell.x, moveToCell.y);
            game.toMap = getToMap(game);
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
    var getMovePath = function(game, unit, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        // get the raw path to that target cell
        var path = mapMod.getPath(map, pCell.x, pCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        path = path.reverse().slice(0, unit.maxCellsPerTurn);
        // return the path
        return path;
    };
    // get an arary of cell index values
    var getMoveCells = function(game, unit, targetCell){
        var map = game.maps[game.mapIndex];
        return getMovePath(game, unit, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
    };

    // preform what needs to happen for a player pointer event for the given pixel positon
    api.playerPointer = function(game, x, y){
        var cell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        if (cell) {
            // if player cell is clicked and there is a toIndex value
            if(cell === pCell && game.toMap.index != null){
                game.mapIndex = game.toMap.index;
                game.toMap = getToMap(game);
                pCell.unit = null;
                pCell.walkable = true;
                game.player.currentCellIndex = null;
                placePlayer(game);
            }else{
                // set moveCells
                game.player.moveCells = getMoveCells(game, game.player, cell);
            }
        }
    };
    // return the public API
    return api;
}
    ());
