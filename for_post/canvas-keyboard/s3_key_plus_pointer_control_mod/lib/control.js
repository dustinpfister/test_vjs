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
        var inputState = {
            canvas: canvas,
            pointers: [],
            keys: []
        };
        return inputState;
    };

    return function (canvas, handlers) {

        var inputState = createInputState(canvas);

        return inputState;

    };

}
    ());
