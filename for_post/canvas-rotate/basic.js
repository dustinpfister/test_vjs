
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var drawBox = function (ctx, bx) {
    bx = bx || {};
    bx.x = bx.x === undefined ? 0 : bx.x;
    bx.y = bx.y === undefined ? 0 : bx.y;
    bx.w = bx.w === undefined ? 32 : bx.w;
    bx.h = bx.h === undefined ? 32 : bx.h;
    ctx.lineWidth = 3;
    ctx.strokeStyle = bx.color || 'green';
    ctx.strokeRect(bx.x - bx.w / 2, bx.y - bx.h / 2, bx.w, bx.h);
};

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// just drawing a box at the center
drawBox(ctx, {
    x: 160,
    y: 120,
    w: 32,
    h: 32,
    color: 'red'
});

// using the canvas rotate method
// to draw a box at the same location
// but rotated at 45 degrees
ctx.save();
ctx.translate(160, 120);
ctx.rotate(Math.PI / 180 * 45);
drawBox(ctx, {
    w: 32,
    h: 32
});
ctx.restore();
