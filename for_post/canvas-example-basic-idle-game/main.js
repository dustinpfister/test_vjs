// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

// create state
var state = game.getState();

// create button layout
var buttons = [{
        x: 16,
        y: 100,
        w: 64,
        h: 32,
        label: 'Gather',
        onAction: function (pos, opt, e) {
            game.manualGather(state);
        }
    }
];

var blOptions = {
    attachTo: canvas,
    buttons: buttons
};
var blObj = u.mkButtonLayout(blOptions);

var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
    draw.buttonLayout(ctx, blObj);

    draw.debugUpgrades(ctx, state);

    game.update(state);

};
loop();
