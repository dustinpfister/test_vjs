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

        Object.keys(dims).forEach(function (dimName, di) {
            var val = dims[dimName];
            // product of all dims from 0 to current
            var p = getDimProduct(dims, 0, di);
            // product of dims from less one from current to current
            var pdi = di - 1 < 0 ? 0 : di - 1;
            var p2 = getDimProduct(dims, pdi, di);
            var p3 = getDimProduct(dims, pdi, di - 1);

            //var s1 = (i % p2 + Math.floor(i / p)) % val;

            var a = i % p2,
            b = Math.floor(i / p),
            c = a + b,
            s1 = c % val;

            pos[dimName] = s1;

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

var print = function (threePlus) {
    return threePlus.map(function (a) {
        return Object.values(a).join('')
    }).sort().join('\n');
}

var three = threePlus({
        x: 2,
        y: 2,
        z: 2,
        //a: 2,
        //b: 2
    });

console.log(three);

// output
//  [ { i: 0, x: 0, y: 0, z: 0 },
//    { i: 1, x: 1, y: 1, z: 1 },
//    { i: 2, x: 1, y: 0, z: 0 },
//    { i: 3, x: 0, y: 1, z: 1 },
//    { i: 4, x: 0, y: 1, z: 0 },
//    { i: 5, x: 1, y: 0, z: 1 } ]


// Desired output
//  [ { i: 0, x: 0, y: 0, z: 0 },
//    { i: 1, x: 1, y: 0, z: 0 },
//    { i: 2, x: 0, y: 1, z: 0 },
//    { i: 3, x: 1, y: 1, z: 0 },
//    { i: 4, x: 0, y: 0, z: 1 },
//    { i: 5, x: 1, y: 1, z: 1 } ]
