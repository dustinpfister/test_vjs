var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

// the turret object
var turret = {
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    heading: 0,
    rps: 1, // radians per second
    lt: new Date(), // last time turret was updated
    shots: [],
    shotsMax: 13,
    shotDelay: 1,
    shotTime: 0
};

// update turret shots
var updateTurretShots = function (turret, secs) {

    // spawn new shots
    turret.shotTime += secs;
    var newShots = Math.floor(turret.shotTime / turret.shotDelay);
    if (newShots >= 1) {
        turret.shotTime -= newShots * turret.shotDelay;
        if (turret.shots.length < turret.shotsMax) {
            turret.shots.push({
                sx: turret.cx,
                sy: turret.cy,
                x: turret.cx,
                y: turret.cy,
                heading: turret.heading,
                pps: 64,
                lifeSpan: 4,
                shotTime: new Date()
            });
        }
    }

    // update active shots
    var i = turret.shots.length,
    now = new Date(),
    shot,
    t;
    while (i--) {
        shot = turret.shots[i];
        t = (now - shot.shotTime) / 1000;
        shot.x = shot.sx + Math.cos(shot.heading) * t * shot.pps;
        shot.y = shot.sy + Math.sin(shot.heading) * t * shot.pps;

        if (t >= shot.lifeSpan) {

            turret.shots.splice(i, 1);

        }

    }

}

// update turret method
var updateTurret = function (turret) {
    var now = new Date(),
    secs = (now - turret.lt) / 1000;
    turret.heading += turret.rps * secs;
    turret.heading %= Math.PI * 2;

    updateTurretShots(turret, secs);

    turret.lt = now;
};

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
};

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    updateTurret(turret);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTurret(turret, ctx, canvas);
    drawTurretInfo(turret, ctx, canvas);
    drawTurretShots(turret, ctx, canvas);
};
loop();
