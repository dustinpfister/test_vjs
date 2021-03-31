var draw = (function () {

    var api = {};

    // plain background method
    api.background = function (ctx, canvas, style) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw object pool
    var drawPool = function (ctx, pool, globalDraw) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                if (obj.data.draw) {
                    obj.data.draw(ctx, obj, i);
                } else {
                    globalDraw(ctx, obj, i);
                }
                ctx.restore();
            }
        }
    };

    var globalDraw = {
        basic: function (ctx, obj, i) {
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.translate(obj.x, obj.y);
            ctx.beginPath();
            ctx.rect(0, 0, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // basic draw pool method with a solid background fallback if there is
    // draw method in an disp objects data object
    api.pool = function (ctx, pool) {
        drawPool(ctx, pool, globalDraw.basic);
    };

    return api;

}
    ());
