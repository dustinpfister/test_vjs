var setFrame = function (frame, opt) {
    opt = opt || {};
    opt.frame = frame === undefined ? 0 : frame;
    opt.maxFrame = opt.maxFrame === undefined ? 50 : opt.maxFrame;
    opt.forFrame = opt.forFrame || function () {
        console.log(this);
    };
    var per = opt.frame / opt.maxFrame;
    opt.forFrame.call({
        frame: opt.frame,
        maxFrame: opt.maxFrame,
        per: per,
        bias: 1 - Math.abs(0.5 - per) / 0.5
    });
};

setFrame(10, {
    forFrame: function () {
        console.log(this.per); // 0.2
    }
})
