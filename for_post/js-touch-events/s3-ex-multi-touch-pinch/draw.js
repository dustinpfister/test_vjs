// clear
var draw = {};

draw.background = function (ctx, canvas) {
    // fill black
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// debug pinch
draw.debugPinch = function (ctx, canvas, pinch) {
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.fillText('delta: ' + pinch.distanceDelta.toFixed(2), 10, 10);
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
