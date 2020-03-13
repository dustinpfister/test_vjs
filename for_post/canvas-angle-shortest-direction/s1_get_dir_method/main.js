
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = {
    current: 0,
    delta: Math.PI / 180 * 1,
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

var loop = function () {

    requestAnimationFrame(loop);
    update(state);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText(state.current, 20, 20);

};

loop();

//console.log( getDir(state.current, state.target) );
