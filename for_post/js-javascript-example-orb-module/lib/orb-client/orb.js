var orbMod = (function (global) {

    // PUBLIC API
    var api = {};

    // fire the type of the orb
    var findType = function (orb) {
        var type = 'composite',
        i,
        binArr = ratio.isBinaryArray(orb.ratio),
        elCount = ratio.countNonZero(orb.ratio);
        if (binArr) {
            i = elCount - 1;
            if (i < 0) {
                type = 'null';
            }
            if (i >= 0) {
                type = ['pure', 'dual', 'tripple', 'quad'][i];
            }
        }
        return type;
    };

    // create from points
    api.createFromPoints = function (points) {
        points = points || [1, 0, 0, 0];
        var orb = {};
        orb.points = points;
        orb.ratio = ratio.getSimpleRatio(orb.points);
        orb.type = findType(orb);
        orb.data = {}; // user-data object

        // LEVEL, and INCREMENTAL
        // The level of the orb is the power of the simple ratio to the power of 2
        // the ratio.getLevel method should use if the points array is given along with the
        // base set to 2, the same method should also work to get the
        //  incremental by just setting base to 1
        orb.level = Math.floor(ratio.getLevel(orb.points, 2)) + 1;
        orb.incremental = ratio.getLevel(orb.points, 1);

        return orb
    };

    // create from ratio helper
    api.createFromRatio = function (r, n, base) {
        n = n === undefined ? 1 : n;
        base = base === undefined ? 1 : base;
        return api.createFromPoints(ratio.getRaisedRatio(r, n, base));
    };

    // create from a ratio and 1 relative level
    api.createFromLevel = function (r, level) {
        var simp = ratio.getSimpleRatio(r);
        return api.createFromRatio(simp, Math.pow(2, level - 1), 1);
    };

    // create from a collection of orbs made before hand
    api.createFromOrbs = function (orbCollection) {
        // just add up the points
        var points = orbCollection.map(function (orb) {
                return orb.points;
            }).reduce(function (acc, points) {
                return acc.map(function (el, i) {
                    return el + points[i];
                });
            });
        // and create a new orb with the sum of the points
        return api.createFromPoints(points);
    };

    return api;

}
    (this));
