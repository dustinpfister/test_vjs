var util = {};

util.mod = function mod(x, m) {
    return (x % m + m) % m;
};

util.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

// normalize angle method
util.normalizeAngle: function (a, scale) {
    return util.mod(a, scale || Math.PI * 2);
}
