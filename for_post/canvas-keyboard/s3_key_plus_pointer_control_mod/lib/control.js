var controlMod = (function () {

    var createInputState = function (canvas) {
        var inputState = {
            canvas: canvas,
            pointers: [],
            keys: []
        };
        return inputState;
    };

    return {

        attach: function (canvas, handlers) {

            var inputState = createInputState(canvas);

            return inputState;

        }

    };

}
    ());
