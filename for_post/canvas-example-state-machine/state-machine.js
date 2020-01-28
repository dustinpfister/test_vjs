var Machine = (function () {

    // PARSE arguments

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

    // CANVAS

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

    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };

    var attachCanvasEvent = function (sm, DOMType, smType) {

        sm.canvas.addEventListener(DOMType, function (e) {

            var pos = getCanvasRelative(e),
            stateObj = sm.states[sm.currentState],
            handler;

            // call top level
            if (stateObj.userPointer) {
                handler = stateObj.userPointer[smType];
                if (handler) {
                    handler(pos, sm, e);
                }
            }

        });

    }

    // attach canvas events for the given state machine
    var attachAllCanvasEvents = function (sm) {
        attachCanvasEvent(sm, 'mousedown', 'start');
        attachCanvasEvent(sm, 'mousemove', 'move');
        attachCanvasEvent(sm, 'mouseup', 'end');
    };

    // create a new state machine
    return function (container) {

        var sm = {
            currentState: null,
            currentMode: null,
            game: {},
            draw: {},
            states: {},
            canvas: null,
            container: parseContainer(container),
            ctx: null,
            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                states[stateObj.name || 'game'] = stateObj;
                if (stateObj.bootState) {
                    sm.currentState = stateObj.name;
                }
            },
            start: function (stateName) {
                sm.currentState = stateName || sm.currentState;
                var init = states[sm.currentState].init || null;
                if (init) {
                    init(sm);
                }
                loop();
            }
        };

        createCanvas(sm, 320, 240);
        attachAllCanvasEvents(sm);

        // states
        var states = sm.states = {};

        var game = sm.game = {};

        // main loop
        var loop = function () {
            requestAnimationFrame(loop);
            var stateObj = states[sm.currentState] || {};

            // call top level tick
            if (stateObj.tick) {
                stateObj.tick(sm);
            }

            // call mode tick
            if (stateObj.modes && sm.currentMode) {
                var mode = stateObj.modes[sm.currentMode];
                if (mode.tick) {
                    mode.tick(sm);
                };
            }

        };

        return sm;

    };

}
    ());
