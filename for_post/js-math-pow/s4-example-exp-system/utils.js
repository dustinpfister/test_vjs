var utils = {};

utils.XP = (function () {
    // get level with given xp
    var getLevel = function (xp) {
        return (1 + Math.sqrt(1 + 8 * xp / 50)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level) {
        return ((Math.pow(level, 2) - level) * 50) / 2;
    };
    var parseByXP = function (xp, cap) {
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap) {
            return parseByXP(getXP(l, cap));
        },
        parseByXP: parseByXP
    };
}
    ());

// seems to work okay
var a = utils.XP.parseByLevel(10, 100);
var b = utils.XP.parseByXP(a.xp + 0, 100);
console.log(a); // { level: 10, levelFrac: 10, xp: 2250, forNext: 2750, toNext: 500 }
console.log(b); // { level: 10, levelFrac: 10, xp: 2250, forNext: 2750, toNext: 500 }
