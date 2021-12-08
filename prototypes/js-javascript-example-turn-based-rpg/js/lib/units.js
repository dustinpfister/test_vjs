var unitMod = (function () {
    
    // PUBLIC API
    var api = {};

/********** **********
     SET STAT HELPER
*********** *********/

   var setStat = {};
   
   setStat.attack = function(unit){
       unit.attack = unit.baseAttack.map(function(ba, i){
           // ref to 'current' weapon if any
           var cw = unit.currentWeapon != null ? unit.currentWeapon.attack[i]: 0;
           // base attack value + current attack
           return ba + cw;
           
       });
   };


/********** **********
     CREATE A UNIT
*********** *********/

    // create a base unit object
    var createBaseUnit = function () {
        var unit = {
            // current unit stats
            maxHP: 1,             // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            baseAttack: [1, 1],   // base attack
            baseDefense: [0, 0],  // base defense
            attack: [0, 0],
            // equipment
            meleeWeapon: null,
            currentWeapon: null,  // the current active weapon
            // current values
            HP: 1,
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            meleeTarget: null, // cell index to attack in 'melee' processTurn state
            moveCells: [], // array of cells to move in 'move' processTurn state
            currentCellIndex: null,
            active: true
        };
        setStat.attack(unit);
        return unit;
    };

    var UNIT_TYPES = {};
    // player type
    UNIT_TYPES.player = {
        create : function(player){
            player.maxCellsPerTurn = 3;
            player.sheetIndex = 2; // player sheet
            player.maxHP = 50;
            player.baseAttack = [3, 7];
            player.baseDefense = [1, 2];
            setStat.attack(player);
        }
    };
    // enemy type
    UNIT_TYPES.enemy = {
        create : function(enemy){
            enemy.maxCellsPerTurn = 2;
            enemy.sheetIndex = 3;
            enemy.maxHP = 8;
            enemy.baseAttack = [2, 5];
            enemy.baseDefense = [1, 2];
            setStat.attack(enemy);
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


/********** **********
     MELEE ATTACK
*********** *********/

    // do a melee attack with the given units
    api.meleeAttack = function(attacker, target){
        // figure raw attack
        var ba = attacker.baseAttack,
        ra = utils.valueByRange(Math.random(), ba[0], ba[1]);
        console.log(attacker.attack)
        // figure target defense
        var bd = target.baseDefense,
        d = utils.valueByRange(Math.random(), bd[0], bd[1]);
        // figure attack value
        var a = ra - d;
        // attack can not go below zero
        a = a < 0 ? 0 : a;
        // take hp from target
        target.HP -= a;
        target.HP = target.HP < 0 ? 0 : target.HP;
    };

    // return the public API
    return api;
}
    ());
