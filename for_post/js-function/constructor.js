var Box = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 32 : opt.w;
    this.h = opt.h === undefined ? 32 : opt.h;
};

Box.prototype.getArea = function () {
    return this.w * this.h;
};


var bx = new Box({w:10, h:5});

console.log( bx.getArea() ); // 50
