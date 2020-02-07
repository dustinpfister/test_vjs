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

var drawSheetCell = function (ctx, sheet, cellIndex, dx, dy) {
    var cs = sheet.cellSize,
    sx = sheet.cellSize * cellIndex,
    sy = 0;
    ctx.drawImage(sheet.canvas, sx, sy, cs, cs, dx, dy, cs, cs);
};

// make a sprite sheet
var makeBoxSheet = function (cellSize, cellCount) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    cellSize = cellSize || 32;
    cellCount = cellCount || 16;
    canvas.width = cellSize * cellCount;
    canvas.height = cellSize;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var i = 0,
    len = cellCount;
    while (i < len) {
        ctx.save();
        ctx.translate(cellSize / 2 + cellSize * i, cellSize / 2);
        ctx.rotate(Math.PI * 2 * (i / len));
        drawBox(ctx, {
            x: 0,
            y: 0,
            w: cellSize,
            h: cellSize
        });
        ctx.restore();
        i += 1;
    }
    return {
        cellSize: cellSize,
        cellCount: cellCount,
        canvas: canvas,
        ctx: ctx
    };
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var sheet = makeBoxSheet(32, 64),
cellIndex = 0,
x = canvas.width / 2 - 16,
y = canvas.height / 2 - 16;

var loop = function () {
    requestAnimationFrame(loop);
    drawBackground(ctx, canvas);
    drawSheetCell(ctx, sheet, cellIndex, x, y);
    cellIndex += 1;
    cellIndex %= sheet.cellCount;
};
loop();
