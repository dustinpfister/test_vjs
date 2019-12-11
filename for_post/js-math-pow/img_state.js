
var imgFromIndex = function (index) {
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

console.log(imgFromIndex(Math.pow(2, 7 * 7)));
