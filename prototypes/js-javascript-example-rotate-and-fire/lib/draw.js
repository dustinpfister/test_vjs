var draw = {};

draw.back = function(ctx, canvas){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.turret = function(ctx, state){
    var turret = state.turret;
    ctx.save();
    ctx.translate(turret.x, turret.y);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(turret.w * 0.5 * -1, turret.h * 0.5 * -1, turret.w, turret.h);
    ctx.rotate(turret.facing);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.fillRect(turret.w * 0.3 * -1, turret.h * 0.3 * -1, turret.w * 0.6, turret.h * 0.6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(turret.w, 0);
    ctx.stroke();
    ctx.restore();
};
