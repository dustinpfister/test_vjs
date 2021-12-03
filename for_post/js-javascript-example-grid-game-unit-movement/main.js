(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }

    var sm = {
        ver: '0.3.0',
        fps: 12,
        lt: new Date(),
        game: gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7
        }),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };

    var map = sm.game.maps[sm.game.mapIndex];
    map.cells[3].walkable = false;
    map.cells[12].walkable = false;
    map.cells[13].walkable = false;
    map.cells[14].walkable = false;
    map.cells[15].walkable = false;

    var pointerHanders = {
        start: function (sm, e) {
            var map = sm.game.maps[sm.game.mapIndex];
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pos = utils.getCanvasRelative(e);
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
            var cell = mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex], pos.x, pos.y);
            if (cell) {
                var p = sm.game.player;
                var pCell = map.cells[p.currentCellIndex];
                var path = mapMod.getPath(map, pCell.x, pCell.y, cell.x, cell.y);     
                var pos = path.pop();
                if(pos){
                   var tCell = mapMod.get(map, pos[0], pos[1]);
                   sm.game.targetCell = tCell;
                }
            }
        },
        move: function (sm, e) {
            sm.input.pos = utils.getCanvasRelative(e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
        }
    };

    var createPointerHandler = function (sm, type) {
        return function (e) {
            pointerHanders[type](sm, e);
        };
    };

    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

    // loop with frame capping set by sm.fps value
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.fps){
            gameMod.update(sm.game);
            draw.back(sm);
            draw.map(sm);
            draw.info(sm);
            sm.lt = now;
        }
    };

    loop();

}
    ());
