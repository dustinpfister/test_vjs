// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var pinch = pinchMod.create(canvas, {});

// attach a touch events
/*
canvas.addEventListener('touchstart', function (e) {
    touchStart(e);
});
canvas.addEventListener('touchend', function (e) {
    touchEnd(e);
});
*/
canvas.addEventListener('touchmove', function (e) {
    //touchMove(e);
    draw.background(ctx, canvas);
    draw.debugPinch(ctx, canvas, pinch);
});

draw.background(ctx, canvas);
