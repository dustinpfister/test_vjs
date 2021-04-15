
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var game = gameMod.create({canvas:canvas});

var lt = new Date(),
rate = 20;

var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;

    requestAnimationFrame(loop);

    if(secs > 1 / rate){

        lt = now;

game.pool.disp[0].active = true;

        draw.back(ctx, canvas);
        draw.disp(ctx, canvas, game.guy);
        draw.pool(ctx, canvas, game.pool);
    }
};
loop();