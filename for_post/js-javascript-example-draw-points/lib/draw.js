var draw = {};

draw.background = function(ctx, canvas, style){
    ctx.fillStyle = style || 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
