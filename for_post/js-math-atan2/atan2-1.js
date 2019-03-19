// SETUP CANVAS
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

// UPADTE
var update = function () {};

// DRAW
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
