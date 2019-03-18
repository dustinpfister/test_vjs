var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');

// a simple state
var ship = {
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

    var secs = (new Date() - ship.lastTick) / 1000;
    ship.lastTick = new Date();

    var dx = Math.cos(ship.a) * ship.pps * secs;
    var dy = Math.sin(ship.a) * ship.pps * secs;

    ship.x += dx;
    ship.y += dy;

    ship.x = mod(ship.x, canvas.width - 32);
    ship.y = mod(ship.y, canvas.height - 32);

};

// draw method
var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw ship
    ctx.fillStyle = 'red';
    ctx.fillRect(ship.x, ship.y, 32, 32);
};

canvas.addEventListener('mousedown', function (e) {

    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;

    // using Math.atan2 to set ship angle
    ship.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);

});

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();
