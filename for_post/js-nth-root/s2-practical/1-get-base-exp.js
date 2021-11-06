var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};

// get the base of a value if exp is known
var getBase = function (n, exp) {
    return nthRoot(n, exp);
};

    var base = 7,
    exp = 6;
    a = Math.pow(base, exp);

console.log( getBase( Math.pow(7, 6), 6 ) );
