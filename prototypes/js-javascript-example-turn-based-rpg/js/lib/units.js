var unitMod = (function () {
    
    // PUBLIC API
    var api = {};

/********** **********
     CREATE A UNIT
*********** *********/

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
            active: true
        }
    };

    var UNIT_TYPES = {};
    // player type
    UNIT_TYPES.player = {
        create : function(player){
            player.maxCellsPerTurn = 3;
            player.sheetIndex = 2; // player sheet
            player.maxHP = 50;
        }
    };
    // enemy type
    UNIT_TYPES.enemy = {
        create : function(enemy){
            enemy.maxCellsPerTurn = 2;
            enemy.sheetIndex = 3;
            enemy.maxHP = 5;
        }
    };
    // wall type
    UNIT_TYPES.wall = {
        create : function(wall){
            wall.sheetIndex = 1;
        }
    };

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
