// get x function with div
var getX = function (y, a) {
    a = a === undefined ? 5 : a;
    return y * a;
};

var getY = function (x, a) {
    a = a === undefined ? 5 : a;
    return x / a;
};

// getting x when I know y
var x = getX(12);
console.log(x); // 60
// when I feed x to my getY function
// I should get the original value I gave to getX
var y = getY(x, 5);
console.log(y); // 12