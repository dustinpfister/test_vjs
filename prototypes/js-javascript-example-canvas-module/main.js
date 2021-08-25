var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    currentState: 'game',
    layers: {},
    events: {},
    states: {}
};

sm.events = {
    pointerStart: function (e, pos, sm) {
        sm.states[sm.currentState].events.pointerStart.call(sm, e, pos, sm);
    },
    pointerMove: function (e, pos, sm) {
        sm.states[sm.currentState].events.pointerMove.call(sm, e, pos, sm);
    },
    pointerEnd: function (e, pos, sm) {
        sm.states[sm.currentState].events.pointerEnd.call(sm, e, pos, sm);
    }
};

sm.layers = canvasMod.createLayerStack({
        container: '#canvas-app',
        events: sm.events
    });

console.log(sm.layers);

// game state
sm.states.game = {
    update: function (sm, secs) {},
    draw: function (sm, stack) {
        draw.background(sm, stack[0].ctx, stack[0].canvas);
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
        state.draw(sm, sm.layers);
        sm.lt = now;
    }
};

loop();
