var canvasObj = utils.createCanvas({
    container : document.getElementById('canvas-app'),
    width: 640,
    height: 480
});


var sm = {
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    game: {
        money: 1000,
        map: mapMod.create({
            w: 10,
            h: 8,
            marginX: 32,
            marginY: 32,
            cellSize: 40
        })
    }
};

var init = function(sm){
    sm.game.map.cells.forEach(function(cell){
        cell.data.fillStyle = 'white';
    });
};

var render = function(sm){
    draw.back(sm);
    draw.map(sm, sm.game.map);
    draw.ver(sm);
};

sm.canvas.addEventListener('click', function(e){
    var pos = utils.getCanvasRelative(e);
    var cell = mapMod.getCellByPointer(sm.map, pos.x, pos.y);

    cell.data.fillStyle = cell.data.fillStyle === 'white' ? 'red' : 'white';

    render(sm);

});

init(sm);
render(sm);

