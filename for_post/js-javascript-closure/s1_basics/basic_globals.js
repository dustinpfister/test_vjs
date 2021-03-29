
var x = 15,
y = 5;

var movePoint = function(dx, dy) {
    return {
        x: x += dx,
        y: y += dy
    }
};

console.log( movePoint(-5,5) ); // { x: 10, y: 10 }

