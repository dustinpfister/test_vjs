
var point = {
    x: 0,
    y: 0,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};

point.move(5, 7);
point.move(0, 3);

console.log(point.x, point.y);
// 5 10
