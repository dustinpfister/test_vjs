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

    var createInputState = function (canvas, win) {
        var input = {
            canvas: canvas,
            win: win,
            pointerDown: false,
            keys: {},
            pointers: [],
            keys: []
        };
        return input;
    };

    // handers
    var handlers = {
        pointerStart: function (pointers, input, e) {
            input.pointerDown = true;
        },
        pointerEnd: function (pointers, input, e) {
            input.pointerDown = false;
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

    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.key] = false;
            if (e.type === 'keydown') {
                input.keys[e.key] = true;
            }
        });
    };

    return function (canvas, win) {
        var input = createInputState(canvas, win || window);
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mouseup', 'pointerEnd');

        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };

}
    ());
