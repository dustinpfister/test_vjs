var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(bx.cx, bx.cy);
    ctx.rotate(bx.a);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-bx.w / 2, -bx.h / 2, bx.w, bx.h);
    ctx.restore();
};

var loop = function () {
    requestAnimationFrame(loop);
    draw();
};
loop();
