var u = {
    defaultAngleScale: Math.PI * 2
};

// mathematical modulo
u.mod = function (x, m) {
    return (x % m + m) % m;
};

u.normalizeHalf = function (n, scale) {
    var c = scale || u.defaultAngleScale,
    h = c / 2;
    return u.mod(n + h, c) - h;
};

u.shortestAngleDirection = function (a1, a2) {

    var z = a1 - a2,
    x = u.normalizeHalf(z);

    if (x < 0) {
        return -1; // Left
    }

    if (x > 0) {
        return 1; // Right
    }

    // if a1 === a2 or any other case
    return 0;
};
