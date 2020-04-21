var distMethod = function (count, w, h, method) {
    count = count === undefined ? 100 : count;
    w = w === undefined ? 320 : w;
    h = h === undefined ? 240 : h;
    method = method || function (i) {
        return {
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h)
        };
    };
    var points = [],
    i = count;
    while (i--) {
        points.push(method(i));
    }
    return points;
};

var distMethodTwo = function (count, w, h) {
    count = count === undefined ? 100 : count;
    w = w === undefined ? 320 : w;
    h = h === undefined ? 240 : h;
    var points = [],
    i = count;
    while (i--) {
        points.push({
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h)
        });
    }
    return points;
};
