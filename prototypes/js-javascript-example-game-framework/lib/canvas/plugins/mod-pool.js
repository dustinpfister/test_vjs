canvasMod.load({
    drawMethods : [
        // basic draw a pool method
        {
            name: 'pool',
            method: function(stack, ctx, canvas, layerObj, pool, opt){
                opt = opt || {}
                pool.objects.forEach(function(obj){
                    ctx.fillStyle = opt.fillStyle || obj.data.fillStyle || 'white';
                    ctx.strokeStyle = opt.strokeStyle || obj.data.strokeStyle || 'black';
                    if(obj.active || opt.drawAll){
                        ctx.beginPath();
                        ctx.rect(obj.x, obj.y, obj.w, obj.h);
                        ctx.fill();
                        ctx.stroke();
                    }
                });
            }
        }
    ]
});