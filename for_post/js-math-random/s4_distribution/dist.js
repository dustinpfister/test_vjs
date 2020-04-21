var distMethodOne = function (count, w, h) {
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
