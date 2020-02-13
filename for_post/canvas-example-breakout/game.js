
var breakout = (function () {

    var createBlocks = function (opt) {
        opt = opt || {};
        opt.sx = 32;
        opt.sy = 32;
        opt.blockWidth = 32;
        opt.blockHeight = 16;
        opt.gridWidth = 8;
        opt.gridHeight = 4;
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

    var api = {};

    // create a new game state
    api.createNewState = function () {

        var state = {
            blocks: createBlocks(),
            paddle: {
                x: 32,
                y: 200,
                w: 120,
                h: 15
            }
        };

        return state;

    };

    // update the given state object with the given amount of time
    // passed sense last update in seconds, and input
    api.update = function (state, secs, input) {};

    return api;

}
    ());
