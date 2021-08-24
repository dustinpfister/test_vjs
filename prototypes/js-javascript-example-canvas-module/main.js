var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    currentState: 'game',
    layers: canvasMod.createLayerStack({
        container: '#canvas-app'
    }),
    states: {}
};

console.log(sm.layers);

// game state
sm.states.game = {
    update: function (sm, secs) {
    },
    draw: function (sm, ctx, canvas) {
        var layer = sm.layers[1];
        draw.background(sm, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {},
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};

/*
utils.canvasPointerEvents(sm.canvasObj.canvas, sm, {
    pointerStart: function (e, pos, sm) {
        var state = sm.states[sm.currentState];
        var handler = state.events['pointerStart'];
        if (handler) {
            handler.call(e, e, pos, sm);
        }
    }
});
*/

var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000,
    state = sm.states[sm.currentState];
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        state.update(sm, secs);
        state.draw(sm, sm.layers[1].ctx, sm.layers[1].canvas);
        sm.lt = now;
    }
};

loop();
