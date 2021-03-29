var point = function (x, y) {
    return function (dx, dy) {
        return {
            x: x += dx,
            y: y += dy
        }
    }
};

var pt = point(15,5);
console.log( pt(-5,5) ); // { x: 10, y: 10 }

