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
        x: -32,
        y: -32,
        r: Math.PI / 180 * 40
    },
    fillStyle: 'red'
};

var drawPoint = function () {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(obj.rotation.x, obj.rotation.y, 5, 0, Math.PI * 2);
    ctx.fill();
};

var drawObj = function (ctx, obj) {
    ctx.fillStyle = obj.fillStyle || 'white';
    ctx.save();
    ctx.translate(obj.x, obj.y);
    ctx.rotate(obj.rotation.r);
    ctx.fillRect(-obj.w / 2 + obj.rotation.x, -obj.h / 2 + obj.rotation.y, obj.w, obj.h);
    ctx.restore();
};

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawObj(ctx, obj);
