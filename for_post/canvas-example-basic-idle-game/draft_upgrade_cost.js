// drafting out upgrade cost

var upgradeData = [{
        dispName: 'Manual Gather',
        cost: {
            base: 50,
            pow: 1.25,
            inc: 10
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

var u = makeUS(upgradeData);

console.log(u.cost);
