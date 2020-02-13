var starMod = (function () {

    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };

    // public API
    return {

        // create a star points array by pointCount, and inner and outer radius
        create1: function (pointCount, outerR, innerR, radianAjust, ox, oy) {

            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / pointCount,
            points = [];

            radianAjust = radianAjust || 0;
            ox = ox === undefined ? 0 : ox;
            oy = oy === undefined ? 0 : oy;
            while (i < pointCount) {
                pt = getPoint(rd * i + radianAjust, outerR, ox, oy);
                points.push(pt.x, pt.y);
                pt = getPoint(rd * i + rd / 2 + radianAjust, innerR, ox, oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        },

        // create a star by point count radius and point skip
        create2: function (pointCount, radius, pointSkip, radianAjust, ox, oy) {
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / pointCount * pointSkip,
            points = [];
			
            radianAjust = radianAjust || 0;
            ox = ox === undefined ? 0 : ox;
            oy = oy === undefined ? 0 : oy;
			
            while (i < pointCount) {
                pt = getPoint(rd * i + radianAjust, radius, ox, oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        }

    }

}
    ());
