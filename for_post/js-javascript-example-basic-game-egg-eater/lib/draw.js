(function(api){

    // draw background
    api.back = function(ctx, canvas){
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw display object
    api.disp = function(ctx, canvas, disp){
        ctx.fillStyle = disp.fill || 'white';
        ctx.fillRect(disp.x, disp.y, disp.w, disp.h);
    };

    // draw object pool
    api.pool = function(ctx, canvas, pool){
        pool.disp.forEach(function(disp){
            if(disp.active){
                api.disp(ctx, canvas, disp);
            }
        });
    };

    // info
    api.info = function(ctx, canvas, game){
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText('score: ' + game.score, 10, 10);
    };  

}(this['draw'] = {}));