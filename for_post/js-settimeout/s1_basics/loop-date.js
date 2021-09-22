// update method
var update = function (state, secs) {
    var obj = state.obj;
    obj.x += Math.cos(obj.heading) * obj.pps * secs;
    obj.y += Math.sin(obj.heading) * obj.pps * secs;
    console.log(obj.x.toFixed(2), obj.y.toFixed(2));
};
// state object
var state = {
    lt: new Date(),
    FPS: 2,
    obj: {
        x: 0,
        y: 0,
        pps: 32,
        heading: Math.PI / 180 * 40
    }
};
// loop
var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    setTimeout(loop, 100);
    if (secs >= 1 / state.FPS) {
        update(state, secs);
        state.lt = now;
    }
};
// start loop
loop();
