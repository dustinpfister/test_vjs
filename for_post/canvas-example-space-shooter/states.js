var States = (function () {

    var lt = new Date(),
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

    // HELPERS
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

    // PUBLIC API
    return {

        canvas: canvas,
        ctx: ctx,
        win: false,
        reset: false,
        disp: {}, // display Objects to be used with the renderer
        current: 'init', // current state

        // Initialize the Game State
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
            this.win = false;
			this.reset=false;
            this.current = 'game';
        },

        // Main Game State
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
            if (enemies.length === 0) {
                this.win = true;
                this.current = 'gameOver';
            }
            if (ship.HP === 0) {
                this.current = 'gameOver';
            }
            lt = now;
        },

        gameOver: function () {

            if (this.reset) {

                this.current = 'init';

            }

        },

        tick: function () {

            this[this.current]();

        }

    };

}
    ());
