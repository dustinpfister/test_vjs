var starMod = (function () {
/********* **********
   HELPERS
********** *********/
    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };
    // parse options
    var parseOptions = function (opt) {
        opt = opt || {};
        opt.pointCount = opt.pointCount || 5;
        opt.radius = opt.radius === undefined ? 50 : opt.radius;
        opt.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        opt.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        opt.ox = opt.ox || 0;
        opt.oy = opt.oy || 0;
        opt.pointSkip = opt.pointSkip || 2;
        return opt;
    };
/********* **********
   PUBLIC METHODS
********** *********/
    var api = {};
    // create a star points array by pointCount, and inner and outer radius
    api.create1 = function (opt) {
        opt = parseOptions(opt);
        var i = 0,
        pt,
        r,
        rd = Math.PI * 2 / opt.pointCount,
        points = [];
        while (i < opt.pointCount) {
            pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
            points.push(pt.x, pt.y);
            pt = getPoint(rd * i + rd / 2 + opt.radianAjust, opt.radiusInner, opt.ox, opt.oy);
            points.push(pt.x, pt.y);
            i += 1;
        }
        return [points];
    };
    // create a star by point count radius and point skip
    api.create2 = function (opt) {
        opt = parseOptions(opt);
        var i = 0,
        pt,
        r,
        rd = Math.PI * 2 / opt.pointCount * opt.pointSkip,
        even = opt.pointCount % 2 === 0 ? true: false;
        var points = [[]];
        if(even){
            points = [[],[]];
        }
        while (i < opt.pointCount) {
            pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
            points[0].push(pt.x, pt.y);
            if(even){
                var a = Math.PI * 2 / opt.pointCount
                pt = getPoint(rd * i + a + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points[1].push(pt.x, pt.y);
            }
            i += 1;
        }
        return points;
    };
    // unsteady star objects
    api.unsteady = function(opt){
        var points = [[]];
        points.homePoints = api.create1(opt);
        // deltas for each point
        points.deltas = [];
        utils.chunk(points.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = 1,
            x = pos[0],
            y = pos[1];
            // start points at points.homePoints locations
            //points[0][i * 2] = x;
            //points[0][i * 2 + 1] = y;
            console.log(i, x, y);
        });
        // call update for first time, with 0 secs of time to just set things up
        api.unsteady.update(points, 0);
        // return the uStar
        return points;

    };
    // create is a ref to the main starMod.unsteady method
    api.unsteady.create = api.upsteady;
    // update an unsteady star created with starMod.unsteady.create
    api.unsteady.update = function(uStar, secs){
        
        utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = 1,
            x = pos[0],
            y = pos[1];
            uStar[0][i * 2] = x;
            uStar[0][i * 2 + 1] = y;
        });

    };


    // return the public api
    return api;
}
    ());