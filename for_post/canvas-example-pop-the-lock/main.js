// STATE
var ptl = {
    sec_current: 0,
    sec_target: 50,
    sec_total: 100,
    sec_margin: 2,
    tick_dir: 1,
    tick_rate: 40,
    tick_last: new Date(),
    inrange: false,
    wrapSec: function (sec) {
        if (sec > this.sec_total) {
            sec %= this.sec_total;
        }
        if (sec < 0) {
            sec = this.sec_total - (this.sec_total + Math.abs(sec)) % this.sec_total;
        }
        return sec;
    },
    tick: function () {
        var time = new Date() - this.tick_last,
        ticks = time / this.tick_rate;
        this.sec_current += ticks * this.tick_dir;
        this.sec_current = this.wrapSec(this.sec_current);
        this.tick_last = new Date();
    }
};

// DRAW
var drawPTL = function (ptl, ctx, canvas) {

    // background
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw base circle
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();

    // draw current
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    var r = ptl.sec_current / ptl.sec_total * Math.PI * 2,
    x = Math.cos(r) * 100 + canvas.width / 2,
    y = Math.sin(r) * 100 + canvas.height / 2;
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();

    // info
    ctx.fillStyle = 'yellow';
    ctx.globalAlpha = 0.35;
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('sec_current ' + ptl.sec_current.toFixed(2), 10, 10);

};

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

    var loop = function () {
        requestAnimationFrame(loop);
        ptl.tick();
        drawPTL(ptl, ctx, canvas);
    };
    loop();

}
    ());
