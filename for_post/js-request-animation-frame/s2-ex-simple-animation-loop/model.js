var Model = (function (api) {

    var api = {};

    // a model
    var obj = {
        x: 0,
        y: 0,
        r: 15
    },
    frame = 0,
    maxFrame = 100;

    api.create = function (canvas) {
        var state = {
            canvas: canvas,
            x: 0,
            y: 0,
            r: 15,
            frame: 0,
            maxFrame: 100
        };
        return state;
    };

    api.update = function (state) {
        var per = state.frame / state.maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        a = Math.PI * 2 * bias;
        // move x and y
        state.x = cx + Math.cos(a) * 100 * bias;
        state.y = cy + Math.sin(a) * 50;
        state.frame += 1;
        if (state.frame >= state.maxFrame) {
            state.frame = state.frame % state.maxFrame;
        }
    };

    return api;

}
    ());
