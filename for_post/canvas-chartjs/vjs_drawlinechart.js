
var drawLineChart = (function () {
    // set scale helper
    var setScale = function (canvas, values) {
        var highest = Math.max.apply(null, values);
        return values.map(function (val) {
            return val / highest * canvas.height;
        });
    };
    // return the draw function
    return function (canvas, opt) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        Object.keys(opt.data).forEach(function (setName, di) {
            var values = setScale(canvas, opt.data[setName]);
            ctx.beginPath();
            ctx.strokeStyle = opt.colors[di] || 'white';
            values.forEach(function (n, i) {
                var x = canvas.width / (values.length - 1) * i,
                y = canvas.height - n;
                ctx.lineTo(x, y);
            });
            ctx.stroke();
        });
    };
}
    ());
