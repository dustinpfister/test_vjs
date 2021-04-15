(function(api){

    api.back = function(ctx, canvas){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };


}(this['draw'] = {}));