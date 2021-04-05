var utils = {};

// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};

// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};

utils.normalizeHalf = function (n, scale) {
    var c = scale || Math.PI * 2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};

// the angular distance between two angles
utils.angleDistance = function (a, b, scale) {
    var m = scale || Math.PI * 2,
    h = m / 2,
    diff = utils.normalizeHalf(a - b, scale);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};

// get -1, 1, or 0 depending on the the state of two angles
utils.shortestAngleDirection = function (a1, a2, scale) {
    var z = a1 - a2,
    x = utils.normalizeHalf(z, scale);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
