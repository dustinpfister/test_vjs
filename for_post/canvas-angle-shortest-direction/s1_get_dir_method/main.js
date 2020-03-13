
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = {
    current: 0,
    delta: Math.PI / 180 * 5,
    target: Math.PI / 80 * 200,
    tickLast: new Date(),
    tickRate: 100
};

var update = function (state) {
    var now = new Date(),
    t = now - state.tickLast;
    if (t >= state.tickRate) {
        var dir = getDir(state.current, state.target);
        state.current += state.delta * dir;
        state.tickLast = new Date();
    }
};

var drawCirclePoint = function (ctx, canvas, angle, radius) {
    ctx.beginPath();
    var x = Math.cos(angle) * radius + canvas.width / 2;
    var y = Math.sin(angle) * radius + canvas.height / 2;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
};

var loop = function () {

    requestAnimationFrame(loop);
    update(state);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText(state.current, 20, 20);

    ctx.fillStyle = 'blue';
    drawCirclePoint(ctx, canvas, state.target, 50);
    ctx.fillStyle = 'green';
    drawCirclePoint(ctx, canvas, state.current, 50);

};

loop();
