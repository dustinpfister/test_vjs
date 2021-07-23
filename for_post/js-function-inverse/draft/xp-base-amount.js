// I have the level, I want xp
var parseByLevel = function (level) {
    if (level < 1) {
        return 1000 * level;
    }
    return 1000 + Math.pow(2, level);
};
// I have xp I want level
var parseByXp = function (xp) {
    if (xp <= 1000) {
        return 0;
    }
    return Math.log(xp - 1000) / Math.log(2);
};

var xp = parseByLevel(1);
console.log(xp);

var level = parseByXp(xp);
console.log(level);
