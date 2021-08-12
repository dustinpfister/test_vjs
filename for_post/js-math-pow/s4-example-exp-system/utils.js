var utils = {};

utils.XP = (function () {
    // set level with given xp
    var set = function (xp) {
        //return Math.sqrt(xp);
        return (1 + Math.sqrt(1 + 8 * xp / 50)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var XPto = function (level) {
        //return Math.pow(level, 2);
        return ((Math.pow(level, 2) - level) * 50) / 2;
    };
    var parseByXP = function (xp, cap) {
        var l = set(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = XPto(level + 1);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap) {
            return parseByXP(XPto(l, cap));
        },
        parseByXP: parseByXP
    };
}
    ());