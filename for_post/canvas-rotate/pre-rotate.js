// Draw methods

var drawBackground = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var drawBox = function (ctx, bx) {
    ctx.lineWidth = bx.lineWidth || 3;
    ctx.strokeStyle = bx.strokeColor || 'white';
    ctx.fillStyle = bx.fillColor || 'green';
    ctx.beginPath();
    ctx.rect(bx.x - bx.w / 4, bx.y - bx.h / 4, bx.w / 2, bx.h / 2);
    ctx.moveTo(bx.x, bx.y);
    ctx.lineTo(bx.x + bx.w / 2.25, bx.y);
    ctx.fill();
    ctx.stroke();
};

var drawSheetCell = function (ctx, sheet, cellIndex) {
    ctx.drawImage(sheet, 32 * cellIndex, 0, 32, 32, canvas.width / 2 - 16, canvas.height / 2 - 16, 32, 32);
};

// make a sprite sheet

var makeBoxSheet = function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32 * 10;
    canvas.height = 32;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var i = 0,
    len = 10;
    while (i < len) {
        ctx.save();
        ctx.translate(32 / 2 + 32 * i, 32 / 2);
        ctx.rotate(Math.PI * 2 * (i / len));
        drawBox(ctx, {
            x: 0,
            y: 0,
            w: 32,
            h: 32
        });
        ctx.restore();
        i += 1;
    }
    return canvas;
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var sheet = makeBoxSheet();

drawBackground(ctx, canvas);
drawSheetCell(ctx, sheet, 5);
