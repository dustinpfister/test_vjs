// find total number of images
var totalImages = function (w, h, colorDepth) {
    return Math.pow(colorDepth, w * h);
};
// is the image size and depth beyond MAX_SAFE_INTEGER ?
var pastSafe = function (w, h, colorDepth) {
    return totalImages(w, h, colorDepth) >= Number.MAX_SAFE_INTEGER
};
// Basic indexFromString using parseInt that will work for a colorDepth
// up to 36
var indexFromString = function (string, colorDepth) {
    return parseInt(str.split('').reverse().join(''), colorDepth);
};
// complex indexFromString using Math.pow and parseInt
var indexFromString2 = function (string, colorDepth) {
    colorDepth = colorDepth || 2;
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += Math.pow(colorDepth, i) * parseInt(pix, colorDepth);
    });
    return index;
}
// create a image String from an index value of a color depth and size
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
// chunk and img string into an array of arrays
// with the given width
var chunkIMGString = function (str, w) {
    var i = 0,
    strArr = str.split(''),
    arr = [];
    while (i < str.length) {
        arr.push(strArr.slice(i, i+ w));
        i += w;
    }
    return arr;
};

var w = 4, h = 4,
size = w * h,
colorDepth = 2,
index = 38505,

str = IMGStringFromIndex(index, colorDepth, size),
img = chunkIMGString(str, w);

console.log(str);
// 1100100000000000

console.log(img);
// [ [ '1', '0', '0', '1' ],
//   [ '0', '1', '1', '0' ],
//   [ '0', '1', '1', '0' ],
//   [ '1', '0', '0', '1' ] ]

console.log(totalImages(w, h, colorDepth)); // 65536
console.log(pastSafe(w, h, colorDepth)); // false
console.log(indexFromString(str, colorDepth)); // 19
console.log(indexFromString2(str, colorDepth)); // 19
