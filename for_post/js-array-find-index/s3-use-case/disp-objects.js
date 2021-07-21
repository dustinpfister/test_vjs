// find dead unit index values
var findDeadUnitIndexValues = function(pool){
    return pool.map(function(obj, index){
        return {
            index: index,
            hp: obj.hp
        }
    }).filter(function(obj){
        return obj.hp <= 0;
    });
};
// process dead units
var processDeadUnits = function(pool, state){
    var indexObjects = findDeadUnitIndexValues(pool);
    indexObjects.forEach(function(obj){
        var unit = pool[obj.index]
        state.money += unit.money;
        unit.active = false;
        unit.x = -32;
        unit.y = -32;
        unit.money =  0;
    });
};
// a pool
var pool = [
  { x: 42, y: 12, hp: 0, hpMax: 10, active: true, money: 1},
  { x: 10, y: 89, hp: 3, hpMax: 10, active: true, money: 1},
  { x: 30, y: 90, hp: 7, hpMax: 10, active: true, money: 1},
  { x: 37, y: 10, hp: 10, hpMax: 10, active: true, money: 1},
  { x: 15, y: 45, hp: 0, hpMax: 10, active: true, money: 1}
];
console.log(findDeadUnitIndexValues(pool));
// [ { index: 0, hp: 0 }, { index: 4, hp: 0 } ]
var state = {money: 0};
processDeadUnits(pool, state);
console.log(state);
// { money: 2 }
console.log(pool);
/*
[ { x: -32, y: -32, hp: 0, hpMax: 10, active: false, money: 0 },
  { x: 10, y: 89, hp: 3, hpMax: 10, active: true, money: 1 },
  { x: 30, y: 90, hp: 7, hpMax: 10, active: true, money: 1 },
  { x: 37, y: 10, hp: 10, hpMax: 10, active: true, money: 1 },
  { x: -32, y: -32, hp: 0, hpMax: 10, active: false, money: 0 } ]
*/