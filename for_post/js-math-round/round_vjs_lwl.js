// (credits to Lam Wei Li)
// https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484

var round = function (number, precision) {
    var shift = function (number, exponent) {
        var numArray = ("" + number).split("e");
        return  + (numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
    };
    precision = precision === undefined ? 0 : precision;
    return shift(Math.round(shift(number, +precision)), -precision);
};
