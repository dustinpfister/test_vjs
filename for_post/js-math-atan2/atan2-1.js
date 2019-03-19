// SETUP CANVAS
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var state = {
    toPoint: {
        x: canvas.width / 2 + 50,
        y: canvas.height / 2 + 50
    },
    fromPoint: {
        x: canvas.width / 2,
        y: canvas.height / 2
    }
};

// UPADTE
var update = function () {};

// DRAW
var drawPoint = function (point, style) {
    style = style || 'red';
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
};

var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPoint(state.fromPoint, 'white');
    drawPoint(state.toPoint, 'red');
};

// INPUT
canvas.addEventListener('mousemove', function (e) {
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;

});

// LOOP
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();
