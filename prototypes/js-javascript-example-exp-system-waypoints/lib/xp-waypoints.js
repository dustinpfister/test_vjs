(function (api) {

    // get the top level cap base on wayPoints array
    var getCap = function (xpObj) {
        return Math.max.apply(null, xpObj.wayPoints.map(function (wp) {
                return wp.levelCap;
            }));
    };

    // get the p value used to find xp values for each level
    var getPValue = function (xpObj, i) {
        var p = 0, //xpObj.wayPoints[i].expPowDelta,
        wpIndex = 0,
        levelCap = 0,
        len = xpObj.wayPoints.length;
        while (wpIndex < len) {
            if (i <= xpObj.wayPoints[wpIndex].levelCap) {
                return xpObj.wayPoints[wpIndex].expPowDelta;
            }
            wpIndex += 1;
        }
        return 0;
    };

    // create and return a level table for the given xpObj
    var createLevelTable = function (xpObj) {
        var cap = getCap(xpObj),
        table = [],
        i = 0,
        p;
        while (i < cap) {
            p = getPValue(xpObj, i);
            table.push({
                i: i,
                p: p,
                xpNeeded: Math.pow(xpObj.expBase, p * i)
            });
            i += 1;
        }
        return table;
    };

    var parseBy = {
        xp: function (xpObj) {},
        level: function (xpObj) {}
    }

    // create a new xpObj
    api.create = function (opt) {
        opt = opt || {};
        opt.xp = opt.xp || 0;
        opt.level = opt.level || 0;
        opt.parseBy = opt.parseBy || 'xp';
        opt.wayPoints = opt.wayPoints || [{
                    levelCap: 5,
                    expPowDelta: 1
                }, {
                    levelCap: 10,
                    expPowDelta: 1.125
                }
            ];
        // starting xpObj
        var xpObj = {
            xp: opt.xp === undefined ? 0 : opt.xp,
            level: opt.level === undefined ? 0 : opt.level,
            table: [],
            expBase: opt.expBase === undefined ? 2 : opt.expBase,
            wayPoints: opt.wayPoints
        };
        // create table
        xpObj.table = createLevelTable(xpObj);
        return xpObj;
    };

}
    (this['XPWP'] = {}));
