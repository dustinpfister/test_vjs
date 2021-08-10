// draw module
var draw = {};
// draw background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw a single orb
draw.orb = function (sm, ctx, canvas, orb, fillStyle) {
    ctx.fillStyle = fillStyle || 'white';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};
// draw slot areas
draw.slotAreas = function (sm, ctx, canvas) {
    ['player', 'ai'].forEach(function (faction) {
        var slots = sm.game[faction].slots;
        slots.orbs.forEach(function (orb) {
            var r = orb.radius;
            ctx.fillStyle = 'brown';
            if (faction === 'player' && sm.game.currentState === 'playerTurnOrbMenu' && orb.type === 'null') {
                ctx.fillStyle = sm.game.playerSlotFillStyle.color || 'gray';
            }
            ctx.fillRect(orb.data.homeX - r, orb.data.homeY - r, r * 2, r * 2);
        });
    });
};

// draw orbCollection
draw.orbCollection = function (sm, ctx, canvas, pouch) {
    pouch.orbs.forEach(function (orb) {
        if (orb.type != 'null') {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        } else {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb, 'rgba(255,0,0,0.2)');
        }
    });
};
// draw info of a single given orb
draw.orbInfo = function (sm, ctx, canvas, orb) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('level: ' + orb.level, 10, 20);
    ctx.fillText('points: ' + orb.points.join(','), 10, 30);
    ctx.fillText('ratio: ' + orb.ratio.join(','), 10, 40);
};
