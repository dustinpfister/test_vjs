
(function () {

    var createPerGraph = function (sx, sy, w, h, perMethod) {
        var d = 10,
        points = [],
        n = 0;
        while (n <= d) {
            points.push({
                n: n,
                x: Math.floor(sx + w / d * n),
                y: Math.floor(sy + h - h * perMethod(n, d))
            });
            n += 1;
        }
        return {
            points: points,
            x: sx,
            y: sy,
            w: w,
            h: h,
            d: d
        };
    };

    var drawGraph = function (ctx, graph) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(graph.x, graph.y, graph.w, graph.h);
        ctx.beginPath();
        graph.points.forEach(function (point) {
            if (point.n === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.strokeStyle = 'red';
        ctx.stroke();
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

    var gSize = 50;
    
    var basePerGraph = createPerGraph(10 + (gSize + 10) * 0, 10, gSize, gSize, Percent.basePer);
    var biasPerGraph = createPerGraph(10 + (gSize + 10) * 1, 10, gSize, gSize, Percent.bias);
    var log1Graph = createPerGraph(10 + (gSize + 10) * 2, 10, gSize, gSize, Percent.log1);

    drawGraph(ctx, basePerGraph);
    drawGraph(ctx, biasPerGraph);
    drawGraph(ctx, log1Graph);

}
    ());
