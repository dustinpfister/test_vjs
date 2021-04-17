(function(anglesMod){

    // PI * 2
    anglesMod.PI2 = Math.PI * 2;

    // mathematical modulo
    anglesMod.mod = function (x, m) {
        return (x % m + m) % m;
    };

    // normalize an angle by half
    anglesMod.normalizeHalf = function (n, scale) {
        var c = scale || anglesMod.PI2,
        h = c / 2;
        return angles.mod(n + h, c) - h;
    };

    // the angular distance between two angles
    anglesMod.distance = function (a, b, scale) {
        var m = scale || angles.PI2,
        h = m / 2,
        diff = anglesMod.normalizeHalf(a - b);
        if (diff > h) {
            diff = diff - m;
        }
        return angles.mod( Math.abs(diff), scale);
    };

    // get the angle from one point to another
    anglesMod.getAngleToPoint = function (pt1, pt2, scale) {
        var a = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x);
        return anglesMod.normalizeHalf(a, scale || anglesMod.PI2);
    };

    // get -1, 1, or 0 depending on the the state of two angles
    anglesMod.shortestAngleDirection = function (a1, a2, scale) {
        var z = a1 - a2,
        x = anglesMod.normalizeHalf(z, scale || anglesMod.PI2);
        if (x < 0) {
            return -1; // Left
        }
        if (x > 0) {
            return 1; // Right
        }
        // if a1 === a2 or any other case
        return 0;
    };


}( typeof module === 'undefined' ? this['anglesMod'] = {} : module.exports  ));