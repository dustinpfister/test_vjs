// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var pinch = {
    active: false,
    startDistance: 0,
    distance: 0,
    distanceDelta: 0,
    points: {
        p1: {
            x: 0,
            y: 0
        },
        p2: {
            x: 0,
            y: 0
        },
    }
};

var touchStart = function (e) {
    if (e.touches.length >= 2) {
        e.preventDefault();
        var pos = utils.getElementRelative(e, e.target, 0);
        var p1 = pinch.points.p1 = {
            x: pos.x,
            y: pos.y
        }
        var pos = utils.getElementRelative(e, e.target, 1);
        var p2 = pinch.points.p2 = {
            x: pos.x,
            y: pos.y
        }
        pinch.startDistance = utils.distance(p1.x, p1.y, p2.x, p2.y);
    }
};

var touchMove = function (e) {
    if (e.touches.length >= 2) {
        var pos = utils.getElementRelative(e, e.target, 0);
        var p1 = pinch.points.p1 = {
            x: pos.x,
            y: pos.y
        }
        var pos = utils.getElementRelative(e, e.target, 1);
        var p2 = pinch.points.p2 = {
            x: pos.x,
            y: pos.y
        }
        pinch.distance = utils.distance(p1.x, p1.y, p2.x, p2.y);
        pinch.distanceDelta = pinch.startDistance - pinch.distance;
    }
};

var touchEnd = function (e) {};

// attach a touch events
canvas.addEventListener('touchstart', function (e) {
    touchStart(e);
});
canvas.addEventListener('touchend', function (e) {
    touchEnd(e);
});
canvas.addEventListener('touchmove', function (e) {
    touchMove(e);
    draw.background(ctx, canvas);
    draw.debugPinch(ctx, canvas, pinch);
});

draw.background(ctx, canvas);
