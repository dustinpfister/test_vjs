

var draw = {};

draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var sm = {
    canvasObj: utils.createCanvas(),
    game: {},
    currentState: 'game',
    states: {}
};

// game state
sm.states.game = {
    update: function () {},
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
    }
};

var loop = function () {
    requestAnimationFrame(loop);
    sm.states[sm.currentState].draw(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
};

loop();
