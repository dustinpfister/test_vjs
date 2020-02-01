// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 640;
canvas.height = 240;

var loop = function () {
    requestAnimationFrame(loop);
};
loop();
