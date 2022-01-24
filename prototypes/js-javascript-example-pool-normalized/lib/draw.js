var draw = (function(){
    // hard settings
    var BACKGROUND_COLOR = 'gray',
    LINE_WIDTH = 3,
    STROKE_STYLE = 'black',
    FILL_STYLE = 'white',
    TEXT_COLOR = 'yellow';
    // draw disp
    var drawDisp = function(sm, disp, ctx, canvas){
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
            ctx.fillStyle = FILL_STYLE;
            ctx.arc(disp.x, disp.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
    // PUBLIC API METHODS
    var api = {};
    // draw the background
    api.background = function (sm, ctx, canvas) {
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };
    // draw the pool
    api.pool = function (sm, pool, ctx, canvas) {
        ctx.lineWidth = LINE_WIDTH;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || FILL_STYLE;
            ctx.strokeStyle = obj.data.strokeStyle || STROKE_STYLE;
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            drawDisp(sm, obj, ctx, canvas);
        });
        ctx.globalAlpha = 1;
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + poolMod.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
