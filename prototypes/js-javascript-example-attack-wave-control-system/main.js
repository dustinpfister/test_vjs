var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });

var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx
};

draw.background(sm.ctx, sm.canvas, 'blue');
