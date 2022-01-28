var canvasObj = utils.createCanvas({
    container : document.getElementById('canvas-app'),
    width: 640,
    height: 480
});


var sm = {
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    map: mapMod.create({
        w: 10,
        h: 8,
        marginX: 32,
        marginY: 32,
        cellSize: 40
    })
};

console.log(sm);

draw.back(sm);
draw.map(sm, sm.map)