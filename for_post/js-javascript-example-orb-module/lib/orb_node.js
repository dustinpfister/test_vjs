var orbMod = (function (global) {

    // LOAD UTILS if NODE
    var isBrowser = (function(global){
        return function () {
            try {
                return global === window;
            } catch (e) {
                return false;
            }
        };
    }(global));
    if(!isBrowser()){
        // ratio should be in same folder as orb_node
        var path = require('path');
        var ratio = require(path.join(__dirname, 'ratio.js'));
    }

    // PUBLIC API
    var api = {};

    // fire the type of the orb
    var findType = function(orb){
        var type = 'composite',
        binArr = ratio.isBinaryArray(orb.ratio),
        elCount = ratio.countNonZero(orb.ratio);
        if(binArr){
           type = ['pure', 'dual', 'tripple', 'quad'][elCount - 1];
        }
        return type;
    };

    // create from points
    api.createFromPoints = function(points){
        points = points || [1,0,0,0];
        var orb = {};
        orb.points = points;
        orb.ratio = ratio.getSimpleRatio(orb.points);
        orb.type = findType(orb);

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
    api.createFromRatio = function(r, n, base){
        n = n || 1;
        base = base || 1;
        return api.createFromPoints(ratio.getRaisedRatio(r, n, base));
    };

    // create from a ratio and 1 relative level
    api.createFromLevel = function(r, level){
        var simp = ratio.getSimpleRatio(r),
        return createFromRatio(r, level || 1, 2);
    };

    // create from a collection of orbs made before hand
    api.createFromOrbs = function(orbCollection){
        // just add up the points
        var points = orbCollection.map(function(orb){
            return orb.points;
        }).reduce(function(acc, points){
            return acc.map(function(el, i){
                return el + points[i];
            });
        });
        // and create a new orb with the sum of the points
        return api.createFromPoints(points);
    };

    // EXPORT/RETURN PUBLIC API
    // if nodejs, export ratio
    if (!isBrowser()) {
         module.exports = api;
    }
    return api;

}
    (this));

