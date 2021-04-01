
(function (global) {

    var api = global.draw = global.draw || {}

    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    i += 1;
                }
            }
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
}
    (this));
