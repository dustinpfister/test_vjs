var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');

// a simple state
var ship = {
    x: 144,
    y: 104,
    dx: 0,
    dy: 0
};

var mod = function (x, m) {
    return (x % m + m) % m;
};

// an update loop for the state
var update = function () {
    ship.x += ship.dx;
    ship.y += ship.dy;

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

    if (x > canvas.width - 50) {
        ship.dx = 1;
    }

    if (x < 50) {
        ship.dx = -1;
    }

});

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();
