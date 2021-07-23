// get degree and radian function
var getDegree = function (radian) {
    return radian / (Math.PI * 2) * 360;
};
var getRadian = function (degree) {
    return degree / 360 * (Math.PI * 2);
};

// get position when distance and degree are known
var getPosition = function (dist, degree) {
    var radian = getRadian(degree);
    return {
        x: Math.cos(radian) * dist,
        y: Math.sin(radian) * dist
    }
};
