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
        events: sm.events,
        state: sm
    });

var points = canvasMod.createPoints(sm.layers, 'box', 160, 120, 128, 128);

console.log(points);

sm.game = {
    points: points /*[
        [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
        [30, 80, 165, 55, 22, 200, 'fill:red']
    ]*/
}

// game state
sm.states.game = {
    update: function (sm, secs) {},
    draw: function (sm, stack) {
        //draw.background(sm, stack[0].ctx, stack[0].canvas);
        canvasMod.draw(stack, 'background', 0, 'red');
		canvasMod.draw(stack, 'points', 1, sm.game.points, 0, 0);
        ///canvasMod.pointsDraw(stack[1].ctx, sm.game.points, 0, 0)
    },
    events: {
        pointerStart: function (e, pos, sm) {
            console.log('Game State click');
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};

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
