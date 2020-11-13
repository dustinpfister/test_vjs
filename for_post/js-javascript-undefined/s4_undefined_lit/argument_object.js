var create = function (opt) {
    var state = {};
    opt = opt || {};
    state.width = opt.width || 320;
    state.height = opt.height === undefined ? 240 : opt.height;
    return state;
};
// can not set width to zero when using ||
var s1 = create({
        width: 0,
        height: 0
    });
console.log(s1.width, s1.height); // 320 0
