var canvasObj = utils.createCanvas({
    container : document.getElementById('canvas-app'),
    width: 640,
    height: 480
});


var sm = {
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,

    buildMenu: {
        x: 32,
        y: 32,
        w: 2,
        currentIndex: 0,
        buttons: [
            { unitKey: 'sell'},
            { unitKey: 'res' },
            { unitKey: 'com' }
        ]
    },

    game: {
        money: 1000,
        map: mapMod.create({
            w: 10,
            h: 8,
            marginX: 128,
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
    draw.buildMenu(sm);
    draw.ver(sm);
};

sm.canvas.addEventListener('click', function(e){
    var pos = utils.getCanvasRelative(e);
    var cell = mapMod.getCellByPointer(sm.game.map, pos.x, pos.y);

    // if cell
    if(cell){
        cell.data.fillStyle = cell.data.fillStyle === 'white' ? 'red' : 'white';
    }


    render(sm);

});

init(sm);
render(sm);

