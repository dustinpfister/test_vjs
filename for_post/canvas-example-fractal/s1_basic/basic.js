var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var opt = {
    forFrame: function (api, f, mf) {
        var bxArr = api.ani.bxArr = [];
        var i = 0, bxCount = 3;
        while (i < bxCount) {
            bx = {};
            bx.w = 100 * api.per;
            bx.h = 100 * api.per;
            bx.x = canvas.width / 2 - (bx.w / 2);
            bx.y = canvas.height / 2 - (bx.h / 2);
            bxArr.push(bx);
            i += 1;
        }

    }
};

// create an animation method
var ani = FF(opt);

var frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas)
    draw.bxArr(ctx, ani(frame, 50));

    frame += 1;
    frame %= 50;

};

loop();
