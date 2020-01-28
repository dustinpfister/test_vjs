var sm = Machine('gamearea');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {

        var g = sm.game;

        g.ship = {
            x: sm.canvas.width / 2,
            y: sm.canvas.height / 2,
            heading: 0,
            pps: 32
        };
        g.userDown = false;

    },
    tick: function (sm) {

        var g = sm.game,
        ctx = sm.ctx;

        sm.currentMode = null;
        if (g.userDown) {
            sm.currentMode = 'nav';
            //console.log(sm.currentMode);
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);

        ctx.fillStyle = 'white';
        ctx.fillText(g.userDown, 10, 20);

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(g.ship.x, g.ship.y, 5, 0, Math.PI * 2);
        ctx.stroke();

    },
    userPointer: {
        start: function (pt, sm, e) {
            sm.game.userDown = true;
            console.log(sm.states[sm.currentState].modes);
            console.log(sm.currentMode);
        },
        end: function (pt, sm, e) {
            sm.game.userDown = false;
        }
    },
    modes: {

        nav: {
            tick: function (sm) {

                var g = sm.game,
                ship = g.ship;

                ship.x += 1;
				console.log('nav mode');

            }
        },

        build: {
            tick: function () {}
        }

    }
});

sm.start();
