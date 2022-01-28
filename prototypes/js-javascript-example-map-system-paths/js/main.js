var canvasObj = utils.createCanvas({
    container : document.getElementById('canvas-app'),
    width: 640,
    height: 480
});


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
            { unitKey: 'com' }
        ]
    },
    game: {
        money: 1000,
        population: 0,
        map: mapMod.create({
            w: 10,
            h: 8,
            marginX: 128,
            marginY: 32,
            cellSize: 40
        })
    }
};

var buildAtCell = function(sm, cell, unitKey){
    if(sm.game.money >= 100){
        sm.game.money -= 100;
        cell.data.unit = {
            unitKey: unitKey,
            fillStyle: unitKey === 'res' ? 'red' : 'blue'
        }
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
    draw.disp(sm);
    draw.ver(sm);
};

var update = function(sm, secs){
   // set population
   sm.game.population = sm.game.map.cells.reduce(function(acc, cell){
       if(cell.data.unit){
           if(cell.data.unit.unitKey === 'res'){
               acc += 1;
           }
       }
       return acc;
   }, 0);

};

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
        }
        if(unitKey === 'res'){
            buildAtCell(sm, cell, 'res');
        }
        if(unitKey === 'com'){
            buildAtCell(sm, cell, 'com');
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

init(sm);


var loop = function(){
    var now = new Date(),
    secs = (now - sm.lt) / 1000;

    requestAnimationFrame(loop);

    if(secs > 1 / sm.fps){
        update(sm, secs);
        render(sm);
        sm.lt = now;
    }

};
loop();

