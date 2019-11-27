
var ptl = {

    sec_current: 0,
    sec_target: 50,
    sec_total: 100,
    sec_margin: 2,
    tick_dir: -1,
    tick_rate: 100,
    tick_last: new Date(),
    tick: function () {
        var time = new Date() - this.tick_last,
        ticks = time / this.tick_rate;
        this.sec_current += ticks * this.tick_dir;
        if (this.sec_current > this.sec_total) {
            this.sec_current %= this.sec_total;
        }
        if (this.sec_current < 0) {
            this.sec_current = this.sec_total - (this.sec_total + Math.abs(this.sec_current)) % this.sec_total;
        }
        this.tick_last = new Date();
    }
};

setTimeout(function () {

    ptl.tick();

}, 1000);

// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;

}
    ());
