
// Disp Base Class
var Disp = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0: opt.x;
    this.y = opt.y === undefined ? 0: opt.y;
    this.w = opt.w === undefined ? 16: opt.w;
    this.h = opt.h === undefined ? 16: opt.h;
    this.heading = opt.heading === undefined ? 0: opt.heading;
    this.pps = opt.pps === undefined ? 0: opt.pps;
};
// update method
Disp.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    disp.moveObj(this, t);
    disp.applyBounds(this, canvas);
};
// Base draw to a canvas method
Disp.prototype.draw = function (ctx) {
    var hw = this.w / 2,
    hh = this.h / 2;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.strokeRect(-hw, -hh, this.w, this.h);
    ctx.restore();
};

Disp.prototype.applyBounds = function (canvas) {
    //var w = this.w || 16,
    //h = obj.h || 16;
    if (this.x < -w) {
        this.x = canvas.width + this.w - Math.abs(this.x) % (canvas.width + this.w);
    }
    if (this.x > canvas.width + this.w) {
        this.x = this.x % (canvas.width + this.w);
    }
    if (this.y < -this.h) {
        this.y = canvas.height + this.h - Math.abs(this.y) % (canvas.height + this.h);
    }
    if (this.y > canvas.height + this.h) {
        this.y = this.y % (canvas.height + this.h);
    }
};

Disp.prototype.moveObj = function (t) {
    var s = t / 1000;
    var delta = this.pps * s;
    this.x += Math.cos(this.heading) * delta;
    this.y += Math.sin(this.heading) * delta;
};

// distance
Disp.prototype.distance = function (disp2) {
    return Math.sqrt(Math.pow(this.x - disp2.x, 2) + Math.pow(this.y - disp2.y, 2));
};
