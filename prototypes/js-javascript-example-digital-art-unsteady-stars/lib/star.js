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
/*
    var uStarDeltas = function(uStar){
        // deltas for each point
        var deltas = [[]];
        utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = 1,
            radian = Math.PI * 2 * Math.random(),
            radius = 5,
            // new position for each point
            //x = pos[0] + Math.cos(radian) * radius,
            //y = pos[1] + Math.sin(radian) * radius;
            // an array of deltas for each point
            x = Math.cos(radian) * radius,
            y = Math.sin(radian) * radius;
            // start points at points.homePoints locations
            deltas[0][i * 2] = x;
            deltas[0][i * 2 + 1] = y;
        });
        return deltas;
    };
*/
    var getNewPositions = function(uStar){
        // deltas for each point
        var deltas = [[]];
        utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = 1,
            radian = Math.PI * 2 * Math.random(),
            radius = 2,
            // new position for each point
            x = pos[0] + Math.cos(radian) * radius,
            y = pos[1] + Math.sin(radian) * radius;
            // start points at points.homePoints locations
            deltas[0][i * 2] = x;
            deltas[0][i * 2 + 1] = y;
        });
        return deltas;
    };

    // unsteady star objects
    api.unsteady = function(opt){
        opt = opt || {};
        var uStar = [[]];
        uStar.homePoints = api.create1(opt);
        // deltas for each point
        //uStar.deltas = uStarDeltas(uStar);

        // old positions start out at home positions for now
        uStar.oldPositions = uStar.homePoints;
        // get first set of new positions
        uStar.newPositions = getNewPositions(uStar);

        uStar.frame = opt.frame === undefined ? 0 : opt.frame;
        uStar.maxFrame = opt.maxFrame === undefined ? 30 : opt.maxFrame;
        uStar.fps = 30;

        // call update for first time, with 0 secs of time to just set things up
        api.unsteady.update(uStar, 0);
        // return the uStar
        return uStar;
    };
    // create is a ref to the main starMod.unsteady method
    api.unsteady.create = api.upsteady;
/*
    // update an unsteady star created with starMod.unsteady.create
    api.unsteady.update = function(uStar, secs){
        // steap frame
        uStar.frame += uStar.fps * secs;
        uStar.frame = uStar.frame > uStar.maxFrame ? uStar.maxFrame : uStar.frame;
        var perDone = uStar.frame / uStar.maxFrame; 
        // for each delta
        var deltas = utils.chunk(uStar.deltas[0], 2);
        utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = i,
            x = pos[0] + deltas[i][0] * perDone,
            y = pos[1] + deltas[i][1] * perDone;
            // set current x and y values for uStar
            uStar[0][vIndex * 2] = x;
            uStar[0][vIndex * 2 + 1] = y;
        });
        if(uStar.frame === uStar.maxFrame){
            uStar.deltas = uStarDeltas(uStar);
            uStar.frame = 0;
        }
    };
*/

    // update an unsteady star created with starMod.unsteady.create
    api.unsteady.update = function(uStar, secs){
        // steap frame
        uStar.frame += uStar.fps * secs;
        uStar.frame = uStar.frame > uStar.maxFrame ? uStar.maxFrame : uStar.frame;
        var perDone = uStar.frame / uStar.maxFrame; 
        // for each delta
        //var deltas = utils.chunk(uStar.deltas[0], 2);
        var newPos = utils.chunk(uStar.newPositions[0], 2);
        //utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
utils.chunk(uStar.oldPositions[0], 2).forEach(function(pos, i){
            var vIndex = i,

            // start and end positons
            sx = pos[0],
            sy = pos[1],
            ex = newPos[i][0],
            ey = newPos[i][1],

            a = Math.atan2(ey - sy, ex - sx),
            d = utils.distance(sx, sy, ex, ey),


            dx = Math.cos(a) * d,
            dy = Math.sin(a) * d,

            //dx = sx - ex,
            //dy = sy - ey,

            x = sx + dx * perDone,
            y = sy + dy * perDone;
            

            //x = pos[0] + deltas[i][0] * perDone,
            //y = pos[1] + deltas[i][1] * perDone;
            //x = pos[0] + newPos[i][0] * perDone,
            //y = pos[1] + newPos[i][1] * perDone;
            // set current x and y values for uStar
            uStar[0][vIndex * 2] = x;
            uStar[0][vIndex * 2 + 1] = y;
        });
        if(uStar.frame === uStar.maxFrame){
            //uStar.deltas = uStarDeltas(uStar);
            uStar.frame = 0;
uStar.oldPositions = uStar.newPositions;
uStar.newPositions = getNewPositions(uStar);
        }
    };

    // return the public api
    return api;
}
    ());