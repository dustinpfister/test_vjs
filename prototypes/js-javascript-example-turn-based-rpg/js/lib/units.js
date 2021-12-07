var unitMod = (function () {
    
    // create a base unit object
    var createBaseUnit = function () {
        return {
            // current unit stats
            maxHP: 1,           // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            // current values
            HP: 1,
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            meleeTarget: null, // cell index to attack in 'melee' processTurn state
            moveCells: [], // array of cells to move in 'move' processTurn state
            currentCellIndex: null,
            active: false
        }
    };

    var UNIT_TYPES = {};
    UNIT_TYPES.player = {
        create : function(player){
            player.active = true;
            player.maxCellsPerTurn = 3;
            player.sheetIndex = 2; // player sheet
            player.maxHP = 50;
        }
    }



    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.type = 'player';
        player.active = true;
        player.maxCellsPerTurn = 3;
        player.sheetIndex = 2; // player sheet
        player.maxHP = 30;
        return player;
    };    // create a player unit
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.type = 'enemy';
        enemy.active = true;
        enemy.maxCellsPerTurn = 2;
        enemy.sheetIndex = 3;
        enemy.maxHP = 5;
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


    // PUBLIC API
    var api = {};

    // Public unitMod.create method
    api.createUnit = function(type){
        var unit = createBaseUnit();
        unit.type = type;
        // call create method for the type
        UNIT_TYPES[type].create(unit);
        // return the unit
        return unit;
    };


    // return the public API
    return api;
}
    ());
