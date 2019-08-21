var disp = disp || {};
// Ship Class
disp.Ship = function (opt) {
    opt = opt || {};

    // use Base Constructor first
    Object.assign(this, new disp.BaseObj(opt));

    // Ship props
    this.shotMax = opt.shotMax === undefined ? 5 : opt.shotMax; ;
    this.shotLife = opt.shotLife === undefined ? 1500 : opt.shotLife;
    this.shotDelay = opt.shotDelay === undefined ? 350 : opt.shotDelay;
    this.shotPPS = opt.shotPPS === undefined ? 256 : opt.shotPPS;
    this.shotDamage = opt.shotDamage === undefined ? 1 : opt.shotDamage;

    // internals
    this.shots = [];
    this.shotTime = 0;

};

// inherit from BaseObj
disp.Ship.prototype = new disp.BaseObj();

// draw The Ship to a canvas context
disp.Ship.prototype.draw = function (ctx) {
    var hw = this.w / 2,
    hh = this.h / 2;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};
