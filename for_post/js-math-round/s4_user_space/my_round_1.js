
var round = (function () {
    // treat negative numbers a different way
    var roundNeg = function (n) {
        var int = Math.floor(n),
        diff = Math.abs(n - int);
        // special expression for diff === 0.5
        if (diff === 0.5) {
            return n >= 0 ? Math.round(n) : Math.round(n) - 1;
        }
        // just use Math.round otherwise
        return Math.round(n);
    };
    // the shift method
    var shift = function (number, exponent) {
        var numArray = ("" + number).split("e");
        return  + (numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
    };
    // precision rounding
    var roundPre = function (number, precision, roundMethod) {
        precision = precision === undefined ? 0 : precision;
        roundMethod = roundMethod === undefined ? roundNeg : roundMethod;
        return shift(roundMethod(shift(number, +precision)), -precision);
    };
    // how to format a number
    var format = function (n) {
        return String(n);
    };
    // public method
    return function (n, precision, roundMethod) {
        var n = roundPre(n, precision, roundMethod);
        return {
            n: n,
            str: format(n),
            valueOf: function () {
                return this.n;
            },
            toString: function () {
                return this.str;
            }
        };
    };

}
    ());

console.log(round(-1.5) + 0); // -2
console.log(round(-1.5, 0, Math.round) + 0); // -1


console.log(round(-2.465, 2) + 0); // -2.47
console.log(round(-2.465, 2, Math.round) + 0); // -2.46

console.log(round(-0.25, 0) + 0); // 0
