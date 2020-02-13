
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

    var api = {};

    // create a new game state
    api.createNewState = function (canvas) {
        canvas = canvas || {
            width: 320,
            height: 240
        };
        return {
            input: {
                left: true,
                right: false
            },
            canvas: canvas,
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

    };

    return api;

}
    ());
