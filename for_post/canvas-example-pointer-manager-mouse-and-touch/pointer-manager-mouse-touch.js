var PMMT = (function () {
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

    // single attachment method for a state manager
    return function (sm) {

        attachPointerEvent(sm, sm.canvas, 'mousedown', 'start');
        attachPointerEvent(sm, sm.canvas, 'mousemove', 'move');
        attachPointerEvent(sm, sm.canvas, 'mouseup', 'end');
        attachPointerEvent(sm, sm.canvas, 'mouseout', 'end');
        // touch events
        attachPointerEvent(sm, sm.canvas, 'touchstart', 'start');
        attachPointerEvent(sm, sm.canvas, 'touchmove', 'move');
        attachPointerEvent(sm, sm.canvas, 'touchend', 'end');
        attachPointerEvent(sm, sm.canvas, 'touchcancel', 'end');

    };

}
    ());
