var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');

var ship = {
    x: 160-16,
    y: 120-16,
    dx: 0,
    dy: 0
};

var update = function () {
    ship.x += ship.dx;
    ship.y += ship.dy;
};

var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw ship
    ctx.fillStyle='red';
    ctx.fillRect(ship.x,ship.y,32,32);
};

var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();
