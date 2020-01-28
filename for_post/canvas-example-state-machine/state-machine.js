var Machine = (function () {

    // Parse a container argument
    var parseContainer = function (container) {
        // if object assume element that is to be used as the container
        if (typeof container === 'object' && container != null) {
            return container;
        }
        // if string assume id
        if (typeof container === 'string') {
            return document.getElementById(container);
        }
        // if we get this far return document.body
        return document.body;
    };

    // create a canvas for the given state machine
    var createCanvas = function (sm, w, h) {
        sm.canvas = document.createElement('canvas');
        sm.ctx = sm.canvas.getContext('2d');
        sm.container.appendChild(sm.canvas);
        sm.canvas.width = w || 320;
        sm.canvas.height = h || 240;
        // fill black for starters
        sm.ctx.fillStyle = 'black';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };

    // create a new state machine
    return function (container) {

        var currentState = null;

        var sm = {
            game: {},
            states: {},
            canvas: null,
            container: parseContainer(container),
            ctx: null,
            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                states[stateObj.name || 'game'] = stateObj;
                if (stateObj.bootState) {
                    currentState = stateObj.name;
                }
            },
            start: function (stateName) {
                currentState = stateName || currentState
                    var init = states[currentState].init || null;
                if (init) {
                    init(sm);
                }
                loop();
            }
        };

        createCanvas(sm, 320, 240);

        // states
        var states = sm.states = {};

        var game = sm.game = {};

        // main loop
        var loop = function () {
            requestAnimationFrame(loop);
            var stateObj = states[currentState] || {};
            if (stateObj.every) {
                var every = stateObj.every;
                if (every.tick) {
                    every.tick(sm);
                }
            }
        };

        return sm;

    };

}
    ());
