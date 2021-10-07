var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas({
        width: 640,
        height: 480
    }),
    grid: gridMod.create({
        xOffset: 32,
        yOffset: 32
    }),
    currentState: 'game',
    states: {}
};

console.log( gridMod.chunk(sm.grid) );
console.log( gridMod.get(sm.grid, 2, 2) );

var onSelected = function(cell, grid, x, y){
    cell.data.fillStyle = 'red';
};
var onUnselected = function(cell, grid, x, y){
    cell.data.fillStyle = 'white';
};

// game state
sm.states.game = {
    update: function (sm, secs) {
    },
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
        draw.grid(sm.grid, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            gridMod.selectedCheck(sm.grid, pos.x, pos.y, onSelected, onUnselected);
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
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
