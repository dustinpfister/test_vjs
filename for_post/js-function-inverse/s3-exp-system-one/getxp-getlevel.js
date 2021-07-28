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
/*
[ { level: 1, getXPResult: 0, getLevelResult: 1 },
  { level: 2, getXPResult: 100, getLevelResult: 2 },
  { level: 3, getXPResult: 300, getLevelResult: 3 },
  { level: 4, getXPResult: 600, getLevelResult: 4 },
  { level: 5, getXPResult: 1000, getLevelResult: 5 },
  { level: 6, getXPResult: 1500, getLevelResult: 6 },
  { level: 7, getXPResult: 2100, getLevelResult: 7 },
  { level: 8, getXPResult: 2800, getLevelResult: 8 },
  { level: 9, getXPResult: 3600, getLevelResult: 9 },
  { level: 10, getXPResult: 4500, getLevelResult: 10 } ]
*/
