var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// make enemies
var makeEnemies = function (count, canvas) {
    var e,
    enemies = [];
    count = count || 1;
    while (count--) {
        e = new Ship({
                canvas: canvas,
                x: Math.floor(canvas.width * Math.random()),
                y: Math.floor(canvas.height * Math.random()),
                pps: 16,
                shotPPS: 64,
                shotLife: 5000,
                heading: Math.PI * 2 * Math.random(),
                shotDelay: 3000
            });
        enemies.push(e);
    };
    return enemies;
};

// purge
var purgeEnemies = function (enemies) {
    var i = enemies.length;
    while (i--) {
        var enemy = enemies[i];
        if (enemy.HP === 0) {
            enemies.splice(i, 1);
        }
    }
};

var States = (function () {

    var lt = new Date();
    //enemies = [],
    //ship;

    return {

        disp: {},

        current: 'init',

        init: function () {

            // player ship
            this.disp.ship = new Ship({
                    canvas: canvas,
                    x: 16,
                    y: 120,
                    pps: 32,
                    heading: Math.PI / 180 * 0
                });

            this.disp.enemies = makeEnemies(3, canvas);

            this.current = 'game';

        },

        game: function () {

            var now = new Date(),
            t = now - lt,
            ship = this.disp.ship,
            enemies = this.disp.enemies;

            ship.update(t, enemies);
            enemies.forEach(function (enemy) {
                enemy.update(t, [ship]);
            });
            purgeEnemies(enemies);
            lt = now;

        }

    };

}
    ());

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
//enemies = makeEnemies(3, canvas);

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
