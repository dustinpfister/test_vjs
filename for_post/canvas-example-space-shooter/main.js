var canvas = States.canvas,
ctx = States.ctx;

// Main Draw
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
    States[States.current]();
    draw();
};
loop();

// move ship handler that will work with mouse
// and touch events
var moveShip = function (e) {
    var bx = e.target.getBoundingClientRect(),
    x = 0,
    y = 0,
    cx,
    cy;
    if (e.touches) {
        x = e.touches[0].clientX - bx.left;
        y = e.touches[0].clientY - bx.top;
        console.log(e.touches);
    } else {
        x = e.clientX - bx.left;
        y = e.clientY - bx.top;
    }
    cx = canvas.width / 2,
    cy = canvas.height / 2;
    States.disp.ship.heading = Math.PI + Math.atan2(cy - y, cx - x);
};

// EVENTS
canvas.addEventListener('mousemove', moveShip);
canvas.addEventListener('touchmove', moveShip);
