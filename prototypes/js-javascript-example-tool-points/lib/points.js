var pointMod = (function(){

    var api = {};

    // create box method
    api.createBox = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, w: 50, h: 50, fill: 'white', stroke: 'black', lineWidth: 6
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
        // push style opttions for the line
        points[0].push('fill:' + opt.fill);
        points[0].push('stroke:' + opt.stroke);
        points[0].push('lineWidth:' + opt.lineWidth);
        // return box points
        return points;
    };

    // create ellipse
    api.createEllipse = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, r1: 160 * 1.5, r2:120 * 1.5, points: 30, fill: 'white', stroke: 'black', lineWidth: 6
        });
        // push points
        var points = [[]],
        i = 0,
        len = opt.points * 2,
        radianStart = Math.PI / 180 * 45;
        while(i < len){
            var radian = radianStart + Math.PI * 2 / opt.points * (i / 2),
            x = opt.x + Math.cos(radian) * opt.r1,
            y = opt.y + Math.sin(radian) * opt.r2;
            points[0].push(x, y);
            i += 2;
        }
        // push style options for the line
        points[0].push('fill:' + opt.fill);
        points[0].push('stroke:' + opt.stroke);
        points[0].push('lineWidth:' + opt.lineWidth);
        points[0].push('close:true');
        // return ellipse points
        return points;        

    };


    // return a new points object that is numbers only
    api.numbersOnly = function(points){
        return points.map(function(line){
            return line.filter(function(el){
                return typeof el === 'number';
            });
        });
    };

    api.newChunked = function(points){
        var nPoints = pointMod.numbersOnly( points );
        return nPoints.map(function(line){
            return utils.chunk( line, 2 );
        });
    };

    // translate a single point with the given points object along with line and point index values
    // by the given set of deltas
    api.translatePT = function(points, lineIndex, ptIndex, dx, dy){
        var line = points[lineIndex],
        i = ptIndex * 2;
        line[i] += dx;
        line[i + 1] += dy;
    };

    // translate points
    api.translatePoints = function(points, dx, dy){
        points.forEach(function(line){
            line.forEach(function(el, i){
                if(typeof el === 'number'){
                    if(i % 2 === 0){
                       el += dx;
                    }else{
                       el += dy;
                    }
                    line[i] = Math.round(el);
                }
            });
        });
    };

    // return the public api
    return api;

}());
