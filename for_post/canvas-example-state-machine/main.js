var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var stateMachine = (function () {

    // create a new state machine
    return function () {

        // states
        var states = {
            currentState: 'game'
        };

        // main loop
        var loop = function () {

            requestAnimationFrame(loop);

        };

        return {

            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                states[stateObj.name || 'game'] = stateObj;
            },
            start: function () {
                loop();
            }
        }

    };

}
    ());

sm.load({

    name: 'game',

    init: function () {},

    every: {
        tick: function (game, sm) {},
        userPointer: {
            start: function (game, pt, sm) {},
            move: function (game, pt, sm) {},
            end: function (game, pt, sm) {}
        }
    }
});
