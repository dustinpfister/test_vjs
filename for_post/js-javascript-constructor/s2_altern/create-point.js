
var createPointObj = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};

var point = createPointObj();

console.log(point);
