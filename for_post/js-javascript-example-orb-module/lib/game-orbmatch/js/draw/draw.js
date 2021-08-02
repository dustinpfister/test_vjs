// draw module
var draw = {};
// draw background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw a single orb
draw.orb = function(sm, ctx, canvas, orb){
   ctx.fillStyle = 'white';
   ctx.strokeStyle = 'black';
   ctx.arc(orb.cx, orb.cy, orb.radius, 0, Math.PI * 2);
   ctx.fill();
   ctx.stroke();
};

// draw info of a single given orb
draw.orbInfo = function (sm, ctx, canvas, orb) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('level: ' + orb.level, 10, 20);
    ctx.fillText('points: ' + orb.points.join(','), 10, 30);
    ctx.fillText('ratio: ' + orb.ratio.join(','), 10, 40);
};
