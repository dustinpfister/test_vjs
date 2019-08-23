// RENDER
var canvas = States.canvas,
ctx = States.ctx;
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    // clear
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw player
    States.disp.ship.draw(ctx, 'blue', 'blue');
    // draw enemies
    States.disp.enemies.forEach(function (enemy) {
        enemy.draw(ctx, 'red', 'red');
    });
};
// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    //update();
    //States[States.current]();
    States.tick();
    draw();
};
loop();
