var pps = function (obj) {
    obj = obj || {};
    obj.pps = obj.pps === undefined ? 32 : obj.pps;
    obj.x = obj.x === undefined ? 0 : obj.x;
    obj.y = obj.y === undefined ? 0 : obj.y;
    obj.r = obj.r === undefined ? 0 : obj.r;
    var lastTime = new Date();
    // Main API Method
    var api = function () {
        var now = new Date(),
        t = now - lastTime,
        sec = t / 1000;
        obj.x += Math.cos(obj.r) * obj.pps * sec;
        obj.y += Math.sin(obj.r) * obj.pps * sec;
        lastTime = now;
        return obj;
    };
    // single static method
    api.set = function (opt) {
        opt = opt || {};
        obj.x = opt.x === undefined ? obj.x : opt.x;
        obj.y = opt.y === undefined ? obj.y : opt.y;
        obj.r = opt.r === undefined ? obj.r : opt.r;
        return obj;
    };
    // return the public API
    return api;
};

// Demo
var boxState = pps({
        x: 0,
        y: 50,
        r: 0,
        pps: 100
    }), bx;
var loop = function () {
    setTimeout(loop, 100);
    bx = boxState();
    if (bx.x >= 500) {
        boxState.set({
            x: 0,
            y: 50,
            r: Math.PI * 1.9 + Math.random() * (Math.PI * 0.2)
        });
    }
    console.log(bx.x.toFixed(2), bx.y.toFixed(2));
};
loop();
