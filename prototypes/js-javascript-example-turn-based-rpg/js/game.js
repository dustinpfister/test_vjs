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
    var setupGame = function (game, newGame) {
        newGame = newGame === undefined ? true : newGame;
        var playerPlaced = false,
        startMapIndex = 0;
        game.mapIndex = 0;
        // set player HP to max
        game.player.HP = game.player.maxHP;
        if(newGame){
            game.remainingEnemies = 0;
        }
        // set up maps
        game.maps = game.maps.map(function(map, mi){
            var mapStr = game.mapStrings[mi] || '';
            game.mapIndex = mi;
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                if(cellIndex === 0 && newGame){
                    var cell = mapMod.get(map, ci);
                    cell.unit = null;
                    cell.walkable = true;
                }
                // wall blocks set for new games and not
                if(cellIndex === 1){
                    var wall = unitMod.createUnit('wall');
                    placeUnit(game, wall, x, y);
                }
                // player always set
                if(cellIndex === 2){
                    playerPlaced = true;
                    startMapIndex = mi;
                    placeUnit(game, game.player, x, y);
                }
                // enemy
                if(cellIndex === 3 && newGame){
                    game.remainingEnemies += 1;
                    var enemy = unitMod.createUnit('enemy');
                    enemy.HP = enemy.maxHP;
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
     MENU POOL
*********** *********/
var menuPool = {
    count: 8
};

menuPool.spawn = function(button, options, game, spawnOpt){
    

};

menuPool.update = function(button, options, game, secs){
    

};

/********** **********
     gameMod.create PUBLIC METHOD
*********** *********/
    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        //var mapStrings = opt.maps || ['2'];
        var game = {
            mode: 'map', // 'map' for the game in action, and 'menu' for the circle options menu
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
            mapStrings: opt.maps || ['2'],
            player: unitMod.createUnit('player'),
            remainingEnemies: 0,
            options: new poolMod.create(menuPool),
            pointerDownTime: new Date()            // used to find out if we are dealing with a long press or not
        };
        game.mapStrings.forEach(function(){
            game.maps.push(mapMod.create({
                marginX: opt.marginX === undefined ? 32 : opt.marginX,
                marginY: opt.marginY === undefined ? 32 : opt.marginY,
                w:  opt.w === undefined ? 4 : opt.w,
                h:  opt.h === undefined ? 4 : opt.h
            }));
        });
        setupGame(game, true);
        return game;
    };
/********** **********
     gameMod.update PUBLIC METHOD
*********** *********/
    var processMeele = function(game, unit){
        var targetCellIndex = unit.meleeTarget,
        map = game.maps[game.mapIndex];
        if(targetCellIndex != null){
            var targetCell = mapMod.get(map, targetCellIndex),
            tUnit = targetCell.unit;
            if(tUnit){
                // unitMod meleeAttack method
                unitMod.meleeAttack(unit, tUnit);
                // enemy unit death check
                if(tUnit.HP <= 0 && tUnit.type === 'enemy'){
                    targetCell.walkable = true;
                    targetCell.unit = null;
                }
            }
            unit.meleeTarget = null;
        }
    };
    // get remaining Enemies helper used to update game.remainingEnemies in 'end' process turn state
    var getRemainingEnemies = function(game){
        return game.maps.reduce(function(acc, map){
            var eCells = getCellsByUnitType(map, 'enemy');
            return acc + eCells.length;
        }, 0);
    };
    // process turn method used in gameMod.update
    var processTurn = function(game, secs){
        var map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game),
        eCells = getCellsByUnitType(map, 'enemy');
        // do nothing for 'wait' state
        if(game.turnState === 'wait'){
            return;
        }
        // starting a new turn
        if(game.turnState === 'start'){
            // let enemy units figure paths
            eCells.forEach(function(eCell){
                var d = utils.distance(eCell.x + 16, eCell.y + 16, pCell.x + 16, pCell.y + 16);
                if( d <= 1.5){
                    // in melee range player
                    eCell.unit.meleeTarget = pCell.i;
                }else{
                    // not in melee range of player
                    eCell.unit.moveCells = getEnemeyMoveCells(game, eCell);
                }
                //console.log(eCell.unit.moveCells);
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
                game.turnState = 'melee';
            }
        }
        // melee attack
        if(game.turnState === 'melee'){
            // process any player melee attack
            processMeele(game, game.player);
            // process melee attacks for enemy units
            var eCells = getCellsByUnitType(map, 'enemy');
            eCells.forEach(function(eCell){
                processMeele(game, eCell.unit);
            });
            game.turnState = 'end';
        }
        // for end state step game.turn and set game.turnState back to wait
        if(game.turnState === 'end'){
            game.turn += 1;
            game.turnState = 'wait';
            // check for player death
            if(game.player.HP <= 0){
                // !!! for now just call setupGame
                pCell.unit = null;
                pCell.walkable = true;
                setupGame(game, false);
            }
            // check for all enemies dead
            game.remainingEnemies = getRemainingEnemies(game);
            if(game.remainingEnemies === 0){
                setupGame(game, true);
            }
        }
    };
    // update a game object
    api.update = function (game, secs) {
        // in map mode just call process turn
        if(game.mode === 'map'){
            processTurn(game, secs);
        }
        if(game.mode === 'menu'){
            poolMod.update(game.options, secs, game);
        }
    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };
    // preform what needs to happen for a player pointer event for the given pixel positon
/*
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
                    // set meleeTarget index
                    game.player.meleeTarget = clickedCell.i;
                    game.turnState = 'start';
                    return;
                }
            }
            // default action is to try to move to the cell
            game.player.moveCells = getMoveCells(game, pCell, clickedCell);
            game.turnState = 'start';

        }
    };
*/

    api.pointerStart = function(sm, x, y){
        var game = sm.game;
        // pointerDownTime should start at now
        game.pointerDownTime = new Date();
    };

    // call when a pointer has ended
    api.pointerEnd = function(sm, x, y){
        var game = sm.game,
        now = new Date(),
        clickedCell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        secs = (now - game.pointerDownTime) / 1000;
        // long press
        if(secs >= 1){
            console.log('long press!')
        }
        // short press
        if(secs < 1 ){
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
                        // set meleeTarget index
                        game.player.meleeTarget = clickedCell.i;
                        game.turnState = 'start';
                        return;
                    }
                }
                // default action is to try to move to the cell
                game.player.moveCells = getMoveCells(game, pCell, clickedCell);
                game.turnState = 'start';
            }
        }
    };

    // return the public API
    return api;
}
    ());
