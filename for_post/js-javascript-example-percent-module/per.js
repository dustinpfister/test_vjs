
var Percent = (function () {

    // main api function
    var api = function (n, d, methodKey, args) {
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n, d].concat(args));
    };
    // CLAMP
    var clamp = function (per) {
        if (per > 1) {
            return 1;
        }
        if (per < 0) {
            return 0;
        }
        return per;
    };
    // BASICS
    // base percent function
    api.basePer = function (n, d) {
        return clamp(n / d);
    };
    // 'bias' percent function
    api.bias = function (n, d) {
        var per = api.basePer(n, d);
        return clamp(1 - Math.abs(per - 0.5) / 0.5);
    };
    // MATH.LOG
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
    // 'log3' percent method that takes a value a that has an interesting effect on the curve
    api.log3 = function (n, d, a, basePer, maxPer) {
        basePer = basePer === undefined ? 0.10 : basePer;
        maxPer = maxPer === undefined ? 1 : maxPer;
        a = a === undefined ? 12 : a;
        var per = api.basePer(n, d),
        per2 = clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per)),
        range = maxPer - basePer;
        return clamp( basePer + range * per2 );
    };
    // MATH.COS AND MATH.SIN
    // Trig helper method
    var trig = function (n, d, method, waves, radianOffset, invert) {
        method = method === undefined ? 'cos' : method;
        waves = waves === undefined ? 1 : waves;
        radianOffset = radianOffset === undefined ? 0 : radianOffset;
        invert = invert === undefined ? false : true;
        var per = api.basePer(n, d),
        a = Math.PI * 2 * per / (1 / waves) + radianOffset,
        cos = (Math[method](a) * 0.5 + 0.5);
        return invert ? cos : 1 - cos;
    };
    // cos, and sin method
    api.cos = function (n, d, waves, radianOffset, invert) {
        return trig(n, d, 'cos', waves, radianOffset, invert);
    };
    api.sin = function (n, d, waves, radianOffset, invert) {
        return trig(n, d, 'sin', waves, radianOffset, invert);
    };
    api.waves = function (n, d, waves, radianOffset, invert, method) {
        waves = waves === undefined ? 5 : waves;
        return trig(n, d, method, waves, radianOffset, invert);
    };
    // return public API
    return api;
}
    ());
