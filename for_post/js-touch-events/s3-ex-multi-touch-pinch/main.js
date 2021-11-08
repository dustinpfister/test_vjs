// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// state
var state = {
    obj: {
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        size: 50,
        r: 0
    }
};
// create pinch object
var pinch = pinchMod.create(canvas, {
        minActiveDist: 20,
        multiRate: 128
    });
// what to do when pinch is active
pinch.onPinchActive = function (pinch, multi, radian) {
    console.log(multi);
    draw.background(ctx, canvas);
    state.obj.size = 50 * (1 + (1 - multi));
    state.obj.size = state.obj.size < 50 ? 50 : state.obj.size;
    state.obj.r = radian;
    draw.state(ctx, canvas, state);
    draw.debugPinch(ctx, canvas, pinch);
};
// draw background fro first time
draw.background(ctx, canvas);
draw.state(ctx, canvas, state);
