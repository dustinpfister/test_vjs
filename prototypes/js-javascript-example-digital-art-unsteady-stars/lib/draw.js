var draw = (function(){
    // HELPERS
    var createBackground = function(ctx, canvas, opt){
        // options
        opt = opt || {};
        opt.angle = opt.angle === undefined ? Math.PI * 0.25: opt.angle;
        opt.radius = opt.radius === undefined ? 150 : opt.radius;
        // create locals
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        dx = Math.cos(opt.angle) * opt.radius,
        dy = Math.sin(opt.angle) * opt.radius,
        sx = cx - dx,
        sy = cy - dy,
        ex = cx + dx,
        ey = cy + dy;
        // create gradient
        var gradient = ctx.createLinearGradient(sx, sy, ex, ey);
        // Add color stops
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');
        // return gradiant
        return gradient;
    };
    // draw direction helper
    var strokeDirHelper = function(ctx, obj, dir, radiusBegin, radiusEnd){
        radiusBegin = radiusBegin === undefined ? obj.r2 : radiusBegin;
        radiusEnd = radiusEnd === undefined ? obj.r1 : radiusEnd;
        ctx.beginPath();
        ctx.moveTo(
            obj.x + Math.cos(dir) * radiusBegin, 
            obj.y + Math.sin(dir) * radiusBegin);
        ctx.lineTo(
            obj.x + Math.cos(dir) * radiusEnd,
            obj.y + Math.sin(dir) * radiusEnd);
        ctx.stroke();
    };
    // draw star info
    var drawStarInfo = function(ctx, obj){
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('pos: ' + Math.floor(obj.x) + ', ' + Math.floor(obj.y), obj.x + 10, obj.y + 10);
        ctx.fillText('pps: ' + Math.floor(obj.pps), obj.x + 10, obj.y + 20);
        ctx.fillText('heading: ' + utils.radianToDegree(obj.heading), obj.x + 10, obj.y + 30);
        ctx.fillText('facing: ' + utils.radianToDegree(obj.facing), obj.x + 10, obj.y + 40);
    };
    // PUBLIC API METHODS
    var api = {};
    // draw the background
    api.background = function (sm, ctx, canvas) {
        var bg = createBackground(ctx, canvas, sm.background);
        ctx.fillStyle = bg;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };
    // draw the pool
    api.pool = function (game, ctx, canvas) {
        var pool = game.units;
        ctx.lineWidth = 3;	
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || 'white';
            ctx.strokeStyle = obj.data.strokeStyle || 'black';
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            // if the object is active
            if (obj.active) {
                // draw base area
                var cx = obj.x + obj.w / 2,
                cy = obj.y + obj.h / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                // draw any points
                var points = obj.data.points || null;
                if(points){
                    ctx.save();
                    ctx.translate(cx, cy);
                    api.points(ctx, points);
                    ctx.restore();
                }
            }
        });
        ctx.globalAlpha = 1;
    };
    // draw a star
    api.star = function(ctx, obj, state){
        ctx.lineWidth = 6;
        ctx.globalAlpha = obj.alpha;
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        // new draw points method works greate with new star.create1 and star.create2 (0.3.0+)
        api.points(ctx, obj.points, 0, 0);
        ctx.restore();
        // draw dir lines for heading and facing
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        strokeDirHelper(ctx, obj, obj.heading, obj.r1 * 0.5, obj.r1);
        strokeDirHelper(ctx, obj, obj.facing, 0, obj.r1 * 0.5);
        ctx.globalAlpha = 1;
        if(state.selected){
            drawStarInfo(ctx, state.selected);
        }
    };
    // new draw points
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
    // draw version number
    api.info = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        //ctx.fillText('active count: ' + sm.game.activeCount, 10, 10);
        //ctx.fillText('total mass: ' + sm.game.totalMass, 10, 20);
        //ctx.fillText('splitDelay: ' + sm.game.splitDelay, 10, 30);
        var dInfo = sm.game.debugInfo;
        if(dInfo){
            ctx.fillText( dInfo.key + ' : ' + dInfo.value, 10, 10);
        }
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
