var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var lt = new Date();

// ship
var ship = {
    x: 160,
    y: 120,
    heading: 0, // Math.PI,
    pps: 128,
    shots: [],
    shotMax: 5,
    shotTime: 0,
    shotLife: 1500,
    shotDelay: 350,
    update: function (t) {
        t = t === undefined ? 0 : t;
        disp.moveObj(this, t);
        disp.applyBounds(this, canvas);
        this.updateShots(t);
    },
    updateShots: function (t) {
        this.shotTime += t;
        var s = t / 1000;
        // create new shots
        var newShots = this.shotTime / this.shotDelay;
        if (newShots >= 1) {
            this.shotTime = this.shotTime % this.shotDelay;
            if (this.shots.length < this.shotMax) {
                this.shots.push({
                    x: this.x,
                    y: this.y,
                    heading: this.heading,
                    pps: this.pps + 128,
                    life: this.shotLife
                });
            }
        }
        // update shots
        this.shots.forEach(function (shot) {
            disp.moveObj(shot, t);
            shot.life -= t;
            disp.applyBounds(shot, canvas);
        });
        // purge old shots
        var i = this.shots.length;
        while (i--) {
            var shot = this.shots[i];
            if (shot.life <= 0) {
                this.shots.splice(i, 1);
            }
        }
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
