var gameMod = (function () {
/********** **********
     TO MAP OBJECT
*********** *********/
    // get to index helper use to get the map index to go to for the game.toMap object
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
    // Is a given cell at a corner? Used to get adjust goto point for game.toMap object
    var isAtCorner = function(game, cell){
        var map = game.maps[game.mapIndex],
        w = map.w - 1,
        h = map.h - 1;
        return (cell.x === 0 && cell.y === 0) || 
            (cell.x === w && cell.y === h) || 
            (cell.x === 0 && cell.y === h) || 
            (cell.x === w && cell.y === 0);
    };
    // get a toMap object that can be set to the game.toMap propery
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
/********** **********
     MOVEMENT PATHS
*********** *********/
    // get a move path in the from of a path created using mapMod.getPath that is cut
    // based on the maxCellsPerTurn value of the unit in the given start cell if any
    var getMovePath = function(game, startCell, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        unit = startCell.unit || null;
        // get the raw path to that target cell
        var path = mapMod.getPath(map, startCell.x, startCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        if(unit){
            path = path.reverse().slice(0, unit.maxCellsPerTurn);
        }
        // return the path
        return path;
    };
    // get an arary of cell index values
    var getMoveCells = function(game, startCell, targetCell){
        var map = game.maps[game.mapIndex];
        return getMovePath(game, startCell, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
    };
    // get enemy move cells options
    var getEnemeyMoveCells = function(game, eCell){
        var pCell = api.getPlayerCell(game),
        map = game.maps[game.mapIndex];
        // get neighbor cells of the player unit
        var pCellNeighbors = mapMod.getNeighbors(map, pCell).filter(function(cell){
            return cell.walkable;
        });
        // get an array of path options 
        var mtcOptions = pCellNeighbors.map(function(cell){
            return getMoveCells(game, eCell, cell)
        }).filter(function(mtcOptions){
            return mtcOptions.length > 0;
        });
        // rteurn first path or empty array
        return mtcOptions[0] || [];
    };
/********** **********
     UNITS
*********** *********/
    // create a base unit
    var createBaseUnit = function () {
        return {
            // current unit stats
            maxHP: 100,           // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
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
        player.maxCellsPerTurn = 3;
        player.sheetIndex = 2; // player sheet
        return player;
    };    // create a player unit
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.type = 'enemy';
        enemy.active = true;
        enemy.maxCellsPerTurn = 2;
        enemy.sheetIndex = 3;
        return enemy;
    };
    // create a player unit
    var createWallUnit = function () {
        var wall = createBaseUnit();
        wall.type = 'wall';
        wall.active = true;
        wall.sheetIndex = 1;
        return wall;
    };
    // place a unit at the given location in the current map
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
    // place player helper that is called when setting up a new game, and when the player
    // moves to a new map
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
    };
    // move a unit by way of any cell index values in unit.moveCells
    var moveUnit = function(game, unit){
        if(unit.moveCells.length > 0){
            var ci = unit.moveCells.shift();
            var moveToCell = mapMod.get(game.maps[game.mapIndex], ci);
            // if no unit at the move to cell
            if(!moveToCell.unit){
                placeUnit(game, unit, moveToCell.x, moveToCell.y);
            }
            // !!! might not hurt to do this for all units
            // also this might not belong here but where this method
            // is called for the player unit maybe
            if(unit.type === 'player'){
                game.toMap = getToMap(game);
            }
        }
    };
/********** **********
     MAP HELPERS
*********** *********/
// get an array of cell objects by a given unit type string in the given map
var getCellsByUnitType = function(map, type){
    return map.cells.reduce(function(acc, cell){
        if(cell.unit){
            if(cell.unit.type === type){
                acc.push(cell);
            }
        }
        return acc;
    },[]);
};
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
     gameMod.create PUBLIC METHOD
*********** *********/
    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var mapStrings = opt.maps || ['2'];
        var game = {
            // mode: 'map', // not using game.mode at this time
            turn: 0,
            turnState: 'wait',
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
/********** **********
     gameMod.update PUBLIC METHOD
*********** *********/
    // process turn method used in gameMod.update
    var processTurn = function(game, secs){
        var map = game.maps[game.mapIndex],
        eCells = getCellsByUnitType(map, 'enemy');
        // do nothing for 'wait' state
        if(game.turnState === 'wait'){
            return;
        }
        // starting a new turn
        if(game.turnState === 'start'){
            // let enemy units figure paths
            eCells.forEach(function(eCell){
                eCell.unit.moveCells = getEnemeyMoveCells(game, eCell);
                console.log(eCell.unit.moveCells);
            });
            game.turnState = 'move';
        }
        // move state
        if(game.turnState === 'move'){
            // move player unit
            moveUnit(game, game.player);
            eCells.forEach(function(eCell){
                moveUnit(game, eCell.unit);
            });
            var eCells = getCellsByUnitType(map, 'enemy');
            // if moveCells array length of all units === 0 the move state is over
            if(game.player.moveCells.length === 0 && eCells.every(function(eCell){
                return eCell.unit.moveCells.length === 0;
            })){
                game.turnState = 'end';
            }
        }
        // for end state step game.turn and set game.turnState back to wait
        if(game.turnState === 'end'){
            game.turn += 1;
            game.turnState = 'wait';
        }
    };
    // update a game object
    api.update = function (game, secs) {
        // just call process turn for now
        processTurn(game, secs);
    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };
    // preform what needs to happen for a player pointer event for the given pixel positon
    api.playerPointer = function(game, x, y){
        var clickedCell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        // if we have a cell
        if (clickedCell) {
            // if player cell is clicked and there is a toIndex value
            if(clickedCell === pCell && game.toMap.index != null){
                game.mapIndex = game.toMap.index;
                game.toMap = getToMap(game);
                pCell.unit = null;
                pCell.walkable = true;
                game.player.currentCellIndex = null;
                placePlayer(game);
                return;
            }

            // if cell has a unit on it
            if(clickedCell.unit){
                var unit = clickedCell.unit; 
                if(unit.type === 'enemy'){
                    console.log('enemy cell clicked');
                    game.turnState = 'start';
                    return;
                }
            }
   
            // default action is to try to move to the cell
            game.player.moveCells = getMoveCells(game, pCell, clickedCell);
            game.turnState = 'start';

            // move for first time so that the we are getting up to date cells
            // for figuring enemey paths
            //moveUnit(game, game.player);
            // set moveCells for enemies
/*
            var eCells = getCellsByUnitType(map, 'enemy');
            eCells.forEach(function(eCell){
                eCell.unit.moveCells = getEnemeyMoveCells(game, eCell);
                console.log(eCell.unit.moveCells);
            });
*/
        }
    };
    // return the public API
    return api;
}
    ());
