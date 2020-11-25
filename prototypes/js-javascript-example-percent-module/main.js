
(function () {

    var createPerGraph = function (sx, sy, w, h, perMethod) {
        var d = 10,
        points = [],
        n = 0;
        while (n < len) {
            points.push({
                n: n,
                x: sx + w / d * n,
                y: sy + h - h * perMethod(n, d)
            });
            n += 1;
        }
    };

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}
    ());
