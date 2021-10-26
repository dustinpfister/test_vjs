var framed = function (opt) {
    // local options
    opt = opt || {};
    opt.forFrame = opt.forFrame || function () {};
    opt.maxFrame = opt.maxFrame || 50;
    opt.frame = opt.frame === undefined ? 0 : opt.frame;
    // helpers
    var wrapFrame = function (frame) {
        if (frame >= opt.maxFrame) {
            return frame % opt.maxFrame;
        }
        if (frame < 0) {
            return opt.maxFrame - Math.abs(frame) % opt.maxFrame;
        }
        return frame;
    };
    var getState = function (frame, maxFrame) {
        var per = frame / maxFrame;
        return {
            frame: frame,
            maxFrame: maxFrame,
            per: per,
            bias: 1 - Math.abs(0.5 - per) / 0.5
        };
    };
    var step = function (delta) {
        opt.frame = wrapFrame(opt.frame + delta);
        return opt.frame;
    };
    var call = function () {
        var state = getState(opt.frame, opt.maxFrame);
        opt.forFrame.call(state, state, opt.frame, opt.maxFrame);
    };

    // the public api
    var api = function (frame) {
        opt.frame = wrapFrame(frame === undefined ? opt.frame : frame);
        call();
        step(1);
    };
    // make some additional methods public
    api.step = step;
    api.getState = getState;
    api.call = call;
    // return the public API that is a function
    // with some methods attached
    return api;
};

var ani = framed({
        maxFrame: 100,
        forFrame: function () {
            console.log(this.per);
        }
    });

setInterval(function () {
    ani();
}, 100);
