// drafting out upgrade cost

var upgradeData = [{
        dispName: 'Manual Gather',
        cost: {
            base: 10,
            pow: 1.125,
            inc: 5
        }
    }
];

// make a new upgradeState object from an upgradeData object
var makeUS = function (ud) {
    return {
        dispName: ud.dispName,
        level: 0,
        cost: Object.assign({
            current: ud.cost
        }, ud.cost)
    };
};

// set the given upgrade state to the given level
var setUS = function (us, level) {
    level = level || 0;
    us.level = level;
    us.cost.current = us.cost.base + us.cost.inc * level + Math.pow(us.cost.pow, level);
};

var u = makeUS(upgradeData[0]);
console.log(u);
var level = 0,
len = 100;
while (level < len) {
    setUS(u, level);
    console.log(level, u.cost);
    level += 1;
}
