var lengthFromDims = function (dims) {
    return Object.values(dims).reduce(function (acc, n) {
        return acc + n;
    });
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

var three = threePlus();

console.log(three);
