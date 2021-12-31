var gameMod = (function () {
    // max pouch size
    var GROUP_POUCH_MAX = 10;
    // hard coded map events
    var MAP_EVENTS = {};
    // hard map reset
    MAP_EVENTS.hardMapReset = function(game, secs, type, opt){
        setupGame(game, true);
    };
    // soft map reset
    MAP_EVENTS.softMapReset = function(game, secs, type, opt){
        setupGame(game, false);
    };
    // do nothing
    MAP_EVENTS.nothing = function(game, secs, type, opt){
        utils.log('doing nothing for ' + type + ' map event in worldMap ' + game.worldMap.dataKey, 'info');
        utils.log('at mapIndex: ' + game.mapIndex, 'info');
        utils.log('', 'info');
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
    MAP_EVENTS.respawnWorldEnemies = function(game, secs, type, opt){
        // call setup game 2
        setupGame2(game);
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
        itemClassPool: [
            {desc: "Junk", "range": [1, 1] }
        ],

        itemSubTypes: {
            junk: [
                ["weapon.melee.sword", 1]
            ]
        },
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
        mapGroups: [],
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
    // get an array of cell index values
    var getMoveCells = function(game, startCell, targetCell){
        var map = game.maps[game.mapIndex];
        var path = getMovePath(game, startCell, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
        return path;
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
        // return first path or empty array
        return mtcOptions[0] || [];
    };
/********** **********
     UNITS
*********** *********/
    // place a unit at the given location in the current map
    var placeUnit = function (game, unit, x, y, mi) {
        var map = game.maps[mi === undefined ? game.mapIndex: mi];
        // get new cell location
        var newCell = mapMod.get(map, x, y);
        // if we have a cell object returned by mapMod.get
        if (newCell) {
            // any old cellIndex that may need to have walkable
            // set back to true?
            if (unit.currentCellIndex != null) {
                var oldCell = map.cells[unit.currentCellIndex];
                oldCell.walkable = true;
                // set unit ref back to null (by default)
                map.cells[unit.currentCellIndex].unit = null;
                // if the unit has children, unload them back to the cell
                if(unit.children.type === 'group' || unit.children.type === 'portal'){
                    oldCell.unit = unit.children;
                    unit.children = [];
                }
            }
            // save a unit that may be there as a child to be unloaded later
            if(newCell.unit){
               // !!! this should be the case to begin with at this point
               if(newCell.unit.walkable){
                   unit.children = newCell.unit;
               }
            }
            // unit.walkable should be what is used to set cell.walkable
            newCell.walkable = unit.walkable
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
            // if we have a move to cell
            if(moveToCell.unit){
                // !!! this should be the case to begin with at this point
                if(moveToCell.unit.walkable){
                    placeUnit(game, unit, moveToCell.x, moveToCell.y);
                }
            }else{
                placeUnit(game, unit, moveToCell.x, moveToCell.y);
            }
            // what needs to happen when just the player moves
            if(unit.type === 'player'){
                game.toMap = getToMap(game);
                // the player unit can go threw portals
                if(unit.children.type === 'portal'){
                    var portalUnit = unit.children;
                    unit.children = [];
                    changeWorldMap(game, portalUnit.data);
                }
            }
        }
    };
/********** **********
     MAP HELPERS
*********** *********/
    // create enemy unit options
    var createEnemyOptions = function(game, opt){
        // ref to world map
        var worldMap = game.worldMap;
        // start the eOptions object
        var eOptions = {
            pouchRange: worldMap.itemPouchRange || [0, 0],
            levelRange: worldMap.itemLevelRange || [1, 1],
            subTypes: worldMap.itemSubTypes || {},
            classes: {}
        };
        // item class probabilities
        eOptions.classes = itemClass.create({
            levelPer: 0,
            levelPerRatio: 1,
            pool: worldMap.itemClassPool || []
        });
        // return the options for creation of the enemy unit
        return eOptions;
    };
    // get remaining Enemies helper used to update game.remainingEnemies in 'end' process turn state
    var getRemainingEnemies = function(game){
        return game.maps.reduce(function(acc, map){
            var eCells = getCellsByUnitType(map, 'enemy');
            return acc + eCells.length;
        }, 0);
    };
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
    // apply map strings helper
    var applyMapStringsToMaps = function(game, newGame, portal, skipCI ){
        newGame = newGame === undefined ? true : newGame;
        portal = portal === undefined ? false : portal;
        skipCI = skipCI === undefined ? {} : skipCI;
        var wMap = game.worldMap,
        playerPlaced = false,
        startMapIndex = false;
        // update game.maps
        game.maps = game.maps.map(function(map, mi){
            var mapStr = wMap.mapStrings[mi] || '';
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                if(cellIndex === 0 && newGame && !skipCI[0]){
                    var cell = mapMod.get(map, ci);
                    cell.unit = null;
                    cell.walkable = true;
                }
                // wall blocks set for new games and not
                if(cellIndex === 1 && !skipCI[1] ){
                    var wall = unitMod.createUnit('wall');
                    placeUnit(game, wall, x, y, mi);
                }
                // set player by mapString (if no portal object is given only though)
                if(cellIndex === 2 && !portal && !skipCI[2]){
                    playerPlaced = true;
                    startMapIndex = mi;
                    placeUnit(game, game.player, x, y, mi);
                }
                // enemy
                if(cellIndex === 3 && newGame && !skipCI[3]){
                    //game.remainingEnemies += 1;
                    var enemy = unitMod.createUnit('enemy', createEnemyOptions(game, {}));
                    enemy.HP = enemy.maxHP;
                    placeUnit(game, enemy, x, y, mi);
                }
                return cell;
            });
            return map;
        });
        // return an object with info about what happened
        return {
            playerPlaced: playerPlaced,
            startMapIndex: startMapIndex
        };
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
        // call onWorldMapLeave
        callMapEvent(game, 0, 'onWorldMapLeave', MAP_EVENTS.nothing);
        var newWorldMap = game.sm.data[portalData.dataKey];
        game.worldMap = newWorldMap;
        game.turnState = 'wait';
        setupGame(game, true, portalData);
        // call onWorldMapLeave
        callMapEvent(game, 0, 'onWorldMapEnter', MAP_EVENTS.nothing);
    };
    // change the current map
    var changeMap = function(game){
        callMapEvent(game, 0, 'onMapLeave', MAP_EVENTS.nothing);
        var pCell = api.getPlayerCell(game);
        game.mapIndex = game.toMap.index;
        pCell.unit = null;
        pCell.walkable = true;
        game.player.currentCellIndex = null;
        placePlayer(game);
        game.toMap = getToMap(game);
        callMapEvent(game, 0, 'onMapEnter', MAP_EVENTS.nothing);
    };
/********** **********
     CIRCLE MENU
*********** *********/
    // start menu helper
    var startMenu = function(game, menuKey, opt){
        opt = opt || {};
        game.mode = 'menu';
        var d = game.options.data;
        d.menuKey = menuKey || 'main';
        d.mode = 'enter';
        d.lines = opt.lines || [];
        d.activeButton = null;
        createMenu(game);
    };
    // helper to create on click events for direction buttons
    var createMapButtonOnExit = function(dir){
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
    // quit and resume buttons
    BUTTON.quit = {
        desc: 'quit',
        outer: true,
        //onClick: function(sm, button){
        onExit: function(sm, button){
           sm.game.options.data.menuKey = 'main';
           sm.setState('title');
        }
    };
    BUTTON.resume = {
        desc: 'resume',
        outer: true,
        onExit: function(sm, button){
           sm.game.options.data.menuKey = 'main';
           sm.game.mode = 'map';
        }
    };
    // to menu buttons
    BUTTON.to_pickup = {
        desc: 'Pick Up',
        outer: true,
        onExit: function(sm, button){
            startMenu(sm.game, 'pickup');
        }
    };
    BUTTON.to_main = {
        desc: 'Main',
        outer: true,
        onExit: function(sm, button){
            // return to main menu key
            startMenu(sm.game, 'main');
        }
    };
    BUTTON.to_pouch = {
        desc: 'Pouch',
        outer: true,
        onExit: function(sm, button){
            // return to main menu key
            startMenu(sm.game, 'pouch');
        }
    };
    // direction buttons
    BUTTON.map_south = {
        desc: 'South',
        outer: false,
        ta: Math.PI * 0.5,
        onExit: createMapButtonOnExit('south')
    };
    BUTTON.map_north = {
        desc: 'North',
        outer: false,
        ta: Math.PI * 1.5,
        onExit: createMapButtonOnExit('north')
    };
    BUTTON.map_east = {
        desc: 'East',
        outer: false,
        ta: Math.PI * 2,
        onExit: createMapButtonOnExit('east')
    };
    BUTTON.map_west = {
        desc: 'West',
        outer: false,
        ta: Math.PI * 1,
        onExit: createMapButtonOnExit('west')
    };
    // MENUS
    var MENUS = {};
    // the main menu
    MENUS.main = {
        // create an array of keys for hard coded buttons to use
        buttonKeys : function(game){
            // default buttonKeys array
            var buttonKeys = ['quit', 'resume', 'to_pouch'];
            // appending direction buttons
            buttonKeys = buttonKeys.concat(game.toMap.options.map(function(opt){
                 return 'map_' + opt.dir;
            }));
            // check if the player has items that they can pick up if they want
            if(game.player.children.type === 'group'){
                buttonKeys.push('to_pickup');
            }
            return buttonKeys;
        },
        genButtons : function(){
            var buttons = [];
            return buttons;
        }
    };
    // the pick up item menu
    MENUS.pickup = {
        // create an array of keys for hard coded buttons to use
        buttonKeys : function(game){
            // default buttonKeys array
            var buttonKeys = ['to_main'];
            return buttonKeys;
        },
        genButtons: function(game){
            var group = game.player.children; 
            // gen a button for each item
            if(group.type === 'group'){
                return group.pouch.map(function(item, i){
                    var pouchFull = game.player.pouch.length >= game.player.pouch_max; 
                    return {
                        desc: item.subType.split('.')[2] || 'item',
                        type: 'default',
                        subText: 'lv' + item.levelObj.level,
                        outer: true,
                        fillStyle: pouchFull ? 'red' : 'cyan',
                        // use onClick to find out what the type should be ffor this button
                        onClick: function(sm, button){
                            // by default assume default type
                            button.data.type = 'default';
                            // switch to 'action' type if player pouch is full
                            if(pouchFull){
                                button.data.type = 'action';
                                utils.log('player pouch is full', 'debug');
                            }
                        },
                        // on exit event should only fire if player pouch is NOT full
                        onExit: function(sm, button){
                            utils.log('picking up an item', 'debug');
                            // splice the item from the group
                            group.pouch.splice(i, 1);
                            // push the item into the player pouch
                            game.player.pouch.push(item);
                            // remove group if empty set children prop
                            // back to a default empty array
                            if(group.pouch.length === 0){
                                game.player.children = [];
                                startMenu(sm.game, 'main');
                            }else{
                                startMenu(sm.game, 'pickup');
                            }
                        }
                    }
                });
            }
            return [];
        }
    };
    // the pouch menu
    MENUS.pouch = {
        // hard coded buttons for pouch menu
        buttonKeys : function(game){
            return ['to_main'];
        },
        // gen buttons
        genButtons : function(game){
            return game.player.pouch.map(function(item, i){     
                return {
                    desc: item.subType.split('.')[2] || 'item',
                    subText: 'lv' + item.levelObj.level,
                    fillStyle: 'cyan',
                    outer: true,
                    onExit: function(sm, button){
                        game.options.data.menuOpt.itemIndex = i;
                        game.options.data.menuOpt.item = item;
                        startMenu(sm.game, 'item', {
                            lines: [item.subType]
                        });
                    }
                }
            });
        }
    };
    // the item menu
    BUTTON.item_equip = {
        desc: 'equip',
        outer: true,
        type: 'action',
        onClick: function(sm, button){
            var item = sm.game.options.data.menuOpt.item,
            parts = item.subType.split('.');
            // if the item is a weapon
            if(parts[0] === 'weapon'){
                // if the menu item is the currentWeapon
                // then unarm the player
                if(item === sm.game.player.currentWeapon){
                    sm.game.player.currentWeapon = null;
                }else{
                    // else just set a ref for currentWeapon
                    sm.game.player.currentWeapon = item;
                }
            }


            if(parts[0] === 'armor'){
                if(item === sm.game.player.currentArmor[parts[1]]){
                    sm.game.player.currentArmor[parts[1]] = null
                }else{
console.log('yes');
                    sm.game.player.currentArmor[parts[1]] = item;
                }
            }

        }
    };

    // get a drop cell ref, or return false for the given cell postion and map index
    var getDropObj = function(game, x, y, mi){
        // assume current map if no mi (map index) is given
        var map = game.maps[mi === undefined ? game.mapIndex: mi],
        cell = mapMod.get(map, x, y),
        result = {
            cell: cell,
            mode: 'fail'
        };
        // modes are
        // create, add, createUnder, addUnder, and fail
        // if cell.unit is null then we can drop here at this cell
        // by way of just creating a new group at cell.unit
        if(cell.unit === null){
            result.mode = 'create';
            return result;
        }
        // if the cell.unit type is group we can add to that if it is not full
        if(cell.unit.type === 'group'){
            // if the group is not full we can drop there
            if(cell.unit.pouch.length < GROUP_POUCH_MAX){
                result.mode = 'add';
                return result;
            }
        }
        // if the type is 'player' or 'enemy' we can check what is below it
        if(cell.unit.type === 'player' || cell.unit.type === 'enemy'){
            var under = cell.unit.children;
            if(under.type === undefined){
                result.mode = 'createUnder';
                return result;
            }
            if(under.type === 'group'){
                if(under.pouch.length < GROUP_POUCH_MAX){
                    result.mode = 'addUnder';
                    return result;
                }
            }
        }
        // next step is to check the cells near this one if type is group, player or enemy
        if(cell.unit.type === 'player' || cell.unit.type === 'enemy' || cell.unit.type === 'group'){
            var otherCells = mapMod.getNeighbors(map, cell, 8);
            var oci = 0, other;
            while(oci < otherCells.length){
                other = result.cell = otherCells[oci];
                // if other cell is null we can create there
                if(other.unit === null){
                    result.mode = 'create';
                    return result;
                }
                // if other cell is a group check if we can add there
                if(other.unit.type === 'group'){
                    if(other.unit.pouch.length < GROUP_POUCH_MAX){
                        result.mode = 'add';
                        return result;
                    }
                }
/*
                // if other cell has the player or the enemy above it, check if we can create or add under
                if(other.unit.type === 'player' || other.unit.type === 'enemy'){
                    var under = other.unit.children;
                    if(under.type === undefined){
                        result.mode = 'createUnder';
                        return result;
                    }
                    if(under.type === 'group'){
                        if(under.unit.pouch.length < GROUP_POUCH_MAX){
                            result.mode = 'addUnder';
                            return result;
                        }
                    }                  
                }
*/
                oci += 1;
            }
        }
        // return default object then
        return result;
    };

    // just see if we can drop a item at given cell location returning true or false
    var canDropAtCell = function(game, cell){
        var result = getDropObj(game, cell.x, cell.y, game.mapIndex);
        if(result.mode === 'fail'){
            return false;
        }
        return true;
    };

    // puch drop of enemy unit at given eCell
    var enemyPouchDrop = function(game, eCell){

        console.log('pouch drop!');

        var i = eCell.unit.pouch.length;
        while(i--){
            unitItemDrop(game, eCell, i);
        }
      
    };
    var unitItemDrop = function(game, uCell, itemIndex){
        var result = getDropObj(game, uCell.x, uCell.y, game.mapIndex),
        unit = uCell.unit,
        item = unit.pouch[itemIndex],
        group;
        // if result is 'fail'
        if(result.mode === 'fail' || item === undefined){
            return;
        }
        if(result.mode === 'createUnder'){
            result.cell.unit.children = unitMod.createUnit('group',  { pouch:[ item ] } );
        }
        if(result.mode === 'addUnder'){
            result.cell.unit.children.pouch.push(item);
        }
        if(result.mode === 'create'){
            result.cell.unit = unitMod.createUnit('group',  { pouch:[ item ] } );
        }
        if(result.mode === 'add'){
            result.cell.unit.pouch.push(item);
        }
        if(unit.type === 'player' && item === game.player.currentWeapon){
            game.player.currentWeapon = null;
        }
        unit.pouch.splice(itemIndex, 1);
    };
    // menu for a current item
    MENUS.item = {
        // hard coded buttons for item menu
        buttonKeys : function(game){
            return ['to_pouch', 'item_equip'];
        },
        genButtons : function(game){
            var buttons = [];
            var canDrop = canDropAtCell(game, api.getPlayerCell(game));
            buttons.push({
                desc: 'drop',
                outer: true,
                type: 'default',
                fillStyle : canDrop ? 'cyan' : 'red',
                onClick: function(sm, button){
                    if(!canDrop){
                        button.data.type = 'action';
                        utils.log('can not drop', 'debug');
                    }
                },
                onExit: function(sm, button){
                        // use player item drop method
                        //playerItemDrop(sm.game, game.options.data.menuOpt.itemIndex);
                        unitItemDrop(sm.game, api.getPlayerCell(game), game.options.data.menuOpt.itemIndex);
                        startMenu(sm.game, 'pouch');
                }
            });
            return buttons;
        }
    };
    // get a count of buttons with the given prop and value, this is used in createMenu
    // to help with creating menu buttons in the 'circle menu feature' 
    var getCollectionKeyValueCount = function(objects, prop, value){
        return objects.reduce(function(acc, obj){
            if(obj[prop] === value){
                acc += 1;
            }
            return acc;
        }, 0);
    };
    // create button data objects
    var createButtonDataObjects = function(game){
        // current menu key
        var menuKey = menuPool.data.menuKey,
        menu = MENUS[menuKey];
        // start with hard coded objects
        var buttonDataObjects = menu.buttonKeys(game).map(function(bKey){
            return BUTTON[bKey];
        });
        var genButtons = menu.genButtons(game);
        buttonDataObjects = buttonDataObjects.concat(genButtons);
        // call genButtons
        return buttonDataObjects;
    };
    // create a menu for the current game state
    var createMenu = function(game){
        // current menu key
        var menuKey = menuPool.data.menuKey;
        // purge all buttons first
        game.options.objects.forEach(function(button){
            button.active = false;
        });
        // create buttons for the current menu
        var buttonDataObjects = createButtonDataObjects(game);
        // spawn buttons
        var oi = 0, 
        ii = 0,
        oc = getCollectionKeyValueCount(buttonDataObjects, 'outer', true),
        ic = getCollectionKeyValueCount(buttonDataObjects, 'outer', false);
        buttonDataObjects.forEach(function(buttonDATA){
            var len = (buttonDATA.outer ? oc : ic),
            i = (buttonDATA.outer ? oi : ii),
            ta = Math.PI * 2 / len * (i + 1);
            // use buttonDATA.ta if there is one
/*
            // oldesy way of doing this is not so great
            ta = buttonDATA.ta != undefined ? buttonDATA.ta : ta;
            // spawn buttons
            poolMod.spawn(game.options, sm, {
                desc: buttonDATA.desc,
                subText: buttonDATA.subText,
                onClick: buttonDATA.onClick,
                onExit: buttonDATA.onExit,
                outer: buttonDATA.outer,
                ta: ta,
                type: buttonDATA.type
            });
*/
/*
            // this should work, but it does not
            buttonDATA.ta = buttonDATA.ta != undefined ? buttonDATA.ta : ta;
            poolMod.spawn(game.options, sm, buttonDATA);
*/
            // !!! using object assign for now ( may need to switch back!? )
            ta = buttonDATA.ta === undefined ? ta : buttonDATA.ta;
            var spawnOpt = Object.assign({}, buttonDATA, {ta: ta});
            poolMod.spawn(game.options, sm, spawnOpt);
            // steping outer and inner counts
            if(buttonDATA.outer){
               oi += 1;
            }else{
               ii += 1;
            }
        });
    };
    // the menu object pool
    var menuPool = {
        count: 11,
        w: 45,
        h: 45,
        disableLifespan: true,
        data: {
            outerRadius: 85,
            innerRadius: 35,
            outerTotal: 1,
            frame: 0,
            maxFrame: 15,
            activeButton: null,   // a ref to the active button to use on 'exit' mode end
            mode: 'enter',        // current mode of the menuPool 'enter', 'wait', and 'exit'
            menuKey: 'main',      // the current menu key
            menuOpt: {},          // the current options for the current menu
            lines: []             // lines of text to display for the current menu
        }
    };
    // buttons spawn
    menuPool.spawn = function(button, options, sm, spawnOpt){
        var bd = button.data,
        pd = options.data;
        // button data
        bd.desc = spawnOpt.desc || false;
        bd.fillStyle = spawnOpt.fillStyle || '#dadada';
        bd.subText = spawnOpt.subText || '';
        bd.type = spawnOpt.type || 'default';
        bd.cx = button.x = sm.canvas.width / 2 - button.w / 2;
        bd.cy = button.y = sm.canvas.height / 2 - button.h / 2;
        bd.radius = 0;
        bd.a = 0;
        bd.ta = spawnOpt.ta === undefined ? Math.PI * 2: spawnOpt.ta;
        bd.outer = spawnOpt.outer === undefined ? true : spawnOpt.outer;
        // event methods
        bd.onClick = spawnOpt.onClick || function(){};
        bd.onExit = spawnOpt.onExit || function(){};
        // pool data
        pd.frame = 0;
        pd.outerTotal = spawnOpt.outerTotal === undefined ? 1 : spawnOpt.outerTotal
    };
    // button update
    menuPool.update = function(button, options, sm, secs){
        var pd = options.data,
        bd = button.data;
        // !!! updating pool data here is not so great I should maybe have a main update method for pools
        if(button.i === options.objects.length - 1){
            // if we are in enter mode
            if(pd.mode === 'enter'){
                pd.frame += 30 * secs;
                pd.frame = pd.frame >= pd.maxFrame ? pd.maxFrame : pd.frame;
                if(pd.frame === pd.maxFrame){
                    pd.mode = 'wait';
                }
            }
            // after enter mode is down we are in waite mode
            if(pd.mode === 'wait'){
                // if we have an active button
                if(pd.activeButton){

                    // always call on click for the active button
                    pd.activeButton.data.onClick.call(sm, sm, pd.activeButton);

                    // if the active button is a 'default' type
                    // mode should change to exit and the active button
                    // ref should remain as the onExit event will need to fire later
                    if(pd.activeButton.data.type === 'default'){
                        // by default switch mode to exit
                        pd.mode = 'exit';
                    }
                    // if the type is 'action' just call the onClick
                    // method, clean activeButon back to null, and 
                    // stay in 'wait' mode. The onExit event is not used in this mode
                    if(pd.activeButton.data.type === 'action'){    
                        pd.activeButton = null;
                    }
                }
            }
            // if we are in exit mode
            if(pd.mode === 'exit'){
                pd.frame -= 30 * secs;
                pd.frame = pd.frame < 0 ? 0 : pd.frame;
                if(pd.frame === 0){
                    // we should have an active button, if so call the onExit method for it
                    // else drop back to map mode
                    if(pd.activeButton){
                        pd.mode = 'enter';
                        pd.frame = 0;
                        pd.activeButton.data.onExit.call(sm, sm, pd.activeButton);
                        pd.activeButton = null;
                    }else{
                        pd.menuKey = 'main';
                        sm.game.mode = 'map';
                    }
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
    var setupPortals = function(game){
        // wMap portals
        game.worldMap.mapPortals.forEach(function(portal){
            //game.mapIndex = portal.mi;
            var portalUnit = unitMod.createUnit('portal');
            placeUnit(game, portalUnit, portal.x, portal.y, portal.mi);
            // setting data object of portal
            portalUnit.data = portal;
        });
    };
    var setupGroups = function(game){
        // wMap portals
        game.worldMap.mapGroups.forEach(function(opt){
            var gUnit = unitMod.createUnit('group', opt);
            placeUnit(game, gUnit, opt.x, opt.y, opt.mi);
            gUnit.data = {};
        });
    };
    // setup method 2 - !!! I should only need one method like this
    var setupGame2 = function(game){
        var pCell = api.getPlayerCell(game),
        wMap = game.worldMap;
        game.maps = game.maps.map(function(map, mi){
            var mapStr = wMap.mapStrings[mi] || '';
            //game.mapIndex = mi;
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                // enemy
                if(cellIndex === 0){
                    var cell = mapMod.get(map, ci);
                    cell.unit = null;
                    cell.walkable = true;
                }
                if(cellIndex === 1){
                    var wall = unitMod.createUnit('wall');
                    placeUnit(game, wall, x, y, mi);
                }
                // enemy
                if(cellIndex === 3){
                    var enemy = unitMod.createUnit('enemy', createEnemyOptions(game, {}));
                    enemy.HP = enemy.maxHP;
                    placeUnit(game, enemy, x, y, mi);
                }
                return cell;
            });
            return map;
        });
        // groups
        setupGroups(game);
        // set up portals
        setupPortals(game);
        // set remainingEnemies count
        game.remainingEnemies = getRemainingEnemies(game);
    };
    // start over with same state, or setUp a new game for the given game object
    var setupGame = api.setupGame = function (game, newGame, portal) {
        newGame = newGame === undefined ? true : newGame;
        portal = portal || null;
        var playerPlaced = true,
        startMapIndex = 0,
        // always use game.worldMap to set map values
        wMap = game.worldMap;
        game.mapIndex = 0;
        // set player HP to max
        game.player.HP = game.player.maxHP;
        // make sure mode starts out on map mode
        game.mode = 'map';
        // set up maps with data from mapStrings array first
        var result = applyMapStringsToMaps(game, newGame, portal, {});
        playerPlaced = result.playerPlaced;
        startMapIndex = result.startMapIndex;
        // groups
        setupGroups(game);
        // set up portals 
        setupPortals(game);
        // if a portal data object is given, use that to set player location
        // and startMapIndex
        if(portal){
            startMapIndex = portal.dmi;
            game.mapIndex = startMapIndex;
            game.player.currentCellIndex = null;
            placeUnit(game, game.player, portal.dx, portal.dy, portal.dmi);
            playerPlaced = true;
        }
        // if player is not palced then place the player unit
        // at a null cell
        if(!playerPlaced){
            placePlayer(game);
        }
        // setting mapIndex and toMap objects
        game.mapIndex = startMapIndex;
        game.toMap = getToMap(game);
        // set remainingEnemies count
        game.remainingEnemies = getRemainingEnemies(game);
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

//console.log( getDropObj(game, 4, 2) );
//console.log( getDropObj(game, 4, 3) );

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
                    // give xp value to player
                    unitMod.giveXP(game.player, tUnit.xpValue);
                    // drop the pouch
                    enemyPouchDrop(game, targetCell);
                    // if the target unit has a group that needs to be placed back
                    // as the top level unit, put it back, else just clear the cell
                    targetCell.walkable = true;
                    if(tUnit.children.type === 'group'){
                        targetCell.unit = tUnit.children;
                    }else{
                        targetCell.unit = null;
                    }
                }
            }
            unit.meleeTarget = null;
        }
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
                // log cell to console
                utils.log(clickedCell, 'debug');
                // if player cell is clicked AND there is a toIndex value
                if(clickedCell === pCell && game.toMap.index != null){
                    if(game.toMap.options.length > 1){
                        startMenu(game, 'main');
                    }else{
                        changeMap(game);
                    }
                    return;
                }
                // if cell has a unit on it
                if(clickedCell.unit){
                    var unit = clickedCell.unit;
                    // enemy clicked
                    if(unit.type === 'enemy'){
                        // set meleeTarget index
                        game.player.meleeTarget = clickedCell.i;
                        game.turnState = 'start';
                        return;
                    }
                    // player clicked but not at map edge
                    if(unit.type === 'player'){
                        //startMenu(game, 'main');
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
                    //game.options.data.mode = 'exit';
                    game.options.data.activeButton = clicked[0];
                }else{
                   // no button was clicked
                    game.options.data.mode = 'exit';
                    game.options.data.activeButton = null;
                }
            }
        }
    };
    // return the public API
    return api;
}
    ());

