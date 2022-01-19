var pointMod = (function(){

    var api = {};

    // create box method
    api.createBox = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, w: 50, h: 50
        });
        // push points
        var points = [[]],
        i = 0,
        len = 2 * 4,
        hw = opt.w / 2,
        hh = opt.h / 2;
        while(i < len){
            var pi = Math.floor(i / 2),
            yi = Math.floor(pi / 2),
            y = (opt.y - hh) + yi * opt.h,
            x = (opt.x - hw) + ( yi === 0 ? pi % 2 : 1 - pi % 2 ) * opt.w;
            points[0].push(x, y);
            i += 2;
        }
        // return box points
        return points;
    };

    // return the public api
    return api;

}());
