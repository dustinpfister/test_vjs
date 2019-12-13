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

    // pad a value
    var pad = function (a) {
        return String('00' + a).slice(-2);
    };
    // get a clock state with the give date or new Date(0) by default
    var getClock = function (date) {
        var c = {};
        c.now = date || new Date(0);
        c.timeText = pad(c.now.getHours()) + ' : ' + pad(c.now.getMinutes()) + ' : ' + pad(c.now.getSeconds());
        var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0);
        c.dayPer = (c.now - dayStart) / 86400000;
        return c;
    };
    // draw a clock to a canvas
    var drawClockText = function (canvas, ctx, clock) {
        ctx.lineWidth = 1;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.font = '30px arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2);
        ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2);
    };
    // draw day circle
    var drawClockDayCircle = function (canvas, ctx, clock) {
        var r = Math.PI * 2 * clock.dayPer;
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'grey';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, r);
        ctx.stroke();

    };
    // loop
    var loop = function () {
        var clock = getClock(new Date());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawClockText(canvas, ctx, clock);
        drawClockDayCircle(canvas, ctx, clock);
    };
    // start loop
    loop();
    setInterval(loop, 1000);
}
    ());
