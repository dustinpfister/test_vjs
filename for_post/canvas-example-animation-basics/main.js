var aniState = {
    frame: 0,
    maxFrame: 100,
    disp: [],
    init: function () {
        var i = 5;
        while (i--) {
            disp = {
                x: 0,
                y: 0
            };
            this.disp.push(disp);
        }
        this.forFrame(0, this.maxFrame);
    },
    forFrame: function () {
        var i = 5,
        disp,
        cx = 160,
        cy = 120,
        radius = 50,
        rad;
        while (i--) {
            disp = this.disp[i];
            rad = Math.PI * 2 / 5 * i + Math.PI * 2 * (this.frame / this.maxFrame);
            disp.x = cx + Math.cos(rad) * radius;
            disp.y = cy + Math.sin(rad) * radius
        }
        this.frame += 1;
        this.frame %= this.maxFrame;
    }
};

// Main APP loop
aniState.init();
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var loop = function () {
    requestAnimationFrame(loop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    aniState.disp.forEach(function (disp) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(disp.x, disp.y, 25, 0, Math.PI * 2);
        ctx.fill();
    });
    aniState.forFrame();
};
loop();
