var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var game = td.createGameObject();

// draw the turret
var drawTurret = function (turret, ctx, canvas) {
    ctx.save();
    ctx.translate(turret.cx, turret.cy);
    ctx.rotate(turret.heading);
    ctx.fillStyle = 'red';
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    ctx.restore();
};

var drawTurretShots = function (turret, ctx, canvas) {
    ctx.fillStyle = 'blue';
    turret.shots.forEach(function (shot) {
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
};

var drawTurretInfo = function (turret, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('heading: ' + turret.heading.toFixed(2), 5, 5);
    ctx.fillText('shotTime: ' + turret.shotTime.toFixed(2), 5, 15);
    ctx.fillText('active shots: ' + turret.shots.length, 5, 25);
    ctx.fillText('active enemies: ' + turret.enemies.length, 5, 35);
};

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    td.update(game);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTurret(game, ctx, canvas);
    drawTurretInfo(game, ctx, canvas);
    drawTurretShots(game, ctx, canvas);
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
