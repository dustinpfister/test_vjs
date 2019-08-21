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
    // draw ship
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
    // draw shots
    ctx.fillStyle = 'blue';
    this.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
};

// ship update
disp.Ship.prototype.update = function (t) {
    // apply BaseObj update first
    disp.BaseObj.prototype.update.call(this, t);

    // update shots
    this.updateShots(t);
};

// update shots
disp.Ship.prototype.updateShots = function (t) {
    this.shotTime += t;
    var s = t / 1000;
    // create new shots
    var newShots = this.shotTime / this.shotDelay;
    if (newShots >= 1) {
        this.shotTime = this.shotTime % this.shotDelay;
        if (this.shots.length < this.shotMax) {
            this.shots.push({
                x: this.x,
                y: this.y,
                heading: this.heading,
                pps: this.pps + 128,
                life: this.shotLife
            });
        }
    }
    // update shots
    this.shots.forEach(function (shot) {
        disp.moveObj(shot, t);
        shot.life -= t;
        disp.applyBounds(shot, canvas);
    });
    // purge old shots
    var i = this.shots.length;
    while (i--) {
        var shot = this.shots[i];
        if (shot.life <= 0) {
            this.shots.splice(i, 1);
        }
    }
};
