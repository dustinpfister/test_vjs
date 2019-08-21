var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var lt = new Date();

// apply bounds
var applyBounds = function (pt, canvas) {
    var w = pt.w || 16,
    h = pt.h || 16;
    if (pt.x < -w) {
        pt.x = canvas.width + w - Math.abs(pt.x) % (canvas.width + w);
    }
    if (pt.x > canvas.width + w) {
        pt.x = pt.x % (canvas.width + w);
    }
    if (pt.y < -h) {
        pt.y = canvas.height + h - Math.abs(pt.y) % (canvas.height + h);
    }
    if (pt.y > canvas.height + h) {
        pt.y = pt.y % (canvas.height + h);
    }
};

// ship
var ship = {
    x: 160,
    y: 120,
    heading: 0, // Math.PI,
    pps: 128,
    shots: [],
    shotMax: 3,
    shotTime: 0,
    shotDelay: 250,
    update: function (t) {
        t = t === undefined ? 0 : t;
        var s = t / 1000;
        var delta = this.pps * s;
        this.x += Math.cos(this.heading) * delta;
        this.y += Math.sin(this.heading) * delta;
        applyBounds(this, canvas);
        this.updateShots(t);
    },
    updateShots: function (t) {

        this.shotTime += t;
        var s = t / 1000;

        var newShots = this.shotTime / this.shotDelay;
        if (newShots >= 1) {
            this.shotTime = this.shotTime % this.shotDelay;
            if (this.shots.length < this.shotMax) {
                this.shots.push({
                    x: this.x,
                    y: this.y,
                    heading: this.heading,
                    pps: this.pps + 64,
                    life: 3000
                });
            }
        }

        this.shots.forEach(function (shot) {
            var delta = shot.pps * s;
            shot.x += Math.cos(shot.heading) * delta;
            shot.y += Math.sin(shot.heading) * delta;
        });

    }
};

// Main Update
var update = function () {
    var now = new Date(),
    t = now - lt;
    ship.update(t);
    lt = now;
};

// Main Draw
var draw = function () {

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;

    // clear
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw ship
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.heading);
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // draw ship shots
    ctx.fillStyle = 'blue';
    ship.shots.forEach(function (shot) {

        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);

    })

};

// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};

loop();

// EVENTS
canvas.addEventListener('click', function (e) {

    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top,
    cx = canvas.width / 2,
    cy = canvas.height / 2,
    a = Math.PI + Math.atan2(cy - y, cx - x);

    ship.heading = a;

    console.log(x, y, a.toFixed(2));

});
