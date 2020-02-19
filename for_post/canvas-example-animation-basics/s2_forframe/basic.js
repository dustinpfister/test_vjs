

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

var bx = boxAni(-5, 50).bx;
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
