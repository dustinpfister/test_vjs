var Box = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 32 : opt.w;
    this.h = opt.h === undefined ? 32 : opt.h;
};

Box.prototype.distance = function (bx) {
    var x1 = this.x + this.w / 2,
    y1 = this.y + this.h / 2,
    x2 = bx.x + bx.w / 2,
    y2 = bx.y + bx.h / 2,
    d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return Math.floor(d);
};

var bx1 = new Box({
        x: 0,
        y: 0
    });

var bx2 = new Box({
        x: 100,
        y: 50
    });

// calling the distance prototype method off of the
// bx1 instance, and passing bx2 as the first argument
console.log(bx1.distance(bx2)); // 111

// the state of bx1 is changed
bx1.x = -15;
bx1.y = -24;

// now calling the distance prototype method
// results in a different value even though the same argument
// is passed and it did not change.
console.log(bx1.distance(bx2)); // 136
