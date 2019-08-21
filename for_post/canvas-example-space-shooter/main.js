var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var lt = new Date();
var enemies = [];
// player ship
var ship = new disp.Ship({
        x: 16,
        y: 120,
        pps: 32,
        heading: Math.PI / 180 * 0
    });

var makeEnemies = function (count, canvas) {
    var e,
    enemies = [];
    count = count || 1;
    while (count--) {
        e = new disp.Ship({
                x: Math.floor(canvas.width * Math.random()),
                y: Math.floor(canvas.height * Math.random()),
                pps: 16,
                heading: Math.PI * 2 * Math.random(),
                shotDelay: 1000
            });
        enemies.push(e);
    };

    return enemies;
};

var purgeEnemies = function (enemies) {
    var i = enemies.length;
    while (i--) {
        var enemy = enemies[i];
        if (enemy.HP === 0) {
            enemies.splice(i, 1);
        }
    }
};

// Main Update
var update = function () {
    var now = new Date(),
    t = now - lt;
    ship.update(t, enemies);
    enemies.forEach(function (enemy) {
        enemy.update(t, [ship]);
    });
    purgeEnemies(enemies);
    lt = now;
};

// Main Draw
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    // clear
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw player
    ship.draw(ctx, 'blue', 'blue');
    // draw enemies
    enemies.forEach(function (enemy) {
        enemy.draw(ctx, 'red', 'red');
    });
};

// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
enemies = makeEnemies(3, canvas);
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
