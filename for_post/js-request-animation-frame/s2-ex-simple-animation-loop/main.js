// a canvas view
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
lt = new Date();
canvas.width = 320;
canvas.height = 240;
document.body.appendChild(canvas);

var state = Model.create(canvas);
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    Model.update(state, secs);
    draw(state, ctx);
    lt = now;
};
loop();
