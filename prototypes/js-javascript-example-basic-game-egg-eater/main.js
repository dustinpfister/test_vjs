
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;



console.log();

var obj = dispMod.createDisp({
   x: 32,
   w: 96,
   h: 96,
   y: canvas.height - 96 - 32
});

draw.back(ctx, canvas);
draw.disp(ctx, canvas, obj);