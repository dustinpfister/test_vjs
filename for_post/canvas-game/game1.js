// get the canvas and context
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');

// set native size of the canvas
canvas.width = 320;
canvas.height = 240;

// a simple state that is just a single object
// that will be the moving box
var bx = {
    // x, y, and angle
    x: 144,
    y: 104,
    a: 0,

    // pixels per second
    pps: 64,
    lastTick: new Date()
};

// mathematical modulo
var mod = function (x, m) {
    return (x % m + m) % m;
};

// an update loop for the state
var update = function () {
    // number of seconds sense last tick
    var secs = (new Date() - bx.lastTick) / 1000;
    // reset last tick to current time
    bx.lastTick = new Date();
    // step x and y
    bx.x += Math.cos(bx.a) * bx.pps * secs;
    bx.y += Math.sin(bx.a) * bx.pps * secs;
    // wrap x and y
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

// attach single event handler
canvas.addEventListener('mousedown', function (e) {
    // get bounding client rect
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
    // using Math.atan2 to set bx angle
    bx.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);
});

// main app loop
var loop = function () {
    // use RAF over setTimeout
    requestAnimationFrame(loop);
    // update, and draw
    update();
    draw();
};

loop();
