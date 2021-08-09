

var draw = {};

draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas(),
    game: {},
    currentState: 'game',
    states: {}
};

// game state
sm.states.game = {
    update: function (sm, secs) {
        console.log('tick');

    },
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
    }
};

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
