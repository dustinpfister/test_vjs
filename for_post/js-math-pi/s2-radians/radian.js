var radianToDegree = function (radian) {
    return radian / (Math.PI * 2) * 360;
};

var degreeToRadian = function (deg) {
    return Math.PI / 180 * deg;
};

console.log( radianToDegree(1.5707963267948966) ); 90
console.log( degreeToRadian(90) ); 1.5707963267948966
