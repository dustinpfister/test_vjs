

var setFrame = function (frame, opt) {
    opt = opt || {};
    frame = frame === undefined ? 0;
    opt.maxFrame = opt.maxFrame === undefined ? 50;
    var per = opt.frame / opt.maxFrame;
    opt.forFrame.call({
        frame: opt.frame,
        maxFrame: opt.maxFrame,
        per: per,
        bias: 1 - Math.abs(0.5 - per) / 0.5;
    });
};
