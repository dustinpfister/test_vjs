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
    lt: new Date() // last time turret was updated
};

// update turret method
var updateTurret = function (turret) {
    var now = new Date(),
    t = (now - turret.lt) / 1000;
    turret.heading += turret.rps * t;
    turret.heading %= Math.PI * 2;
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

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    updateTurret(turret);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTurret(turret, ctx, canvas);
};
loop();
