// remove dead function
var removeDead = function (pool, onDead) {
    onDead = onDead || function () {};
    var dead = [];
    // create clean pool
    var clean = pool.filter(function (el) {
            if (el.hp <= 0) {
                dead.push(el);
                return false;
            }
            return true;
        });
    // call onDead for each dead enemy
    dead.forEach(function (el, i, dead) {
        onDead(el, i, dead, clean, pool);
    });
    return clean;
};
// DEMO
var ships = [{
        hp: 0
    }, {
        hp: 10
    }, {
        hp: 7
    }, {
        hp: -5
    }
];
var score = 0;
ships = removeDead(ships, function (ship) {
        score += 1;
    });
console.log(ships);
// [ { hp: 10 }, { hp: 7 } ]
console.log(score);
// 2
