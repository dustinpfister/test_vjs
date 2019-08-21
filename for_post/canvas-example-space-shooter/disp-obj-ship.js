
var disp = disp || {};


// ship
var ship = {
    x: 160,
    y: 120,
    heading: 0, // Math.PI,
    pps: 128,
    shots: [],
    shotMax: 5,
    shotTime: 0,
    shotLife: 1500,
    shotDelay: 350,
    update: function (t) {
        t = t === undefined ? 0 : t;
        disp.moveObj(this, t);
        disp.applyBounds(this, canvas);
        this.updateShots(t);
    },
    updateShots: function (t) {
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
    }
};