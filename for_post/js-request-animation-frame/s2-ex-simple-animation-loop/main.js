var draw = function (state, ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};

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
