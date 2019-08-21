var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var lt = new Date();

// new base class
var box = new disp.Ship({
        x: 160,
        y: 120,
        pps: 32,
        heading: Math.PI / 180 * 45
    });
console.log(box.constructor.name);

// Main Update
var update = function () {
    var now = new Date(),
    t = now - lt;
    //ship.update(t);
    box.update(t);
    lt = now;
};

// Main Draw
var draw = function () {

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;

    // clear
    ctx.fillRect(0, 0, canvas.width, canvas.height);

/*
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
	*/

    box.draw(ctx);

/*
    // draw ship shots
    ctx.fillStyle = 'blue';
    ship.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
	box.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
	*/

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

    box.heading = a;

    console.log(x, y, a.toFixed(2));

});
