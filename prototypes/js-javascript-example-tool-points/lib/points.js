var pointMod = (function(){

    var api = {};

// create box method
api.createBox = function(opt){
    // parse options
    opt = utils.defaults(opt, {
        x: 0, y: 0, w: 50, h: 50
    });
    var points = [[]],
    i = 0,
    len = 4,
    hw = opt.w / 2,
    hh = opt.h / 2;
    // push points
    while(i < len){
        var pi = Math.floor(i / 2),
        x = (opt.x - hw) + pi % 2 * opt.w,
        y = (opt.y - hh) + Math.floor(pi / 2) * opt.h;
        points[0].push(x, y);
        i += 2;
    }
    // return box points
    return points;
};


    // return the public api
    return api;

}());
