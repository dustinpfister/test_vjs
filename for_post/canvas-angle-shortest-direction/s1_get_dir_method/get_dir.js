
var getDir = (function () {
    // modulo
    var mod = function (x, m) {
        return (x % m + m) % m;
    };
    // normalize an angle to half radians
    var normalizeHalf = function (n) {
        var c = Math.PI * 2,
        h = c / 2;
        return mod(n + h, c) - h;
    };
    // public get dir method
    return function (a, b) {
        var z = a - b;
        if (a === b) {
            return 0;
        }
        if (normalizeHalf(z) < 0) {
            return 1;
        } else {
            return -1;
        }
    };
}
    ());
