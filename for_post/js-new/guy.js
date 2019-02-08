let Guy = function (x, y) {

    this.x = x;
    this.y = y;

};

Guy.prototype.move = function (dx, dy) {

    this.x += dx;
    this.y += dy;

};

let g = new Guy(10, 12);
 
g.move(-5, 7);

console.log(g.x,g.y); // 5 19
