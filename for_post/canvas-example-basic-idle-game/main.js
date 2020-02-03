// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = game.getState();

var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
    draw.debugUpgrades(ctx, state);

    game.update(state);

};
loop();

// EVENT
//canvas.addEventListener('click', function (e) {
//    var pos = u.getCanvasRelative(e);
//    e.preventDefault();
//    console.log(pos);
 //   game.manualGather(state);
//});

var buttonLayout = u.mkButtonLayoutHandler({
        buttons: [{
                x: 0,
                y: 0,
                w: 32,
                h: 32,
                onAction: function (pos, opt, e) {
                    game.manualGather(state);
                }
            }
        ]
    });

canvas.addEventListener('click', buttonLayout);
