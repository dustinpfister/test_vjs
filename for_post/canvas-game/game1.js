var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');

var ship = {
    x: 5,
    y: 12,
    dx: 1,
    dy: 1
};

var update = function () {

    ship.x += ship.dx;
    ship.y += ship.dy;

};

var draw = function () {};

var loop = function () {

    requestAnimationFrame(loop);

    update();
    draw();

};
