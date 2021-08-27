// helpers




var updateGame = function(sm, secs){
    sm.game.size += 32 * secs;
    if(sm.game.size > 128){
        sm.game.size = 64;
    }
    sm.game.w = sm.game.size;
    sm.game.h = sm.game.size;
    sm.game.points = canvasMod.createPoints(sm.layers, 'oval', sm.game.x, sm.game.y, 25, 100, 75);
};




// state object



var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    currentState: 'game',
    game: {},
    layers: {},
    events: {
        pointerStart: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerStart.call(sm, e, pos, sm);
        },
        pointerMove: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerMove.call(sm, e, pos, sm);
        },
        pointerEnd: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerEnd.call(sm, e, pos, sm);
        }
    },
    states: {}
};
sm.layers = canvasMod.createLayerStack({
    container: '#canvas-app',
    events: sm.events,
    state: sm
});
sm.game = {
    x: 160,
    y: 120,
    w: 256,
    h: 256,
    size: 32,
    points: []
};
updateGame(sm, 0);




// game state




sm.states.game = {
    // this start hook will be called just once
    // here I can draw a static background to the canvas just once
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0, 'red');
    },
    update: function (sm, secs) {
        updateGame(sm, secs);
    },
    draw: function (sm, stack) {
        canvasMod.draw(stack, 'clear', 1);
        canvasMod.draw(stack, 'points', 1, sm.game.points, 0, 0);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            // change loction of box
            sm.game.x = pos.x;
            sm.game.y = pos.y;
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};




// loop


// call start just once
sm.states.game.start(sm);
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
