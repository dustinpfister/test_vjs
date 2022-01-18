var draw = (function(){

    var api = {};

    // draw a background
    api.background = function(ctx, canvas, style){
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };

    return api;

}());
