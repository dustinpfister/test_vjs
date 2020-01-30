
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var states = {};

// get canvas relative point
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};


// attach pointer events
var attachPointerEvent = function (states, canvas, domType, smType) {
    // attach a hander of the given domType to the canvas
    canvas.addEventListener(domType, function (e) {
        // get position and state
        var pos = getCanvasRelative(e),
        stateObj = states[states.currentState] || {};
        // prevent default
        e.preventDefault();
        // if we have a point object
        if (stateObj.pointer) {
            var handler = stateObj.pointer[smType];
            // if we have a hander
            if (handler) {
                // do not fire handler if we go out of bounds
                // but trigger and end for the current state if
                // if is there
                if (pos.x < 0 || pos.x >= canvas.width || pos.y < 0 || pos.y >= canvas.height) {
                    var endHandler = stateObj.pointer.end;
                    if (endHandler) {
                        endHandler(pos, states, e);
                    }
                } else {
                    // if we are in bounds just fire the hander
                    handler(pos, states, e);
                }
            }
        }
    });
};

// mouse events
attachPointerEvent(states, canvas, 'mousedown', 'start');
attachPointerEvent(states, canvas, 'mousemove', 'move');
attachPointerEvent(states, canvas, 'mouseup', 'end');
attachPointerEvent(states, canvas, 'mouseout', 'end');
// touch events
attachPointerEvent(states, canvas, 'touchstart', 'start');
attachPointerEvent(states, canvas, 'touchmove', 'move');
attachPointerEvent(states, canvas, 'touchend', 'end');
attachPointerEvent(states, canvas, 'touchcancel', 'end');


var loop = function () {
    requestAnimationFrame(loop);

};
loop();


