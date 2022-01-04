var draw = (function(){
    // HELPERS
    var createBackground = function(ctx, canvas){
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        // Add color stops
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.2, 'orange');
        gradient.addColorStop(0.4, 'yellow');
        gradient.addColorStop(0.6, 'blue');
        gradient.addColorStop(0.8, 'cyan');
        gradient.addColorStop(1, 'lime');
        return gradient;
    };
    // PUBLIC API METHODS
    var api = {};
    // draw the background
    api.background = function (ctx, canvas) {
        var bg = createBackground(ctx, canvas);
        ctx.fillStyle = bg;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };
    // draw the pool
    api.pool = function (game, ctx, canvas) {
        var pool = game.units;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || 'white';
            ctx.strokeStyle = obj.data.strokeStyle || 'black';
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            if (obj.active) {
                var cx = obj.x + obj.w / 2,
                cy = obj.y + obj.h / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;
    };
    // draw version number
    api.info = function (sm, ctx, canvas) {
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        ctx.fillText('active count: ' + sm.game.activeCount, 10, 10);
        ctx.fillText('total mass: ' + sm.game.totalMass, 10, 20);
        ctx.fillText('splitDelay: ' + sm.game.splitDelay, 10, 30);
        var dInfo = sm.game.debugInfo;
        if(dInfo){
            ctx.fillText( dInfo.key + ' : ' + dInfo.value, 10, 40);
        }
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
