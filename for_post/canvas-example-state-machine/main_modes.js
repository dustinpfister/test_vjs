var sm = Machine('gamearea');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {

        var g = sm.game;

        g.ship = {
            x: sm.canvas.width / 2,
            y: sm.canvas.height / 2
        };

    },
    tick: function (sm) {

        var g = sm.game,
        ctx = sm.ctx;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(g.ship.x, g.ship.y, 5, 0, Math.PI * 2);
        ctx.stroke();

    },
    modes: {

        nav: {
            tick: function (sm) {}
        },

        build: {
            tick: function () {}
        }

    }
});

sm.start();
