
var blobs = (function () {

    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    var createBlob = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            radius: opt.radius === undefined ? 10 : opt.radius,
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
                    b: 255
                }));
            blobs.push(createBlob({
                    x: 5,
                    y: 5,
                    r: 255
                }));
            return {
                blobs: blobs
            };
        },

        // update a blobs Object
        update: function (blobsObj) {}

    };

}
    ());
