var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.map = function(ctx, map){
   map.objects.forEach(function(obj){
       ctx.fillStyle = 'lime';
       ctx.beginPath();
       ctx.arc(obj.x, obj.y, obj.r, 0, utils.pi2);
       ctx.fill();
   });
};

draw.turret = function (ctx, game) {
    var turret = game.turret;
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

draw.shots = function (ctx, game) {
    var shots = game.shots;
    shots.forEach(function (shot) {
        if (shot.active) {
            ctx.save()
            ctx.fillStyle = 'white';
            ctx.translate(shot.x, shot.y);
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();
        }
    });
};
