var gameMod = (function () {
    var api = {};
/********** **********
     TO MAP OBJECT
*********** *********/
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
    // return a toIndexOptions array for the given map position in the current game map
    var getToIndexOptions = function(game, x, y){
        var toIndex = null,
        dir,
        p = game.player,
        map = game.maps[game.mapIndex],
        cell = mapMod.get(map, x, y),
        mwx = game.mapIndex % game.mapWorldWidth,                 // map world x and y
        mwy = Math.floor(game.mapIndex / game.mapWorldWidth ),
        options = [];
        if(isAtCorner(game, cell)){
            if(x === 0 && y === 0){
                return getToIndexOptions(game, 0, 1).concat(getToIndexOptions(game, 1, 0));
            }
            if(x === map.w - 1 && y === 0){
                return getToIndexOptions(game, map.w - 1, 1).concat(getToIndexOptions(game, map.w - 2, 0));
            }
            if(x === map.w - 1 && y === map.h - 1){
                return getToIndexOptions(game, map.w - 1, map.h - 2).concat(getToIndexOptions(game, map.w - 2, map.h - 1));
            }
            if(x === 0 && y === map.h - 1){
                return getToIndexOptions(game, 0, map.h - 2).concat(getToIndexOptions(game, map.w - 2, map.h - 1));
            }
        }else{
            // if player cell x equals 0 ( left side )
            if(x === 0){
                var x = mwx - 1;
                x = x < 0 ? game.mapWorldWidth - 1 : x;
                toIndex = mwy * game.mapWorldWidth + x;
                dir = 'west';
            }
            // if player cell x equals map.w - 1 ( right side )
            if(x === map.w - 1){
                var x = mwx + 1;
                x = x >= game.mapWorldWidth ? 0 : x;
                toIndex = mwy * game.mapWorldWidth + x;
                dir = 'east';
            }
            // if player cell y equals 0 ( top side )
            if(y === 0){
                var y = mwy - 1;
                y = y < 0 ? game.maps.length / game.mapWorldWidth - 1 : y;
                toIndex = y * game.mapWorldWidth + mwx;
                dir = 'north';
            }
            // if player cell y map.h - 1 ( bottom side )
            if(y === map.h - 1){
                var y = mwy + 1;
                y = y >= game.maps.length / game.mapWorldWidth ? 0 : y;
                toIndex = y * game.mapWorldWidth + mwx;
                dir = 'south';
            }
            // return array with index and dir text
            return [{
               mi: toIndex,
               dir: dir || '',
               x: null,
               y: null
            }];
        }
    };

    // get to index helper used to get the map index to go to for the game.toMap object
    var getToIndex = function(game){
        var toIndex = null,
        dir,
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
            dir = 'west';
        }
        // if player cell x equals map.w - 1 ( right side )
        if(pCell.x === map.w - 1){
            var x = mwx + 1;
            x = x >= game.mapWorldWidth ? 0 : x;
            toIndex = mwy * game.mapWorldWidth + x;
            dir = 'east';
        }
        // if player cell y equals 0 ( top side )
        if(pCell.y === 0){
            var y = mwy - 1;
            y = y < 0 ? game.maps.length / game.mapWorldWidth - 1 : y;
            toIndex = y * game.mapWorldWidth + mwx;
            dir = 'north';
        }
        // if player cell y map.h - 1 ( bottom side )
        if(pCell.y === map.h - 1){
            var y = mwy + 1;
            y = y >= game.maps.length / game.mapWorldWidth ? 0 : y;
            toIndex = y * game.mapWorldWidth + mwx;
            dir = 'south';
        }
        // return object with index and dir text
        return {
           mi: toIndex,
           dir: dir
        };
    };
    // get a toMap object that can be set to the game.toMap propery
    var getToMap = function(game){
        var toMap = {};
        var map = game.maps[game.mapIndex];
        var pCell = api.getPlayerCell(game);
        // get to index obj
        var toIndexObj = getToIndex(game);
        var mi = toMap.index = toIndexObj.mi;
        // to map options array
        //var options = toMap.options = [];

var options = toMap.options = getToIndexOptions(game, pCell.x, pCell.y);

        // at corner? if so we have two options
        if(isAtCorner(game, pCell)){
           if(pCell.y === map.h - 1){
               toMap.x = pCell.x;
               toMap.y = 0;
           }else{
               toMap.x = pCell.x;
               toMap.y = map.h - 1;
           }
           // toMapOptions array should have to objects
           //options.push({
           //     x: toMap.x,
           //     y: toMap.y,
           //     mi: mi,
           //     dir: ''
           // });
        }else{
            // not at corner
            toMap.x = pCell.x === 0 ? map.w - 1 : pCell.x;
            toMap.y = pCell.y === 0 ? map.h - 1 : pCell.y;
            toMap.x = pCell.x === map.w - 1 ? 0 : toMap.x;
            toMap.y = pCell.y === map.h - 1 ? 0 : toMap.y;
            // to map options array should have just the one object
            //options.push({
            //    x: toMap.x,
            //    y: toMap.y,
            //    mi: mi,
            //    dir: toIndexObj.dir
            //});
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
    var setupGame = api.setupGame = function (game, newGame) {
        newGame = newGame === undefined ? true : newGame;
        var playerPlaced = false,
        startMapIndex = 0;
        game.mapIndex = 0;
        // set player HP to max
        game.player.HP = game.player.maxHP;
        if(newGame){
            game.remainingEnemies = 0;
        }
        // make sure mode starts out on map mode
        game.mode = 'map';
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
    count: 8,
    disableLifespan: true,
    data: {
        outerRadius: 75,
        innerRadius: 25,
        outerTotal: 1,
        frame: 0,
        maxFrame: 15,
        activeButton: null, // a ref to the active button to use on 'exit' mode end
        mode: 'enter'       // current mode of the menuPool 'enter', 'exit'
    }
};

menuPool.spawn = function(button, options, sm, spawnOpt){
    var bd = button.data,
    pd = options.data;
    // button data
    bd.desc = spawnOpt.desc || false;
    bd.cx = button.x = sm.canvas.width / 2 - button.w / 2;
    bd.cy = button.y = sm.canvas.height / 2 - button.h / 2;
    bd.radius = 0;
    bd.a = 0;
    bd.ta = spawnOpt.ta === undefined ? Math.PI * 2: spawnOpt.ta;
    bd.outer = spawnOpt.outer === undefined ? true : spawnOpt.outer;
    bd.onClick = spawnOpt.onClick || function(){};
    // pool data
    pd.frame = 0;
    pd.outerTotal = spawnOpt.outerTotal === undefined ? 1 : spawnOpt.outerTotal
};

menuPool.update = function(button, options, sm, secs){
    var pd = options.data,
    bd = button.data;
    // !!! updating pool data here is not so great
    if(button.i === options.objects.length - 1){
        // if we are in enter mode
        if(pd.mode === 'enter'){
            pd.frame += 30 * secs;
            pd.frame = pd.frame >= pd.maxFrame ? pd.maxFrame : pd.frame;
        }
        // if we are in exit mode
        if(pd.mode === 'exit'){
            pd.frame -= 30 * secs;
            pd.frame = pd.frame < 0 ? 0 : pd.frame;
            if(pd.frame === 0 && pd.activeButton){

                pd.activeButton.data.onClick.call(sm, sm, pd.activeButton);
            }
        }
    }

    var per = pd.frame / pd.maxFrame;
    var radius = bd.outer ? pd.outerRadius : pd.innerRadius;
    bd.a = bd.ta * per;
    button.x = bd.cx + Math.cos(bd.a) * radius * per;
    button.y = bd.cy + Math.sin(bd.a) * radius * per;
};

/********** **********
     gameMod.create PUBLIC METHOD
*********** *********/
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
            options: new poolMod.create(menuPool), // pool of objects used for the circle menu
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
// testing out my new getToIndexOptions helper
console.log( getToIndexOptions(game, 0, 0) );
console.log( getToIndexOptions(game, 8, 0) );
console.log( getToIndexOptions(game, 0, 6) );
console.log( getToIndexOptions(game, 8, 6) );

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
    api.update = function (sm, secs) {
        var game = sm.game;
        // in map mode just call process turn
        if(game.mode === 'map'){
            processTurn(game, secs);
        }
        if(game.mode === 'menu'){
            poolMod.update(game.options, secs, sm);
        }
    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };
    // preform what needs to happen for a player pointer event for the given pixel positon
    api.pointerStart = function(sm, x, y){
        var game = sm.game;
        // pointerDownTime should start at now
        game.pointerDownTime = new Date();
    };


    var BUTTON = {};

    BUTTON.quit = {
        desc: 'quit',
        outer: true,
        onClick: function(sm, button){
           sm.setState('title');
        }
    };

    BUTTON.resume = {
        desc: 'resume',
        outer: true,
        onClick: function(sm, button){
           sm.game.mode = 'map';
        }
    };

    BUTTON.map_south = {
        desc: 'South',
        outer: false,
        ta: Math.PI * 0.5,
        onClick: function(sm, button){
            sm.game.mode = 'map';           
        }
    };

    BUTTON.map_north = {
        desc: 'North',
        outer: false,
        ta: Math.PI * 1.5,
        onClick: function(sm, button){
            sm.game.mode = 'map';          
        }
    };

    BUTTON.map_east = {
        desc: 'East',
        outer: false,
        ta: Math.PI * 2,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };

    BUTTON.map_west = {
        desc: 'West',
        outer: false,
        ta: Math.PI * 1,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };


    BUTTON.dum1 = {
        desc: 'dummy1',
        outer: true,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };

    BUTTON.dum2 = {
        desc: 'dummy2',
        outer: false,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };

    BUTTON.dum3 = {
        desc: 'dummy2',
        outer: false,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };

    var getButtonKeyValueCount = function(buttonKeys, prop, value){
        return buttonKeys.reduce(function(acc, buttonKey){
            var buttonDATA = BUTTON[buttonKey];
            if(buttonDATA[prop] === value){
                acc += 1;
            }
            return acc;
        }, 0);
    };

    // create a menu for the current game state
    var createMenu = function(game){
        // purge all buttons first
        game.options.objects.forEach(function(button){
            button.active = false;
        });
        // default buttonKeys array
        var buttonKeys = ['quit', 'resume', 'map_south', 'map_north', 'map_east', 'map_west'];

        var oi = 0, 
        ii = 0,
        oc = getButtonKeyValueCount(buttonKeys, 'outer', true), //3,
        ic = getButtonKeyValueCount(buttonKeys, 'outer', false); //2;
        // spawn buttons 
        buttonKeys.forEach(function(buttonKey){
            var buttonDATA = BUTTON[buttonKey],
            len = (buttonDATA.outer ? oc : ic),
            i = (buttonDATA.outer ? oi : ii),
            ta = Math.PI * 2 / len * (i + 1);
            // use buttonDATA.ta if there is one
            ta = buttonDATA.ta != undefined ? buttonDATA.ta : ta;
            // spawn buttons
            poolMod.spawn(game.options, sm, {
                desc: buttonDATA.desc,
                onClick: buttonDATA.onClick,
                outer: buttonDATA.outer,
                ta: ta
            });
            if(buttonDATA.outer){
               oi += 1;
            }else{
               ii += 1;
            }
        });
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
        if( secs >= 0.5 ){
            console.log('long press!');
            // if we are in map mode switch to menu mode
            if(game.mode === 'map'){
                game.mode = 'menu';
                game.options.data.mode = 'enter';
                createMenu(game);

            }
        }
        // short press
        if(secs < 0.5 ){
            if (game.mode === 'map' && clickedCell) {
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

            if(game.mode === 'menu'){
                var clicked = poolMod.getOverlaping({active: true, w:1, h:1, x: x, y: y}, game.options);
                if(clicked.length >= 1){
                    game.options.data.mode = 'exit';
                    game.options.data.activeButton = clicked[0];
                    //clicked[0].data.onClick(sm, clicked[0]);
                }else{
                   // no button was clicked
                   game.mode = 'map';
                }
            }
        }
    };

    // return the public API
    return api;
}
    ());
