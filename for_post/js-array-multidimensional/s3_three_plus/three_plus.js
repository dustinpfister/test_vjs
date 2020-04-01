var lengthFromDims = function (dims) {
    return Object.values(dims).reduce(function (acc, n) {
        return acc + n;
    });
};

// get Dim Value by index
var getDVByIndex = function (dims, i) {
    return Object.values(dims)[i];
};

// get the product of all dims from si to ei
var getDimProduct = function (dims, si, ei) {
    var p = getDVByIndex(dims, si),
    i = si + 1;
    while (i <= ei) {
        p = p * getDVByIndex(dims, i);
        i += 1;
    }
    return p;
};

var threePlus = function (dims, forCell) {

    dims = dims || {
        x: 2,
        y: 2,
        z: 2
    };

    var threePlus = [],
    i = 0,
    len = lengthFromDims(dims),
    pos = {};
    while (i < len) {

        Object.keys(dims).forEach(function (d, di) {
            var val = dims[d];

            var x = i % w,
            y = Math.floor(i / w);

            pos[d] = val;
        });

        var cell = {};
        cell.i = i;
        Object.keys(pos).forEach(function (d) {
            cell[d] = pos[d];
        });
        threePlus.push(cell);
        i += 1;
    }

    return threePlus;

};

//var three = threePlus();

//console.log(three);

var p = getDimProduct({
        x: 2,
        y: 2,
        z: 2
    }, 0, 2);

console.log(p);
