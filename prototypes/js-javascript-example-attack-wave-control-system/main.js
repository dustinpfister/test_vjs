var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });

var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    waveButtons: waveMod.create({
        startY: 64
    })
};

draw.background(sm.ctx, sm.canvas, 'blue');
draw.waveButtons(sm.ctx, sm.waveButtons.pool)
