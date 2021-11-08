// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// clear
var cls = function () {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// get first pointer object
var getFirst = function (e) {
    var bx = e.target.getBoundingClientRect();
    return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
};
 
var touchStart = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    cls();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchMove = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchEnd = function (e) {
    console.log(e.timeStamp);
};
 
// attach a touch events
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchend', touchEnd);
canvas.addEventListener('touchmove', touchMove);
 
cls();