
var Percent = (function () {

    // main api function
    var api = function (n, d, methodKey, args) {
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n, d].concat(args));
    };

    var clamp = function (per) {
        if (per > 1) {
            return 1;
        }
        if (per < 0) {
            return 0;
        }
        return per;
    };

    // base percent function
    api.basePer = function (n, d) {
        return clamp(n / d);
    };

    // 'bias' percent function
    api.bias = function (n, d) {
        var per = api.basePer(n, d);
        return clamp(1 - Math.abs(per - 0.5) / 0.5);
    };

    // 'log1' percent method that uses Math.log
    api.log1 = function (n, d) {
        var per = api.basePer(n, d);
        return clamp(Math.log(1 + per) / Math.log(2));
    };

    // 'log2' percent method that uses Math.log with a range between a base and max per
    api.log2 = function (n, d, basePer, maxPer) {
        basePer = basePer === undefined ? 0.25 : basePer;
        maxPer = maxPer === undefined ? 0.75 : maxPer;
        var logPer = api.log1(n, d),
        range = maxPer - basePer,
        per = basePer + range * logPer;
        return clamp(per);
    };

    // Trig helper method
    var trig = function (n, d, method, waves, invert) {
        waves = waves === undefined ? 1 : waves;
        invert = invert === undefined ? false : true;
        var per = api.basePer(n, d),
        a = Math.PI * 2 * per / (1 / waves),
        cos = (Math[method](a) * 0.5 + 0.5);
        return invert ? cos : 1 - cos;
    };
    // cos, and sin method
    api.cos = function (n, d, waves, invert) {
        return trig(n, d, 'cos', waves, invert);
    };
    api.sin = function (n, d, waves, invert) {
        return trig(n, d, 'sin', waves, invert);
    };

    return api;
}
    ());
