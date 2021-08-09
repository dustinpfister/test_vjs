
var sm = {
    canvasObj: utils.createCanvas()
};

var draw = {};

draw.background = function (sm) {
    var ctx = sm.canvasObj.ctx,
    canvas = sm.canvasObj.canvas;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.background(sm);