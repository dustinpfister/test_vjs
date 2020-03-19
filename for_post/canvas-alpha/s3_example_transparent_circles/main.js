var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var state = {
    canvas: canvas,
    ctx: ctx,
    circles: [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 32,
            color: 'red',
            alpha: 0.5
        }
    ]
};

draw.back(state);
draw.circles(state);
