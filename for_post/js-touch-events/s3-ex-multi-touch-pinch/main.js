// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// clear
var draw = {};
draw.background = function () {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var touchStart = function (e) {
};
 
var touchMove = function (e) {
};
 
var touchEnd = function (e) {
};
 
// attach a touch events
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchend', touchEnd);
canvas.addEventListener('touchmove', touchMove);
 
cls();