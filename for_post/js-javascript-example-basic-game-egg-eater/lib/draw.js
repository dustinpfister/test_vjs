(function(api){

    // draw background
    api.back = function(ctx, canvas){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw display object
    api.disp = function(ctx, canvas, disp){
        ctx.fillStyle = disp.fill || 'white';
        ctx.fillRect(disp.x, disp.y, disp.w, disp.h);
    };

    api.pool = function(ctx, canvas, pool){
        pool.disp.forEach(function(disp){
            if(disp.active){
                api.disp(ctx, canvas, disp);
            }
        });
    };

}(this['draw'] = {}));