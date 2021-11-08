// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var pinch = pinchMod.create(canvas, {
        minActiveDist: 100,
        multiRate: 64
    });

pinch.onPinchActive = function (pinch, multi) {
    console.log(multi);
    draw.background(ctx, canvas);
    draw.debugPinch(ctx, canvas, pinch);

};

draw.background(ctx, canvas);
