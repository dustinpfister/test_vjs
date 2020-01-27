var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var game = td.createGameObject();

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    td.update(game);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw.turret(game, ctx, canvas);
    draw.enemies(game, ctx, canvas);
    draw.turretInfo(game, ctx, canvas);
    draw.turretShots(game, ctx, canvas);
};
loop();

// focus and blur
canvas.tabIndex = 0;
canvas.addEventListener('focus', function () {
    game.paused = false;
});
canvas.addEventListener('blur', function () {
    game.paused = true;
});
canvas.focus();
canvas.blur();
