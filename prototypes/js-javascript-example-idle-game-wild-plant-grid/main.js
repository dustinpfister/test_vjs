

var draw = {};

draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};


var sm = {
    canvasObj: utils.createCanvas(),
    game: {},
    states: {}
};

// game state
sm.states.game = {
    update: function () {},
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
    }
};

sm.states['game'].draw(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);

