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
        // utils should be in same folder as orb_node
        var path = require('path');
        var utils = require(path.join(__dirname, 'utils.js'));
    }

    // PUBLIC API
    var api = {};

    api.findType = function(orb){
        var type = 'composite';


        return type;
    };

    // create from points
    api.createFromPoints = function(points){
        points = points || [1,0,0,0];
        var orb = {};
        orb.points = points;
        orb.ratio = utils.getSimpleRatio(orb.points);
        return orb
    };

    // EXPORT/RETURN PUBLIC API
    // if nodejs, export utils
    if (!isBrowser()) {
         module.exports = api;
    }
    return api;

}
    (this));

