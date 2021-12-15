var gameMod = (function () {
    // hard coded map events
    var MAP_EVENTS = {};
    // hard map reset
    MAP_EVENTS.hardMapReset = function(game, secs, type, opt){
        console.log('doing a hard world map reset');
        setupGame(game, true);
    };
    // soft map reset
    MAP_EVENTS.softMapReset = function(game, secs, type, opt){
        console.log('doing a soft world map reset');
        setupGame(game, false);
    };
    // do nothing
    MAP_EVENTS.nothing = function(game, secs, type, opt){
        console.log('doing nothing for ' + type + ' map event');
    };
    // go to a new world map ( toMap:dataKey,dmi,dx,dy )
    MAP_EVENTS.toMap = function(game, secs, type, opt){
        // custom portalData object
        var portalData = {
            mi:0,x:0,y:0,
            dataKey: opt[0],
            dmi: parseInt(opt[1]), dx: parseInt(opt[2]), dy: parseInt(opt[3])
        };
        changeWorldMap(game, portalData);
    };

    // public API
    var api = {};
    // THE VOID WORLD OBJECT
    api.VOID_WORLD = {
        dataKey: "wm_void",
        mapName: "Void World",
        mapWidth: 9,
        mapHeight: 7,
        mapWorldWidth: 3,
        mapWorldHeight: 3,
        mapStrings: [
            "111111111120000003100000000100000000100000000100000000100000000",
            "111111111000000000000000000000000000000000000000000000000000000",
            "111111111000000001000000001000000001000000001000000001000000001",
            "100000000100000000100000000100000000100000000100000000100000000",
            "000000000000000000000000000000000000000000000000000000000000000",
            "000000001000000001000000001000000001000000001000000001000000001",
            "100000000100000000100000000100000000100000000100000000111111111",
            "000000000000000000000000000000000000000000000000000000111111111",
            "000000001000000001000000001000000001000000001000000001111111111"
        ],
        mapPortals: [],
        mapWorldUnits: []
    };
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
    var getToIndexOptions = function(game, x, y, ox, oy){
        var toIndex = null,
        dir = '',
        p = game.player,
        map = game.maps[game.mapIndex],
        cell = mapMod.get(map, x, y),
        mww = game.worldMap.mapWorldWidth,
        mwx = game.mapIndex % mww,                 // map world x and y
        mwy = Math.floor(game.mapIndex / mww ),
        options = [];
        if(isAtCorner(game, cell)){
            if(x === 0 && y === 0){
                return getToIndexOptions(game, 0, 1, x, y).concat(getToIndexOptions(game, 1, 0, x, y));
            }
            if(x === map.w - 1 && y === 0){
                return getToIndexOptions(game, map.w - 1, 1, x, y).concat(getToIndexOptions(game, map.w - 2, 0, x, y));
            }
            if(x === map.w - 1 && y === map.h - 1){
                return getToIndexOptions(game, map.w - 1, map.h - 2, x, y).concat(getToIndexOptions(game, map.w - 2, map.h - 1, x, y));
            }
            if(x === 0 && y === map.h - 1){
                return getToIndexOptions(game, 0, map.h - 2, x, y).concat(getToIndexOptions(game, map.w - 2, map.h - 1, x, y));
            }
        }else{
            // if player cell x equals 0 ( left side )
            if(x === 0){
                var x = mwx - 1;
                x = x < 0 ? mww - 1 : x;
                toIndex = mwy * mww + x;
                dir = 'west';
            }
            // if player cell x equals map.w - 1 ( right side )
            if(x === map.w - 1){
                var x = mwx + 1;
                x = x >= mww ? 0 : x;
                toIndex = mwy * mww + x;
                dir = 'east';
            }
            // if player cell y equals 0 ( top side )
            if(y === 0){
                var y = mwy - 1;
                y = y < 0 ? game.maps.length / mww - 1 : y;
                toIndex = y * mww + mwx;
                dir = 'north';
            }
            // if player cell y map.h - 1 ( bottom side )
            if(y === map.h - 1){
                var y = mwy + 1;
                y = y >= game.maps.length / mww ? 0 : y;
                toIndex = y * mww + mwx;
                dir = 'south';
            }
        }
        // return array with index and dir text
        return dir === '' ? [] : [{
           mi: toIndex,
           dir: dir,
           x: ox === undefined ? x : ox,
           y: oy === undefined ? y : oy
        }];
    };
    // get a toMap object that can be set to the game.toMap propery
    var getToMap = function(game){
        var toMap = {index: null, x: null, y: null};
        var pCell = api.getPlayerCell(game);
        var map = game.maps[game.mapIndex];
        var options = toMap.options = getToIndexOptions(game, pCell.x, pCell.y);
        options = options.map(function(opt){
            if(opt.dir === 'north'){
                opt.y = map.h - 1;
            }
            if(opt.dir === 'south'){
                opt.y = 0;
            }
            if(opt.dir === 'east'){
                opt.x = 0;
            }
            if(opt.dir === 'west'){
                opt.x = map.w - 1;
            }
            return opt;
        });
        // assume first index
        if(options.length >= 1){
            toMap.index = options[0].mi;
            toMap.x = options[0].x;
            toMap.y = options[0].y;
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
            // set new cell to NOT walkable (as default) as a unit is now located here
            newCell.walkable = false;
            // if the unit is a portal then it is possible for a unit to walk over that
            if(unit.type === 'portal'){
                newCell.walkable = true;
            }
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
            // if no unit at the cell move to cell
            if(!moveToCell.unit){
                placeUnit(game, unit, moveToCell.x, moveToCell.y);
            }
            // what needs to hapen when just the player moves
            if(unit.type === 'player'){
                game.toMap = getToMap(game);
                // the player unit can go threw portals
                if(moveToCell.unit){
                    if(moveToCell.unit.type === 'portal'){
                        var portalUnit = moveToCell.unit;
                        changeWorldMap(game, portalUnit.data);
                    }
                }
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
    // change the current world map
    var changeWorldMap = function(game, portalData){
        var newWorldMap = game.sm.data[portalData.dataKey];
        game.worldMap = newWorldMap;
        game.turnState = 'wait';
        setupGame(game, true, portalData);
    };
    // change the current map
    var changeMap = function(game){
        var pCell = api.getPlayerCell(game);
        game.mapIndex = game.toMap.index;
        pCell.unit = null;
        pCell.walkable = true;
        game.player.currentCellIndex = null;
        placePlayer(game);
        game.toMap = getToMap(game);
    };
/********** **********
     MENU POOL
*********** *********/
    var menuPool = {
        count: 8,
        w: 40,
        h: 40,
        disableLifespan: true,
        data: {
            outerRadius: 85,
            innerRadius: 35,
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
     gameMod.create PUBLIC METHOD and helpers
*********** *********/
    // generate map strings helper
    var genMapStrings = function(opt){
        opt = opt || {};
        opt.mapWorldWidth = opt.mapWorldWidth || 1;
        opt.mapWorldHeight = opt.mapWorldHeight || 1;
        var w = opt.w || 9, h = opt.h || 7;
        var strLength = w * h;
        var blankStr = Array.from({length: strLength}).map(function(){ return 0; }).join('');
        var i = 0, mapStrings = [],
        len = opt.mapWorldWidth * opt.mapWorldHeight;
        while(i < len){
            mapStrings.push(blankStr);
            i += 1;
        }
        var str = mapStrings[0];
        var arr = str.split('');
        arr[0] = '2';
        mapStrings[0] = arr.join('');
        var str = mapStrings[1];
        var arr = str.split('');
        arr[7] = '3';
        mapStrings[1] = arr.join('');
        return mapStrings;
    };
    // create clean maps
    var createCleanMaps = function(game){
        var wMap = game.worldMap;
        game.maps = [];
        wMap.mapStrings.forEach(function(){
            game.maps.push(mapMod.create({
                marginX: game.marginX,
                marginY: game.marginY,
                w:  wMap.mapWidth,
                h:  wMap.mapHeight
            }));
        });
    };
    // start over with same state, or setUp a new game for the given game object
    var setupGame = api.setupGame = function (game, newGame, portal) {
        newGame = newGame === undefined ? true : newGame;
        portal = portal || null;
        var playerPlaced = false,
        startMapIndex = 0,
        // always use game.worldMap to set map values
        wMap = game.worldMap;
        game.mapIndex = 0;
        // set player HP to max
        game.player.HP = game.player.maxHP;
        if(newGame){
            game.remainingEnemies = 0;
        }
        // make sure mode starts out on map mode
        game.mode = 'map';
        // set up maps with data from mapStrings array first
        game.maps = game.maps.map(function(map, mi){
            var mapStr = wMap.mapStrings[mi] || '';
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
                // set player by mapString (if no portal object is given only though)
                if(cellIndex === 2 && !portal){
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
        // wMap portals
        wMap.mapPortals.forEach(function(portal){
            game.mapIndex = portal.mi;
            var portalUnit = unitMod.createUnit('portal');
            placeUnit(game, portalUnit, portal.x, portal.y);
            // setting data object of portal
            portalUnit.data = portal;
        });
        // if player is not palced then place the player unit
        // at a null cell
        if(!playerPlaced){
            placePlayer(game);
        }
        // if a portal data object is given, use that to set player location
        // and startMapIndex
        if(portal){
            startMapIndex = portal.dmi;
            game.mapIndex = startMapIndex;
            placeUnit(game, game.player, portal.dx, portal.dy);
        }
        // setting mapIndex and toMap objects
        game.mapIndex = startMapIndex;
        game.toMap = getToMap(game);
    };
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        opt.w = opt.w || 9;
        opt.h = opt.h || 7;
        opt.marginX = opt.marginX === undefined ? 0 : opt.marginX;
        opt.marginY = opt.marginY === undefined ? 0 : opt.marginY;
        // use the given start map, or default to gameMod.WOID_WORLD
        var wMap = opt.worldMap = opt.worldMap || api.VOID_WORLD;
        // create game state object
        var game = {
            sm: opt.sm || {},
            mode: 'map', // 'map' for the game in action, and 'menu' for the circle options menu
            turn: 0,
            turnState: 'wait',
            worldMap: wMap,
            marginX: opt.marginY,                    // margins from the upper left corner of the canvas
            marginX: opt.marginY,
            maps: [],                                // current WORKABLE STATE of the CURRENT WORLD MAP
            mapIndex: 0,                             // current map index in the CURRENT WORLD MAP
            toMap: {
                index: null,
                x: null,
                y: null
            },
            player: unitMod.createUnit('player'),
            remainingEnemies: 0,
            options: new poolMod.create(menuPool), // pool of objects used for the circle menu
            pointerDownTime: new Date()            // used to find out if we are dealing with a long press or not
        };
        // create clean maps
        createCleanMaps(game);
        // set up game for first time as new game
        setupGame(game, true);
        // return the game object
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
    // parse map event helper
    var parseMapEvent = function(game, type, defaultMethod){
        var mapEvent = game.worldMap[type] || defaultMethod || MAP_EVENTS.softMapReset;
        // if map event is a string
        if(typeof mapEvent === 'string'){
            var arr = mapEvent.split(':'),
            opt = [];
            if(arr[1]){
                opt = arr[1].split(',');
            }
            return {
                type: type,
                method: MAP_EVENTS[arr[0]],
                opt: opt
            };
        }
        // else mapEvent should be a function
        return {
            type: type,
            method: mapEvent,
            opt: []
        };
    };
    // call map event helper
    var callMapEvent = function(game, secs, type, defaultMethod){
        var mapEventObj = parseMapEvent(game, type, defaultMethod);
        mapEventObj.method.call(game, game, secs, mapEventObj.type, mapEventObj.opt);
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
            });
            game.turnState = 'move';
        }
        // move state
        if(game.turnState === 'move'){
            // move player unit
            moveUnit(game, game.player);
            eCells = getCellsByUnitType(map, 'enemy');
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
                // I think I will always want to clear the player cell
                pCell.unit = null;
                pCell.walkable = true;
                // call on player Death event
                callMapEvent(game, secs, 'onPlayerDeath', MAP_EVENTS.softMapReset);
                
            }
            // check for all enemies dead
            game.remainingEnemies = getRemainingEnemies(game);
            if(game.remainingEnemies === 0){
                // call on no Enemies event
                callMapEvent(game, secs, 'onNoEnemies', MAP_EVENTS.hardMapReset);
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
    // helper to create on click events for buttons
    var createMapButtonOnClick = function(dir){
        return function(sm, button){
            var tm = sm.game.toMap;
            sm.game.mode = 'map';
            tm.options.forEach(function(opt){
                if(opt.dir === dir){
                   tm.index = opt.mi;
                   tm.x = opt.x;
                   tm.y = opt.y;
                }
            });
            changeMap(sm.game);
        };
    };
    // hard coded BUTTONS
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
        onClick: createMapButtonOnClick('south')
    };
    BUTTON.map_north = {
        desc: 'North',
        outer: false,
        ta: Math.PI * 1.5,
        onClick: createMapButtonOnClick('north')
    };
    BUTTON.map_east = {
        desc: 'East',
        outer: false,
        ta: Math.PI * 2,
        onClick: createMapButtonOnClick('east')
    };
    BUTTON.map_west = {
        desc: 'West',
        outer: false,
        ta: Math.PI * 1,
        onClick: createMapButtonOnClick('west')
    };
    // get a count of buttons with the given prop and value, this is used in createMenu
    // to help with creating menu buttons in the 'circle menu feature' 
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
        var buttonKeys = ['quit', 'resume'];
        // appending options
        buttonKeys = buttonKeys.concat(game.toMap.options.map(function(opt){
             return 'map_' + opt.dir;
        }));
        // spawn buttons 
        var oi = 0, 
        ii = 0,
        oc = getButtonKeyValueCount(buttonKeys, 'outer', true), //3,
        ic = getButtonKeyValueCount(buttonKeys, 'outer', false); //2;
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
            // if we are in map mode switch to menu mode
            if(game.mode === 'map'){
                game.mode = 'menu';
                game.options.data.mode = 'enter';
                createMenu(game);
            }
        }
        // short press
        if(secs < 0.5 ){
            // if we are in map mode
            if (game.mode === 'map' && clickedCell) {
                // if player cell is clicked and there is a toIndex value
                if(clickedCell === pCell && game.toMap.index != null){
                    if(game.toMap.options.length > 1){
                        game.mode = 'menu';
                        game.options.data.mode = 'enter';
                        createMenu(game);
                    }else{
                        changeMap(game);
                    }
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
            // if we are in menu mode      
            if(game.mode === 'menu'){
                var clicked = poolMod.getOverlaping({active: true, w:1, h:1, x: x, y: y}, game.options);
                if(clicked.length >= 1){
                    game.options.data.mode = 'exit';
                    game.options.data.activeButton = clicked[0];
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
