
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var game = gameMod.create({canvas:canvas}),
lt = new Date(),
rate = 30;

var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / rate){
        lt = now;
        gameMod.update(game, secs);
        draw.back(ctx, canvas);
        draw.disp(ctx, canvas, game.guy);
        draw.pool(ctx, canvas, game.pool);
        draw.info(ctx, canvas, game);
    }
};
loop();

var pointerDown = function(){
    game.down = true;
    if(game.gameOver && game.gameOverSecs >= 3){
        game = gameMod.create({canvas:canvas});
    }
};
var pointerUp = function(){
    game.down = false;
};

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mouseup', pointerUp);
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchend', pointerUp);
