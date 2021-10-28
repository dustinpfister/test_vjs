var Model = (function (api) {

    var api = {};

    api.create = function (canvas) {
        var state = {
            canvas: canvas,
            x: 0,
            y: 0,
            r: 15,
            f: 0,
            frame: 0,
            maxFrame: 100,
            fps: 10
        };
        return state;
    };

    api.update = function (state, secs) {
        var per = state.frame / state.maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        a = Math.PI * 2 * bias;
        // move x and y by a and bias
        state.x = cx + Math.cos(a) * 100 * bias;
        state.y = cy + Math.sin(a) * 50;
        // step frame
        state.f += state.fps * secs;
        state.f = state.f % state.maxFrame;
        state.frame = Math.floor(state.f);
    };

    return api;

}
    ());
