// clear
var draw = {};

draw.background = function (ctx, canvas) {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// debug pinch
draw.debugPinch = function (ctx, canvas, pinch) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'lime';
    pinch.points.forEach(function (pt) {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
};
