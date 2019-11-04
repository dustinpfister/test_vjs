var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var bx = {
    a: 0,
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    w: 64,
    h: 64,
    section: 0,
    update: function () {
        this.a = Math.PI * 2 / 360 * this.section;
        this.section += 1;
        this.section %= 360;
    }
};

// draw method using canvas translate, save, restore, and rotate
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
    bx.update();
};
loop();
