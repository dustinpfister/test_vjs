// canvas
var canvasObj = utils.createCanvas({
    container : document.getElementById('canvas-app'),
    width: 640,
    height: 480
});

// state machine object
var sm = {
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    fps: 20,
    lt: new Date(),
    buildMenu: {
        x: 32,
        y: 32,
        w: 2,
        currentIndex: 0,
        cellSize: 32,
        buttons: [
            { unitKey: 'sell'},
            { unitKey: 'res' },
            { unitKey: 'com' },
            { unitKey: 'road' }
        ]
    },
    game: gameMod.create()
};

// render
var render = function(sm){
    draw.back(sm);
    draw.map(sm, sm.game.map);
    draw.buildMenu(sm);
    draw.disp(sm);
    draw.ver(sm);
};

// single click event
sm.canvas.addEventListener('click', function(e){
    var pos = utils.getCanvasRelative(e);
    var cell = mapMod.getCellByPointer(sm.game.map, pos.x, pos.y);
    // if map cell clicked
    if(cell){
        var unitKey = sm.buildMenu.buttons[sm.buildMenu.currentIndex].unitKey;
        if(unitKey === 'sell'){
            if(cell.data.unit){
                cell.data.unit = null;
                sm.game.money += 50;
            }else{
                console.log('no unit to sell');
            }
        }else{
        //if(unitKey === 'res'){
            gameMod.buildAt(sm.game, unitKey, cell);
        //}
        //if(unitKey === 'com'){
            //gameMod.buildAt(sm.game, 'com', cell);
        //}
        }
    }
    // if build menu clicked
    var bm = sm.buildMenu,
    w = bm.cellSize * bm.w,
    h = bm.cellSize * bm.buttons.length / bm.w;
    if(utils.boundingBox( bm.x, bm.y, w, h, pos.x, pos.y, 1, 1 )){
        var x = Math.floor((pos.x - bm.x) / bm.cellSize);
        var y = Math.floor((pos.y - bm.y) / bm.cellSize);
        var i = y * bm.w + x;
        var button = bm.buttons[i];
        if(button){
            bm.currentIndex = i;
            console.log(button);
        }
    }
    render(sm);
});

// main app loop
var loop = function(){
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / sm.fps){
        gameMod.update(sm.game, secs)
        render(sm);
        sm.lt = now;
    }
};

loop();
