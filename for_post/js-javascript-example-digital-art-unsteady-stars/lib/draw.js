var draw = (function(){

    var DEFAULT_LINE_WIDTH = 6,
    DEFAULT_STROKE_STYLE = 'black',
    DEFAULT_FILL_STYLE = 'white',
    DEFAULT_TEXT_COLOR = 'black';

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
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.4, 'red');
        gradient.addColorStop(0.5, 'green');
        gradient.addColorStop(0.6, 'blue');
        gradient.addColorStop(1, 'white');
        // return gradiant
        return gradient;
    };
    // draw points
    var drawPoints = function(obj, ctx, canvas){
        var points = obj.data.points || null,
        cx = obj.x + obj.w / 2,
        cy = obj.y + obj.h / 2;
        if(points){
            api.points(ctx, points, cx, cy, obj.data.pointsOpt);
        }
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
        ctx.lineWidth = DEFAULT_LINE_WIDTH;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || DEFAULT_FILL_STYLE;
            ctx.strokeStyle = obj.data.strokeStyle || DEFAULT_STROKE_STYLE;
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
                drawPoints(obj, ctx, canvas);
            }
        });
        ctx.globalAlpha = 1;
    };
    // new draw points
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? DEFAULT_FILL_STYLE : opt.fill,
            stroke = opt.stroke === undefined ? DEFAULT_STROKE_STYLE : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? DEFAULT_LINE_WIDTH : opt.lineWidth,
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
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        var dInfo = sm.game.debugInfo;
        if(dInfo){
            ctx.fillText( dInfo.key + ' : ' + dInfo.value, 10, 10);
        }
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
