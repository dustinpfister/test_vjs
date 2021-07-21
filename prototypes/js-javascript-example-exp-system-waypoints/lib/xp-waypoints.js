(function (api) {

    api.create = function (opt) {
        opt = opt || {};
        opt.xp = opt.xp || 0;
        opt.level = opt.level || 0;
        opt.parseBy = opt.parseBy || 'xp';
        opt.wayPoints = opt.wayPoints || [
            {levelCap: 5, expPowDelta: 1},
            {levelCap: 10, expPowDelta: 0.25}
        ];
        var xpObj = {
            xp: 0,
            level: 0,
            expBase: opt.expBase === undefined ? 2 : opt.expBase,
            wayPoints: opt.wayPoints
        };
        return xpObj;
    };

    var getCap = function(xpObj){
        return Math.max.apply(null, xpObj.wayPoints.map(function(wp){
            return wp.levelCap;
        }));
    };

    // create and return a level table for the given xpObj
    api.createLevelTable = function(xpObj){
        var cap = getCap(xpObj),
        table = [],
        i = 0,
        p = xpObj.wayPoints[0].expPowDelta;
        while(i < cap){
            table.push({
                i: i,
                xpNeeded: Math.pow(xpObj.expBase, p * i)
            });
            i += 1;
        }
        return table;
    };

}
    (this['XPWP'] = {}));
