// DRAW
var draw = {};
draw.bx = function (ctx, bx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    //ctx.fill();
    ctx.stroke();
};
draw.bxArr = function (ctx, ani) {
    var i = 0,
    len = ani.bxArr.length;
    while (i < len) {
        draw.bx(ctx, ani.bxArr[i]);
        i += 1;
    }
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
