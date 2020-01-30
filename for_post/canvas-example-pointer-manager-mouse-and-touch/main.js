
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var model = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

var sm = {
    currentState: 'demo',
    model: model,
    demo: {
        tick: function (model, sm) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.arc(model.x, model.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        },
        pointer: {
            start: function (pos, sm, e) {
                sm.model.down = true;
            },
            move: function (pos, sm, e) {
                var m = sm.model;
                if (m.down) {
                    m.x = pos.x;
                    m.y = pos.y;
                }
            },
            end: function () {
                var m = sm.model;
                m.down = false;
                m.x = canvas.width / 2,
                m.y = canvas.height / 2
            }
        }
    }
};

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
        stateObj = states[states.currentState] || {},
        hander,
        endHander;
        // prevent default
        e.preventDefault();
        // if we have a point object
        if (stateObj.pointer) {
            handler = stateObj.pointer[smType];
            // if we have a hander
            if (handler) {
                // do not fire handler if we go out of bounds
                // but trigger and end for the current state if
                // if is there
                if (pos.x < 0 || pos.x >= canvas.width || pos.y < 0 || pos.y >= canvas.height) {
                    endHandler = stateObj.pointer.end;
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
attachPointerEvent(sm, canvas, 'mousedown', 'start');
attachPointerEvent(sm, canvas, 'mousemove', 'move');
attachPointerEvent(sm, canvas, 'mouseup', 'end');
attachPointerEvent(sm, canvas, 'mouseout', 'end');
// touch events
attachPointerEvent(sm, canvas, 'touchstart', 'start');
attachPointerEvent(sm, canvas, 'touchmove', 'move');
attachPointerEvent(sm, canvas, 'touchend', 'end');
attachPointerEvent(sm, canvas, 'touchcancel', 'end');

var loop = function () {
    requestAnimationFrame(loop);
    sm[sm.currentState].tick(model, sm);

};
loop();
