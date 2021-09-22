var update = function (state, secs) {
    console.log('tick ' + secs.toFixed(2));
};

var state = {
    lt : new Date(),
    FPS : 2
};
var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    setTimeout(loop, 100);
    if (secs >= 1 / state.FPS) {
        update(state, secs);
        secs %= 1 / state.FPS;
        state.lt = now;
    }
};

loop();
