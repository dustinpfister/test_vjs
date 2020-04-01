var lengthFromDims = function (dims) {
    return Object.values(dims).reduce(function (acc, n) {
        return acc * n;
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
        var vals = Object.values(a);
        return a.i + ':' + vals.slice(1, vals.length).join('');
    }).sort().join('\n');
}

var three = threePlus({
        x: 2,
        y: 2,
        z: 2
    });

console.log(print(three));

// output
// 0:000
// 1:111
// 2:100
// 3:011
// 4:010
// 5:101
// 6:110
// 7:001

// Desired output
// 0:000 0
// 1:100 2
// 2:010 4
// 3:110 6
// 4:001 7
// 5:101 5
// 6:011 3
// 7:111 1

