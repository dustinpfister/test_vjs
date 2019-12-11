var IMGStringFromIndex = function (index, colorDepth, size) {

    index = index || 0;
    size = size || 7 * 7;
    colorDepth = colorDepth || 2;

    var maxIndex = Math.pow(colorDepth, size) - 1,
    num,
    baseStr;

    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    num = index.toString(colorDepth);
    baseStr = new Array(size).fill('0').join('');
    return String(baseStr + num).slice(size * -1).split('').reverse().join('');
};

// Basic indexFromString using parseInt
var indexFromString = function (string, colorDepth) {
    return parseInt(str.split('').reverse().join(''), colorDepth);
};
// complex indexFromString using Math.pow
var indexFromString2 = function (string, colorDepth) {
    colorDepth = colorDepth || 2;
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += Math.pow(colorDepth, i) * Number(pix);
    });
    return index;
}

var str = IMGStringFromIndex(Math.pow(2, 7 * 7) - 1);
console.log(str);
// 1111111111111111111111111111111111111111111111111

str = '023331';
console.log( indexFromString(str, 4) );
console.log( indexFromString2(str, 4) );