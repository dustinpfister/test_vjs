var drawBackground = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var drawBox = function (ctx, bx) {
    ctx.lineWidth = bx.lineWidth || 5;
    ctx.strokeStyle = bx.strokeColor || 'white';
    ctx.fillStyle = bx.fillColor || 'green';

    ctx.beginPath();
    ctx.rect(bx.x - bx.w / 2, bx.y - bx.h / 2, bx.w, bx.h);
    ctx.moveTo(bx.x, bx.y);
    ctx.lineTo(bx.x + bx.w, bx.y);
    ctx.fill();
    ctx.stroke();
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

drawBackground(ctx, canvas);

drawBox(ctx, {
    x: canvas.width / 2,
    y: canvas.height / 2,
    w: 32,
    h: 32
});

//ctx.save();
//ctx.translate(160, 120);
//ctx.rotate(Math.PI / 180 * 45);
//ctx.restore();
