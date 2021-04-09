var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var drawUnit = {
    none: function(ctx, unit){
        ctx.save();
        ctx.translate(unit.x, unit.y);
        // draw base area
        ctx.fillStyle = 'lime';
        ctx.fillRect(0, 0, unit.w, unit.h);
        ctx.restore();
    },
    turret: function(ctx, turret){
        ctx.save();
        ctx.translate(turret.x, turret.y);
        // draw base area
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, turret.w, turret.h);
        ctx.translate(turret.w / 2, turret.h / 2);
        ctx.rotate(turret.data.facing);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.fillRect(-8, -8, 16, 16);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(turret.w, 0);
        ctx.stroke();
        ctx.restore();
    }
};

draw.player_units = function(ctx, game){
   game.player_units.forEach(function(unit){
       drawUnit[unit.data.unitType](ctx, unit)
   });
};

draw.shots = function (ctx, game) {
    var shots = game.shots;
    shots.forEach(function (shot) {
        if (shot.active) {
            ctx.save()
            ctx.fillStyle = 'white';
            ctx.translate(shot.x, shot.y);
            ctx.fillRect(0, 0, shot.w, shot.h);
            ctx.restore();
        }
    });
};
