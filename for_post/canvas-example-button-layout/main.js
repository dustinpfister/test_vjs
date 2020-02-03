var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

// create button layout
var buttons = []

// push manual gather button
buttons.push({
    x: 16,
    y: 100,
    w: 64,
    h: 32,
    label: 'Gather',
    onAction: function (pos, opt, e) {
        console.log('foo');
    }
});

var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: buttons
    });

var loop = function () {
    requestAnimationFrame(loop);

    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);

};
loop();
