var FF = function (opt) {
    var api = {};
    opt = opt || {};
    api.ani = {};
    api.forFrame = opt.forFrame || function () {};
    var forFrame = function (frameIndex, maxFrame) {
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        api.per = frameIndex / maxFrame;
        api.forFrame.call(api, api, frameIndex, maxFrame);
        // return just the ani object
        return api.ani;
    };
    // public method used to set by frameIndex
    // over max Frames
    return function (frame, maxFrame) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        frame = frame > maxFrame ? frame % maxFrame : frame;
        forFrame(frame, maxFrame);
        return api.ani;
    };
};