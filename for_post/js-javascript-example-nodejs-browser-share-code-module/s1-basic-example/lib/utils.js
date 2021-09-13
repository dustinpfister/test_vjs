
(function (api) {

    // PI * 2
    api.pi2 = Math.PI * 2;

    // no operation
    api.noop = function () {};

    // mathematical modulo
    api.mod = function (x, m) {
        return (x % m + m) % m;
    };

    // distance
    api.distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

}(  typeof module === 'undefined' ? this['utils'] = {} : module.exports ));
