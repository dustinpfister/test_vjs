
var state = {
    x: 7,
    y: 15
};

var utils = {};

utils.distance = function (state, x, y) {
    return Math.sqrt(Math.pow(state.x - x, 2) + Math.pow(state.y - y, 2));
};

console.log( utils.distance(state,9,15) ); // 2
console.log( utils.distance(state,7,20) ); // 5
console.log( utils.distance(state,14,30) ); // 16.55...
