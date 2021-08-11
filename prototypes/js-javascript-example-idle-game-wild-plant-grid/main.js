var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas({
        width: 640,
        height: 480
    }),
    game: gameMod.create(),
    currentState: 'game',
    states: {}
};

// game state
var onCellSelect = function (cell) {
    cell.data.fillStyle = 'red';
};
var onCellUnSelect = function (cell) {
    cell.data.fillStyle = 'lime';
};
sm.states.game = {
    update: function (sm, secs) {},
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
        draw.grid(sm.game.grid, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            //console.log(e, pos, sm);
            gridMod.selectedCheck(sm.game.grid, pos.x, pos.y, onCellSelect, onCellUnSelect);
        },
        pointerMove: function () {},
        pointerEnd: function () {}
    }
};

utils.canvasPointerEvents(sm.canvasObj.canvas, sm, {
    pointerStart: function (e, pos, sm) {
        var state = sm.states[sm.currentState];
        var handler = state.events['pointerStart'];
        if (handler) {
            handler.call(e, e, pos, sm);
        }
    }
});

var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000,
    state = sm.states[sm.currentState];
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        state.update(sm, secs);
        state.draw(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        sm.lt = now;
    }
};

loop();
