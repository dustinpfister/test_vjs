var starMod = (function () {

    var getPoint = function (radian, radius, ox, oy) {
        ox = ox === undefined ? 0 : ox;
        oy = oy === undefined ? 0 : oy;
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };

    return {

        // create start method 1
        create1: function (pointCount, outerR, innerR) {
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / pointCount,
            points = [];
            while (i < pointCount) {
                pt = getPoint(rd * i, outerR);
                points.push(pt.x, pt.y);
                pt = getPoint(rd * i + rd / 2, innerR);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        }

    }

}
    ());
