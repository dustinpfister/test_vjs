var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var loop = function () {
    requestAnimationFrame(loop);
};
loop();
