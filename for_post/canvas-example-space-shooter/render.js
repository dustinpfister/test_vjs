// RENDER
var draw = (function () {
    var canvas = States.canvas,
    ctx = States.ctx;

    // clear screen
    var cls = function () {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // clear
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    var states = {

        none: function () {},
        game: function () {

            // draw player
            States.disp.ship.draw(ctx, 'blue', 'blue');
            // draw enemies
            States.disp.enemies.forEach(function (enemy) {
                enemy.draw(ctx, 'red', 'red');
            });

        },
        gameOver: function () {}

    }

    return function () {

        cls();

        var drawState = states[States.current] || states['none'];

        drawState();

    };

}
    ());
