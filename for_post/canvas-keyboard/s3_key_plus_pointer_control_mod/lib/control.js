var controlMod = (function () {

    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        return {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
    };

    var createInputState = function (canvas) {
        var input = {
            canvas: canvas,
            down: false,
            pointers: [],
            keys: []
        };
        return input;
    };

    // handers
    var handlers = {
        pointerStart: function (pointers, input, e) {
            input.down = true;
        },
        pointerEnd: function (pointers, input, e) {
            input.down = false;
        }
    };

    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
            var pointers = getCanvasRelative(e);
            e.preventDefault();
            handlers[type](pointers, input, e);
        });
    };

    return function (canvas) {
        var input = createInputState(canvas);
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        return input;
    };

}
    ());
