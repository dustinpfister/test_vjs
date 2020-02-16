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
    h = util.mod(si + 2, 4),
    b = 0;

    if (h === 0) {
        b = scale - (a - scale / 2);
    }
    if (h === 1) {
        b = scale / 4 - (a - scale * 0.75);
    }
    if (h === 2) {
        b = scale / 2 - a;
    }
    if (h === 3) {
        b = scale * 0.75 - (a - scale / 4);
    }

    return util.angleNormalize(b, scale);

};

var d = 0,
de = 360;
while (d < de) {
    console.log(d, util.angleBounce(d, 360));
    d += 10;
};

//console.log(util.angleBounce(225, 360));
/*
console.log(util.angleBounce(270, 360));
console.log(util.angleBounce(45, 360));
console.log(util.angleBounce(10, 360));
*/
