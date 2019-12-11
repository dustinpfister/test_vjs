var IMGStringFromIndex = function (index) {
    var size = 7 * 7,
    maxIndex = Math.pow(2, size) - 1,
    num,
    baseStr;
    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    num = index.toString(2);
    baseStr = new Array(size).fill('0').join('');
    return String(baseStr + num).slice(size * -1).split('').reverse().join('');
};

var indexFromIMGString = function (string) {
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += pix == 1 ? Math.pow(2, i): 0;
    });
    return index;

}

var str = IMGStringFromIndex( 123456789012345 );

console.log(str);

var index = indexFromIMGString(str);

console.log(index);
