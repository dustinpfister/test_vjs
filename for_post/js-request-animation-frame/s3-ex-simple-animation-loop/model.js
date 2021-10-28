// A simple Model example
var Model = (function (api) {
    // public api
    var api = {};
    // create a new state
    api.create = function (canvas) {
        var state = {
            canvas: canvas,
            x: 0,
            y: 0,
            r: 25,
            f: 0,
            frame: 0,
            maxFrame: 120,
            fps: 30
        };
        return state;
    };
    // update the state
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
    // return the public api
    return api;
}
    ());
