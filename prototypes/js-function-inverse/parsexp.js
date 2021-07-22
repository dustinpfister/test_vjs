// I have the level, I want xp

var parseByLevel = function (level) {
    //return 1000 + 50 * level + Math.pow(2, level);
    return Math.pow(2, level);
};

var parseByXp = function (xp) {
    return Math.log(xp) / Math.log(2);
};

var xp = parseByLevel(10);
console.log(xp);

var level = parseByXp(xp);
console.log(level);
