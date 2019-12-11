var IMG = {};

IMG.totalImages = function (w, h, colorDepth) {
    return Math.pow(colorDepth, w * h);
};
IMG.pastSafe = function (w, h, colorDepth) {
    return totalImages(w, h, colorDepth) >= Number.MAX_SAFE_INTEGER
};
IMG.indexFromString = function (string, colorDepth) {
    colorDepth = colorDepth || 2;
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += Math.pow(colorDepth, i) * parseInt(pix, colorDepth);
    });
    return index;
}
// create a image String from an index value of a color depth and size
IMG.stringFromIndex = function (index, colorDepth, size) {
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
IMG.chunkString = function (str, w) {
    var i = 0,
    strArr = str.split(''),
    arr = [];
    while (i < str.length) {
        arr.push(strArr.slice(i, i + w));
        i += w;
    }
    return arr;
};
// draw to a canvas
IMG.drawStr = function (canvas, str, w, pal) {
    pal = pal || ['white', 'black', 'red', 'green', 'blue'];
    var ctx = canvas.getContext('2d'),
    arr = IMG.chunkString(str),
    size = canvas.width / w;
    arr.forEach(function (px, i) {
        var x = i % w * size,
        y = Math.floor(i / w) * size;
        ctx.fillStyle = pal[px] || 'white';
        ctx.fillRect(x, y, size, size);
    });
};
