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

draw.boxes = function (ctx, game) {
    var i = game.boxes.length,
    bx;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    while (i--) {
        bx = game.boxes[i];
        ctx.beginPath();
        ctx.rect(bx.x, bx.y, bx.w, bx.h);
        ctx.fill();
        ctx.stroke();
    }
};
