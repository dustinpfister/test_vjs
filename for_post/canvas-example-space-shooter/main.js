var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var lt = new Date();

// apply bounds
var applyBounds = function (pt, canvas) {
    var w = pt.w || 16;
    if (pt.x < -w) {
        pt.x = canvas.width + w - Math.abs(pt.x) % (canvas.width + w);
    }
    if (pt.x > canvas.width + w) {
        pt.x = pt.x % canvas.width;
    }
};

// ship
var ship = {
    x: 160,
    y: 120,
    heading: Math.PI,
    pps: 128,
    update: function (t) {
        t = t === undefined ? 0 : t;
        t = t / 1000;
        var delta = this.pps * t;
        this.x += Math.cos(this.heading) * delta;
        this.y += Math.sin(this.heading) * delta;
        applyBounds(this, canvas);
    }
};

var update = function () {
    var now = new Date(),
    t = now - lt;
    ship.update(t);
    lt = now;
};

var draw = function () {

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.heading);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, 16);
    ctx.lineTo(-8, 16);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

};

var loop = function () {

    requestAnimationFrame(loop);
    update();
    draw();

};

loop();
