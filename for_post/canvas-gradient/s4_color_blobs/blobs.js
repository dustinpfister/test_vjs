
var blobs = (function () {

    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    var createBlob = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            radius: opt.radius === undefined ? 32 : opt.radius,
            r: opt.r === undefined ? 0 : opt.r,
            g: opt.g === undefined ? 0 : opt.g,
            b: opt.b === undefined ? 0 : opt.b
        };
    };

    return {

        // create a blobs Object
        create: function (opt) {
            opt = opt || {};
            var blobs = [];
            blobs.push(createBlob({
                    x: 16,
                    y: 16,
                    b: 255
                }));
            blobs.push(createBlob({
                    x: 24,
                    y: 24,
                    r: 255
                }));
            return {
                w: 64,
                h: 64,
                blobs: blobs
            };
        },

        // return image data from blobs object
        toImageData: function (blobsObj) {

            var data = [],
            i = 0,
            len = blobsObj.w * blobsObj.h;
            while (i < len) {

                var x = i % blobsObj.w,
                y = Math.floor(i / blobsObj.w),
                r = 0,
                g = 0,
                b = 0;

                blobsObj.blobs.forEach(function (blob) {

                    var d = distance(blob.x, blob.y, x, y),
                    per = 1 - d / blob.radius;
                    per = per < 0 ? 0 : per;

                    r += blob.r * per;
                    g += blob.g * per;
                    b += blob.b * per;

                });

                r = r > 255 ? 255 : r;
                g = g > 255 ? 255 : g;
                b = b > 255 ? 255 : b;

                data.push(r, g, b, 255);

                i += 1;
            }

            return new ImageData(new Uint8ClampedArray(data), blobsObj.w, blobsObj.h);

        },

        // update a blobs Object
        update: function (blobsObj) {}

    };

}
    ());
