
var getDegree = function (radian) {
    return radian / (Math.PI * 2) * 360;
};

var getRadian = function (degree) {
    return degree / 360 * (Math.PI * 2);
};

var d = getDegree(1.5707963267948966);
console.log(d); // 90
var r = getRadian(d);
console.log(r); // 1.5707963267948966
