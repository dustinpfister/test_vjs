var unitMod = (function () {
    
    var LEVEL_CAP = 100,
    LEVEL_DELTA_NEXT = 50;


    // PUBLIC API
    var api = {};

    // built in ITEMS 'database' object
    var ITEMS = {};

    // weapon Items
    ITEMS.weapon = {};

    // melee weapons
    ITEMS.weapon.melee = {};

    ITEMS.weapon.melee.sword = {
        perLevel: {
          baseAttack: { min: [1, 1], inc: [1, 0.5] }
        }
    };

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

    // base attack
    setStat.baseAttack = function(unit, l, baOpt){
        // base attack defaults to [0, 0] for all units
        var ba = unit.baseAttack = [0, 0];
        if(baOpt){
            ba[0] = baOpt.min[0] + Math.floor(baOpt.inc[0] * l);
            ba[1] = (ba[0] + baOpt.min[1]) + Math.floor(baOpt.inc[1] * l);
        } 
    };
    setStat.baseDefense = function(unit, l, bdOpt){
        // base defense defaults to [0, 0] for all units
        var bd = unit.baseDefense = [0, 0];
        if(bdOpt){
            bd[0] = bdOpt.min[0] + Math.floor(bdOpt.inc[0] * l);
            bd[1] = (bd[0] + bdOpt.min[1]) + Math.floor(bdOpt.inc[1] * l);
        } 
    };

    // set unit stats based on level
    var setUnitStats = function(unit){
        var level = unit.levelObj.level,
        perLevel = unit.perLevel,
        l = ( level - 1 );
        // hit points
        unit.maxHP = 30 + 15 * l;
        // set base attack for this unit based on level
        setStat.baseAttack(unit, l, perLevel.baseAttack);
        // set base defense for all units
        setStat.baseDefense(unit, l, perLevel.baseDefense);
        // call setState.attack
        setStat.attack(unit);
    };


/********** **********
     CREATE A UNIT
*********** *********/

    // create a base unit object
    var createBaseUnit = function () {
        var unit = {
            // level
            levelObj: utils.XP.parseByLevel(1, LEVEL_CAP, LEVEL_DELTA_NEXT),
            perLevel: {},         // per level values to use to set stats 
            xpValue: 25,          // xp value that the unit will award when killed
            // current unit stats
            maxHP: 1,             // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            baseAttack: [0, 0],   // base attack
            baseDefense: [0, 0],  // base defense
            attack: [0, 0],       // actual attack (baseAttack + weapons + buffs + ect) ( see setAttack helper)
            // equipment
            meleeWeapon: null,
            currentWeapon: null,  // the current active weapon
            // current values
            HP: 1,
            subType: '',
            data: {},
            children: [],
            pouch:[],             // a collection of item units for this unit AKA and inventory
            pouch_max: 10,        // max size of the pouch
            walkable: false,      // used to set if the cell should be walkable or not if this unit is the actual unit of a cell
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            meleeTarget: null, // cell index to attack in 'melee' processTurn state
            moveCells: [], // array of cells to move in 'move' processTurn state
            currentCellIndex: null,
            active: true
        };
        return unit;
    };
    // types
    var UNIT_TYPES = {};


    // group type
    UNIT_TYPES.group = {
        create : function(group, opt){
            group.sheetIndex = 5;
            group.walkable = true;
            // defaults to empty pouch
            group.pouch = [];
            // create and add items to the group
            var pouch = opt.pouch;
            if(pouch){
                pouch.forEach(function(obj){
                    if(obj.type === 'item'){
                        var item = obj;
                        group.pouch.push(item);
                    }else{
                        var itemOpt = obj;
                        group.pouch.push(api.createUnit('item', itemOpt));
                    }
                });
            }
        }
    };
    // group type
    UNIT_TYPES.item = {
        create : function(item, itemOpt){
            item.sheetIndex = 6;
            item.walkable = true;
            item.subType = itemOpt.subType;
            // get item rect object
            var itemRec = utils.getPath(ITEMS, itemOpt.subType, null);
            item.levelObj = utils.XP.parseByLevel(itemOpt.level, LEVEL_CAP, LEVEL_DELTA_NEXT);
            item.perLevel = itemRec.perLevel;
        }
    };
    // player type
    UNIT_TYPES.player = {
        create : function(player){
            player.levelObj = utils.XP.parseByLevel(1, LEVEL_CAP, LEVEL_DELTA_NEXT);
            player.maxCellsPerTurn = 3;
            player.sheetIndex = 2; // player sheet
            // per level object for player
            player.perLevel = {
                baseAttack: { min: [2, 1], inc: [0.75, 0.5] },
                baseDefense: { min: [1, 1], inc: [0.125, 0.025] }
            };
            // starting item for player
            var startItem = api.createUnit('item', { subType: 'weapon.melee.sword', level: 2});
            player.pouch.push(startItem);
            // starting weapon for the player
            player.currentWeapon = player.pouch[0];
            // player pouch size
            player.pouch_max = 10;
        }
    };
    // enemy type
    UNIT_TYPES.enemy = {
        create : function(enemy, opt){
opt = opt || {};
            enemy.maxCellsPerTurn = 2;
            enemy.sheetIndex = 3;
            var perLevel = enemy.perLevel = {};
            // min value, incremental values
            perLevel.baseAttack = { min: [2, 1], inc: [0.25, 0.125] };

            //var startItem = api.createUnit('item', { subType: 'weapon.melee.sword', level: 1});

opt.classes = opt.classes || itemClass.create({
   levelPer: 0,             // the current global level for item drops
   levelPerRatio: 1,     // the ratio 0-1 that is the amount that the global levelPer effects points for each item class
   pool: [                  // pool defining values for each class
     {desc: 'junk', range: [100, 10]},
     {desc: 'Common', range: [10, 80], levelPer: 0.5},
     //{desc: 'Epic', range: [10, 100], levelPer: 1}
   ]
});

opt.subTypes = opt.subTypes || {
    junk:[
        'weapon.melee.dagger_flint',
        'weapon.melee.sword_rusty'
    ]
};

var itemClassObj = itemClass.getRandomItemClass(opt.classes);
console.log( itemClassObj.desc );

            [
                1, 7
            ].forEach(function(level){
                enemy.pouch.push(api.createUnit('item', { subType: 'weapon.melee.sword', level: level}));
            });
            // starting weapon for enemy
            enemy.currentWeapon = enemy.pouch[0];
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
            portal.walkable = true;
            portal.data = {}; // !!! portal data set in gameMmod.setUpGame
        }
    };

    // Public unitMod.create method
    api.createUnit = function(type, opt){
        var unit = createBaseUnit();
        unit.type = type;
        // call create method for the type
        UNIT_TYPES[type].create(unit, opt);
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

/********** **********
     LOAD ITEMS
*********** *********/

    // load items from the given data collection
    api.loadItems = function(data){
        utils.log('units.js: loading items from a given data object');
        // get valid item keys which start with 'i' and have at east two
        // or more parts sepearted with an underscore ( 'i_home', 'i_home_sublevel_0' )
        var itemKeys = Object.keys(data).filter(function(key){
            var parts = key.split('_');
            if(parts.length >= 2 && parts[0] === 'i'){
                return true;
            }
            return false;
        });
        // loop itemKeys of the data object
        itemKeys.forEach(function(key){
            var itemDefs = data[key];
            itemDefs.items.forEach(function(itemDef){
                // update ITEMS
                var item = utils.setPath(ITEMS, itemDef.subType, itemDef);
            });
        });
        utils.log('units.js: There are now ' + Object.keys(ITEMS.weapon.melee).length + ' melee weapons to work with.');
    };


    // return the public API
    return api;
}
    ());
