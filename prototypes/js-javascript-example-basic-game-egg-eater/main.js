
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var game = gameMod.create({canvas:canvas});

draw.back(ctx, canvas);
draw.disp(ctx, canvas, game.guy);