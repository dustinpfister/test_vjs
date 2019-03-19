// get the canvas and context
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
 
// set native size of the canvas
canvas.width = 320;
canvas.height = 240;
 
// a simple state that is just a single object
// that will be the moving box
var bx = {
    x: 144,
    y: 104,
    a: 0,
    pps: 64,
    lastTick: new Date()
};

var mod = function (x, m) {
    return (x % m + m) % m;
};

// an update loop for the state
var update = function () {

    var secs = (new Date() - bx.lastTick) / 1000;
    bx.lastTick = new Date();

    var dx = Math.cos(bx.a) * bx.pps * secs;
    var dy = Math.sin(bx.a) * bx.pps * secs;

    bx.x += dx;
    bx.y += dy;

    bx.x = mod(bx.x, canvas.width - 32);
    bx.y = mod(bx.y, canvas.height - 32);

};

// draw method
var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw bx
    ctx.fillStyle = 'red';
    ctx.fillRect(bx.x, bx.y, 32, 32);
};

canvas.addEventListener('mousedown', function (e) {

    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;

    // using Math.atan2 to set bx angle
    bx.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);

});

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();
