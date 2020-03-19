var draw = {};

draw.back = function (ctx, canvas) {
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.circles = function (ctx) {
    // fully opacity red circle
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(160, 120, 40, 0, Math.PI * 2);
    ctx.fill();
    // half opacity green circle using globalAlpha
    ctx.fillStyle = 'rgba(0,128,0,0.5)';
    ctx.beginPath();
    ctx.arc(180, 140, 40, 0, Math.PI * 2);
    ctx.fill();
};
