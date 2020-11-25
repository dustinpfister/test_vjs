var XP = (function () {

    var DEFAULTS = {
        level: 1,
        xp: 0,
        xpCap: 100000,
        cap: 100
    };
/*
    var parseByXP = function (xp, cap) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;

        return {
            level: level,
            levelFrac: l,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast
        };
    };
*/

    var parseByXP = function (xp, cap) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;

        return {
        };
    };

    return {
		/*
        parseByLevel: function (l, cap, deltaNext) {
            l = l === undefined ? DEFAULTS.level : l;
            deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
            var xp = getXPtoLevel(l, deltaNext);
            console.log(xp);
            return parseByXP(xp, cap);
        },
		*/
        parseByXP: parseByXP
    };
}
    ());
