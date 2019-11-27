// STATE
var ptl = {
    sec_current: 0,
    sec_target: 50,
    sec_total: 100,
    sec_margin: 2,
    tick_dir: 1,
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

// DRAW
var drawPTL = function (ptl, ctx, canvas) {

    // background
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
