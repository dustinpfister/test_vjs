// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod();

draw.back(ctx, canvas);
draw.circles(ctx, game);

var grab = false;
// Event handlers
var pointerDown = function (game) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        cir = gameMod.get(game, pos.x, pos.y);
        grab = cir ? cir : false;
    };
};
var pointerMove = function (game) {
    return function (e) {
        var pos = utils.getCanvasRelative(e);
        if (grab) {
            grab.x = pos.x;
            grab.y = pos.y;
            draw.back(ctx, canvas);
            draw.circles(ctx, game);
        }
    };
};
var pointerUp = function (game) {
    return function (e) {
        grab = false;
    };
};

// attach for mouse and touch
canvas.addEventListener('mousedown', pointerDown(game));
canvas.addEventListener('mousemove', pointerMove(game));
canvas.addEventListener('mouseup', pointerUp(game));
canvas.addEventListener('touchstart', pointerDown(game));
canvas.addEventListener('touchmove', pointerMove(game));
canvas.addEventListener('touchend', pointerUp(game));
