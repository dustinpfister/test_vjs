// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod();

console.log( gameMod.get(game, 34, 34) );

draw.back(ctx, canvas);
draw.circles(ctx, game);