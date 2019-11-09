// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 240;

var obj = {
    x: 160,
    y: 120,
    w: 64,
    h: 64,
    rotation: {
        x: 0,
        y: 0,
        r: 0
    },
    fillStyle: 'red'
};

var drawPoint = function (ctx, x, y, style, strokeStyle) {
    ctx.lineWidth = 3;
    ctx.fillStyle = style || 'white';
    ctx.strokeStyle = strokeStyle || '#4a4a4a';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};

var drawObj = function (ctx, obj) {
    ctx.fillStyle = obj.fillStyle || 'white';
    ctx.save();
    ctx.translate(obj.x, obj.y);
    ctx.rotate(obj.rotation.r);
    ctx.fillRect(-obj.w / 2 + obj.rotation.x, -obj.h / 2 + obj.rotation.y, obj.w, obj.h);
    drawPoint(ctx, 0, 0, 'green');
    drawPoint(ctx, obj.rotation.x, obj.rotation.y, 'blue');
    ctx.restore();
};

var frame = 0, maxFrame = 100;
var loop = function () {
    requestAnimationFrame(loop);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawObj(ctx, obj);

    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    obj.rotation.r = Math.PI * 2 * per;
    obj.rotation.x = -16 * bias
    frame += 1;
    frame %= maxFrame;

};

loop();
