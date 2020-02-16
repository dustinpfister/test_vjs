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

    return util.angleSection(a, 4, scale);

};

console.log( util.angleBounce(225, 360) );
console.log( util.angleBounce(270, 360) );
console.log( util.angleBounce(45, 360) );
console.log( util.angleBounce(10, 360) );
