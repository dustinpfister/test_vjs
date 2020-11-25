
(function () {

    var createPerGraph = function (sx, sy, w, h, perMethod) {
        var d = 10,
        points = [],
        n = 0;
        while (n < d) {
            points.push({
                n: n,
                x: Math.floor(sx + n / (d - 1) * w),
                y: Math.floor(sy + h - h * perMethod(n, d))
            });
            n += 1;
        }
        return {
            points: points,
            w: w,
            h: h,
            d: d
        };
    };

    var drawGraph = function () {};

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var points = createPerGraph(32, 32, 100, 100, Percent.basePer);

    console.log(points);

}
    ());
