
var disp = disp || {};

// Base Display Object
disp.BaseObj = function (opt) {

    opt = opt || {};

    this.x = opt.x === undefined ? 0;
    this.y = opt.y === undefined ? 0;
    this.w = opt.w === undefined ? 16;
    this.h = opt.h === undefined ? 16;
    this.heading = opt.heading === undefined ? 0;
    this.pps = opt.pps === undefined ? 0;

};

// update method
disp.BaseObj.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    disp.moveObj(this, t);
    disp.applyBounds(this, canvas);
};

// Base draw to a canvas method
disp.BaseObj.prototype.draw = function (ctx) {

    var hw = this.w / 2,
    hh = this.h / 2;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.strokeRect(-hw, -hh, w, h);
    ctx.restore();

};
