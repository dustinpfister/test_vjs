
var createState = function () {
    return {
        parts: [],
        lt: new Date(),
        spawn: {
            max: 5,
            secs: 0,
            rate: 1
        }
    };
};

var spawn = function (state, secs) {
    var spawn = state.spawn;
    spawn.secs += secs;
    if (spawn.secs >= spawn.rate) {
        if (state.parts.length < spawn.max) {
            state.parts.push({
                x: 0,
                y: 0,
                pps: 32,
                heading: Math.PI * 2 * Math.random(),
                life: 5 + Math.floor(Math.random() * 6)
            })
        }
        spawn.secs %= spawn.rate;
    }
};

var purge = function (state) {
    var i = state.parts.length,
    part;
    while (i--) {
        part = state.parts[i];
        if (part.life <= 0) {
            state.parts.splice(i, 1);
        }
    }
};

var update = function (state) {
    var i,
    part,
    now = new Date(),
    t = now - state.lt,
    secs = t / 1000;

    spawn(state, secs);
    purge(state);

    i = state.parts.length;
    while (i--) {
        part = state.parts[i];
        // move
        part.x += Math.cos(part.heading) * part.pps * secs;
        part.y += Math.sin(part.heading) * part.pps * secs;
        // loose life
        part.life -= secs;
    }
    state.lt = now;

};

var render = function (state) {
    console.log(state.parts.length);
};

var state = createState();
setInterval(function () {

    update(state);
    render(state);

}, 250);
