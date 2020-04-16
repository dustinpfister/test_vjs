// Draw
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.debugInput = function (ctx, input) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '15px arial';
    ctx.fillText('input.down: ' + input.down, 10, 15);
};
