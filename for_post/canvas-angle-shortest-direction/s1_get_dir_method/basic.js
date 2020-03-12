var mod = function (x, m) {
    return (x % m + m) % m;
};

var normalizeHalf = function (n) {
    var c = Math.PI * 2,
    h = c / 2;
    return mod(n + h, c) - h;
};

var shortestDirection = function (a, b) {
    var z = a - b;
    if (a === b) {
        return 0;
    }
    if (normalizeHalf(z) < 0) {
        return -1; // Left
    } else {
        return 1; // Right
    }
};

var state = {
    current: 0,
    target: Math.PI / 80 * 200
};

console.log( shortestDirection(state.current, state.target) );
