
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

    // create and draw some graphs
    var gSize = 50,
    graphs = {};
    ['basePer', 'bias', 'log1'].forEach(function(perName, i){
        graphs[perName] = createPerGraph(10 + (gSize + 10) * i, 10, gSize, gSize, Percent[perName]);
        drawGraph(ctx, graphs[perName]);
    });

}
    ());
