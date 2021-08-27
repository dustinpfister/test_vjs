// helpers




var updateGame = function(sm, secs){
    sm.game.points = canvasMod.createPoints(sm.layers, 'box', sm.game.x, sm.game.y, sm.game.w, sm.game.h);
};




// state object



var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    currentState: 'game',
    game: {},
    layers: {},
    events: {},
    states: {}
};
sm.layers = canvasMod.createLayerStack({
    container: '#canvas-app',
    events: sm.events,
    state: sm
});
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
sm.game = {
    x: 160,
    y: 120,
    w: 256,
    h: 256,
    points: []
};
updateGame(sm, 0);




// game state




sm.states.game = {
    update: function (sm, secs) {
        updateGame(sm, secs);
    },
    draw: function (sm, stack) {
        canvasMod.draw(stack, 'background', 0, 'red');
        canvasMod.draw(stack, 'points', 1, sm.game.points, 0, 0);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            console.log('Game State click');
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};




// loop




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
