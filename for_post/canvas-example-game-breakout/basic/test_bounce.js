var util = {};

util.TAU = Math.PI * 2;
util.EPS = 1e-15;

util.mod = function mod(x, m) {
    return (x % m + m) % m;
};

// normalize angle method
util.angleNormalize = function (a, scale) {
    return util.mod(a, scale || util.TAU);
}

// get an angle section
util.angleSection = function (a, sc, scale) {
    scale = scale === undefined ? util.TAU : scale;
    sc = sc === undefined ? 4 : sc;
    return Math.floor(a / scale * sc);
};

util.angleBounce = function (a, scale) {

    scale = scale === undefined ? util.TAU : scale;
    a = util.angleNormalize(a, scale);

    var si = util.angleSection(a, 4, scale),
    h = util.mod(si + 2, 4);

    if (h === 0) {
        return scale - (a - scale / 2);
    }

    return 0;

};

/*
var d = 180;
while (d < 270) {
    console.log(d, util.angleBounce(d, 360));
    d += 1;
};
*/

//console.log(util.angleBounce(225, 360));
/*
console.log(util.angleBounce(270, 360));
console.log(util.angleBounce(45, 360));
console.log(util.angleBounce(10, 360));
*/
