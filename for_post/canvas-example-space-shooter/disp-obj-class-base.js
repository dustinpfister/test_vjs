
var disp = disp || {};

// Base Display Object
disp.BaseObj = function (opt) {

    opt = opt || {};

    this.x = opt.x === undefined ? 0;
    this.y = opt.y === undefined ? 0;
    this.heading = opt.heading === undefined ? 0;
    this.pps = opt.pps === undefined ? 0;

};

// update method
disp.BaseObj.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    disp.moveObj(this, t);
    disp.applyBounds(this, canvas);
}
