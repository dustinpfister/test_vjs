// clear
var draw = {};

draw.background = function (ctx, canvas) {
    // fill black
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.state = function (ctx, canvas, state) {
    // fill black
    ctx.fillStyle = 'cyan';
    ctx.strokeStyle = 'white';
    var obj = state.obj;
    ctx.save();
    ctx.translate(obj.cx, obj.cy);
    ctx.rotate(obj.r);
    ctx.beginPath();
    ctx.rect(obj.size / 2 * -1, obj.size / 2 * -1, obj.size, obj.size);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

// debug pinch
draw.debugPinch = function (ctx, canvas, pinch) {
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.fillText('multi: ' + pinch.multi.toFixed(2), 10, 10);
    ctx.fillText('radian: ' + pinch.radian.toFixed(2), 10, 25);
    // draw points
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'lime';
    Object.keys(pinch.points).forEach(function (ptKey) {
        var pt = pinch.points[ptKey];
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
};
