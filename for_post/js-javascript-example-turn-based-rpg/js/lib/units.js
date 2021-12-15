var unitMod = (function () {
    
    var LEVEL_CAP = 100,
    LEVEL_DELTA_NEXT = 50;


    // PUBLIC API
    var api = {};

/********** **********
     SET STAT HELPERS
*********** *********/

   var setStat = {};
   
   // figure out what the raw attack value is for a turn
   setStat.attack = function(unit){
       // set the raw attack value for a unit
       unit.attack = unit.baseAttack.map(function(ba, i){
           // ref to 'current' weapon if any
           var cw = unit.currentWeapon != null ? unit.currentWeapon.attack[i]: 0;
           // base attack value + current attack
           return ba + cw;
           
       });
   };

    // set unit stats based on level
    var setUnitStats = function(unit){
        var level = unit.levelObj.level;
        // just Hit points for now
        unit.maxHP = 30 + 15 * ( level - 1 );
    };


/********** **********
     CREATE A UNIT
*********** *********/

    // create a base unit object
    var createBaseUnit = function () {
        var unit = {
            // level
            levelObj: utils.XP.parseByLevel(1, LEVEL_CAP, LEVEL_DELTA_NEXT),
            xpValue: 25,           // xp value that the unit will award when killed
            // current unit stats
            maxHP: 1,             // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            baseAttack: [1, 1],   // base attack
            baseDefense: [0, 0],  // base defense
            attack: [0, 0],       // an actual attack value to use ( set by the setAttack helper)
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
            player.maxHP = 30;
            player.baseAttack = [1, 3];
            player.baseDefense = [1, 2];
            player.currentWeapon = {
                attack: [5, 7]
            };
            setStat.attack(player);
        }
    };
    // enemy type
    UNIT_TYPES.enemy = {
        create : function(enemy){
            enemy.maxCellsPerTurn = 2;
            enemy.sheetIndex = 3;
            enemy.maxHP = 10;
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
    // portal type
    UNIT_TYPES.portal = {
        create : function(portal){
            portal.sheetIndex = 4;
            portal.data = {}; // !!! portal data set in gameMmod.setUpGame
        }
    };

    // Public unitMod.create method
    api.createUnit = function(type){
        var unit = createBaseUnit();
        unit.type = type;
        // call create method for the type
        UNIT_TYPES[type].create(unit);
        // set unit stats
        setUnitStats(unit);
        // return the unit
        return unit;
    };

/********** **********
     GIVE XP TO PLAYER
*********** *********/

    // give xp to a unit
    api.giveXP = function(unit, xp){
        // get current XP for unit
        var lObj = unit.levelObj,
        cXP = lObj.xp;
        // add to current
        cXP += xp;
        // new level object
        unit.levelObj = utils.XP.parseByXP(cXP, LEVEL_CAP, LEVEL_DELTA_NEXT);
        // set unit stats
        setUnitStats(unit);
    };

/********** **********
     MELEE ATTACK
*********** *********/

    // do a melee attack with the given units
    api.meleeAttack = function(attacker, target){
        // make sure attack stat is up to date
        setStat.attack(attacker);
        // figure raw attack
        var fa = attacker.attack,
        ra = utils.valueByRange(Math.random(), fa[0], fa[1]);
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
