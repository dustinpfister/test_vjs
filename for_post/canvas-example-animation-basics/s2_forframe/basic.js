var FF = function (opt) {
    var api = {};
    opt = opt || {};

    api.ani = {};
    api.forFrame = opt.forFrame || function () {};
    var forFrame = function (frameIndex, maxFrame) {
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        api.per = frameIndex / maxFrame;
        api.forFrame.call(api, api, frameIndex, maxFrame);
        // return just the ani object
        return api.ani;
    };
    // public method used to set by frameIndex
    // over max Frames
    return function (frame, maxFrame) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        frame = frame > maxFrame ? frame % maxFrame : frame;
        forFrame(frame, maxFrame);
        return api.ani;
    };
};

var drawBx = function (ctx, bx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var boxAni = FF({
        forFrame: function (api, f, mf) {
            var bx = api.ani.bx = {
                w: 32,
                h: 32
            };
            bx.x = (canvas.width - 32) * api.per;
            bx.y = canvas.height / 2 - 16;
        }
    });

var bx = boxAni(-75, 50).bx;
console.log(bx);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawBx(ctx, bx);

/*
var loop = function () {
requestAnimationFrame(loop);
};
loop();
*/
