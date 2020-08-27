
var x = 0,
y = 0;

var move = function (dx, dy) {
    x += dx;
    y += dy;
};

move(5, 7);
move(0, 3);

console.log(x,y);
// 5 10