// get canvas, context, and set width + height
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
// just a basic display object
var obj = {
    x: 0,
    y: canvas.height / 2 - 16,
    w: 32,
    h: 32
};
// draw the scene
var draw = function (ctx, obj) {
    // draw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw the object
    ctx.fillStyle = 'white';
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fill();
};
// app loop
var loop = function () {
    requestAnimationFrame(loop);
    // just stepping the object
    obj.x += 4;
    obj.x %= canvas.width-32;
    // draw object
    draw(ctx, obj);
};
// start loop
loop();
