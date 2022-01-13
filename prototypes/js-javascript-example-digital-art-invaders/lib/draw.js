var draw = (function(){
    var DEFAULT_LINE_WIDTH = 3,
    DEFAULT_STROKE_STYLE = 'black',
    DEFAULT_FILL_STYLE = 'white',
    DEFAULT_TEXT_COLOR = 'yellow',
    DEFAULT_COLOR_STOPS = [
       [0, 'black'],
       [1, 'white']
    ];
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
        var colorStops = opt.colorStops || DEFAULT_COLOR_STOPS;
        colorStops.forEach(function(colorStop){
            gradient.addColorStop(colorStop[0], colorStop[1]);
        });
        // return gradiant
        return gradient;
    };
    var drawDisp = function(sm, disp, ctx, canvas){
        var hpPer = 0,
        dDat = disp.data;
        // if the object is active
        if (disp.active) {
            // draw base area as recr
            ctx.beginPath();
            ctx.rect(disp.x - disp.w / 2, disp.y - disp.h / 2, disp.w, disp.h);
            ctx.fill();
            ctx.stroke();
            // draw base area as circle
            ctx.beginPath();
            ctx.arc(disp.x, disp.y, (disp.w + disp.h) / 2 / 2, 0, utils.PI2);
            ctx.fill();
            ctx.stroke();
            // draw small circle over obj.x, obj.y
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(disp.x, disp.y, 2, 0, Math.PI * 2);
            ctx.fill();
            // hp bar
            if(dDat.hp != undefined){
               var x = disp.x - disp.w / 2,
               y = disp.y - disp.h / 2;
               hpPer = 1; //dDat.hp / dDat.hpMax;
               ctx.fillStyle = 'lime';
               ctx.fillRect(x, y, disp.w * hpPer, disp.h * 0.15 );
            }
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
    api.pool = function (sm, pool, ctx, canvas) {
        //var pool = game.units;
        ctx.lineWidth = DEFAULT_LINE_WIDTH;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || DEFAULT_FILL_STYLE;
            ctx.strokeStyle = obj.data.strokeStyle || DEFAULT_STROKE_STYLE;
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            drawDisp(sm, obj, ctx, canvas);
        });
        ctx.globalAlpha = 1;
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
