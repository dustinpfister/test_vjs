var lt = new Date(),
FPS = 2;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;

    setTimeout(loop, 100);

    if (secs >= 1 / FPS) {
        console.log('tick ' + secs.toFixed(2));
        secs %= 1 / FPS;
        lt = now;
    }

};

loop();
