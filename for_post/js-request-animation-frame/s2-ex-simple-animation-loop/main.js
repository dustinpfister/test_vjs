// a canvas view
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
lt = new Date();
canvas.width = 320;
canvas.height = 240;
document.body.appendChild(canvas);

var state = Model.create(canvas);
var loop = function () {
    requestAnimationFrame(loop);
    Model.update(state);
    draw(state, ctx);
};
loop();
