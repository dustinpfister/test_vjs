var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var sm = stateMachine('gamearea');

sm.load({

    name: 'game',
    bootState: true,

    init: function (sm) {
        console.log('container:');
        console.log(sm.container);
    },

    every: {
        tick: function (sm) {},
        userPointer: {
            start: function (pt, sm) {},
            move: function (pt, sm) {},
            end: function (pt, sm) {}
        }
    }
});

sm.start();
