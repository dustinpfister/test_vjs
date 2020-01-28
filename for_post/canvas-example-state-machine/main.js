var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var sm = stateMachine();

sm.load({

    name: 'game',
    bootState: true,

    init: function () {},

    every: {
        tick: function (sm) {

            //console.log(sm.container);

        },
        userPointer: {
            start: function (pt, sm) {},
            move: function (pt, sm) {},
            end: function (pt, sm) {}
        }
    }
});

sm.start();
