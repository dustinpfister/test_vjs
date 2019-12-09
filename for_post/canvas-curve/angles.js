var angle = {
    scale: Math.PI * 2
};

angle.mod = function (x, m) {
    return (x % m + m) % m;
};
angle.dist = function (a, b) {
    var m = angle.scale,
    h = m / 2,
    // normalize full
    diff = angle.mod(a - b, m);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
