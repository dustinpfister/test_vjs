
var breakout = (function () {

    var createBlocks = function (opt) {
        opt = opt || {};
        opt.sx = opt.sx || 0;
        opt.sy = opt.sy || 0;
        opt.blockWidth = opt.blockWidth || 32;
        opt.blockHeight = opt.blockHeight || 16;
        opt.gridWidth = opt.gridWidth || 4;
        opt.gridHeight = opt.gridHeight || 4;
        var blocks = [],
        i = 0,
        len = opt.gridWidth * opt.gridHeight;
        while (i < len) {
            var gx = i % opt.gridWidth,
            gy = Math.floor(i / opt.gridWidth);
            blocks.push({
                gx: gx,
                gy: gy,
                x: opt.sx + gx * opt.blockWidth,
                y: opt.sy + gy * opt.blockHeight,
                w: opt.blockWidth,
                h: opt.blockHeight,
                points: 1,
                i: i
            });
            i += 1;
        }
        return blocks;
    };

    var movePaddle = function (state, secs) {
        var paddle = state.paddle,
        d = 0;
        // set direction
        if (state.input.left) {
            d = -1;
        }
        if (state.input.right) {
            d = 1;
        }
        if (state.input.left && state.input.right) {
            d = 0;
        }
        // move paddle
        paddle.x += paddle.pps * secs * d;
        // bounds
        if (paddle.x + paddle.w > state.canvas.width) {
            paddle.x = canvas.width - paddle.w;
        }
        if (paddle.x < 0) {
            paddle.x = 0;
        }
    };

    var moveBalls = function (state, secs) {

        var i = 0,
        ball,
        len = state.balls.length;
        while (i < len) {
            ball = state.balls[i];

            // move ball
            ball.x += Math.cos(ball.heading) * ball.pps * secs;
            ball.y += Math.sin(ball.heading) * ball.pps * secs;

            // out?
            if (ball.y >= state.canvas.height + ball.radius) {
                // just reset to center for now
                ball.x = state.canvas.width / 2;
                ball.y = state.canvas.height / 1.5;
            }

            util.ballBounds(ball, state.canvas);

            i += 1;
        }

    };

    var api = {};

    // create a new game state
    api.createNewState = function (canvas) {
        canvas = canvas || {
            width: 320,
            height: 240
        };
        return {
            input: {
                left: false,
                right: false
            },
            canvas: canvas,
            balls: [{
                    x: canvas.width / 2,
                    y: canvas.height / 1.5,
                    radius: 5,
                    heading: Math.PI * 1.25,
                    pps: 128
                }
            ],
            blocks: createBlocks({
                sx: 32,
                sy: 32,
                blockWidth: (canvas.width - 64) / 8,
                blockHeight: 16,
                gridWidth: 8,
                gridHeight: 5
            }),
            paddle: {
                x: canvas.width / 2 - 60,
                y: canvas.height - 30,
                w: 120,
                h: 15,
                pps: 128
            }
        };
    };

    // update the given state object with the given amount of time
    // passed sense last update in seconds
    api.update = function (state, secs) {

        movePaddle(state, secs);
        moveBalls(state, secs);

    };

    return api;

}
    ());
