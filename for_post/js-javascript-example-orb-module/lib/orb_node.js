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
        return orb
    };

    // EXPORT/RETURN PUBLIC API
    // if nodejs, export ratio
    if (!isBrowser()) {
         module.exports = api;
    }
    return api;

}
    (this));

