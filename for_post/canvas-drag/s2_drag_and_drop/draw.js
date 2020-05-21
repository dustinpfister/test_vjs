var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.circles = function (ctx, game) {
    var i = game.circles.length,
    cir;
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    while (i--) {
        cir = game.circles[i];
        ctx.beginPath();
        ctx.arc(cir.x, cir.y, cir.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};
