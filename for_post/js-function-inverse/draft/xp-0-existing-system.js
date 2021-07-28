// get exp to the given level with given current_level and xp
var getXP = function (level, deltaNext) {
    return ((Math.pow(level, 2) - level) * deltaNext) / 2;
};
// set level with given xp
var getLevel = function (xp, deltaNext) {
    return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
};

var level = 1,
results = [],
cap = 10;
while (level <= cap) {
    var xp = getXP(level, 100);
    results.push({
        level: level,
        getXPResult: xp,
        getLevelResult: getLevel(xp, 100)
    });
    level += 1;
}
console.log(results);
