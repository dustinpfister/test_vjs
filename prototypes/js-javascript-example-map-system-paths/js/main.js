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

sm.map.cells.forEach(function(cell){
    cell.data.fillStyle = 'white';
});


sm.canvas.addEventListener('click', function(e){
    var pos = utils.getCanvasRelative(e);
    var cell = mapMod.getCellByPointer(sm.map, pos.x, pos.y);

    cell.data.fillStyle = cell.data.fillStyle === 'white' ? 'red' : 'white';

    draw.back(sm);
    draw.map(sm, sm.map)

});

console.log(sm);

draw.back(sm);
draw.map(sm, sm.map)