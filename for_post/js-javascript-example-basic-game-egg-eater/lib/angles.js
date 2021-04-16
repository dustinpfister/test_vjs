(function(angles){

    angles.PI2 = Math.PI * 2;

    angles.normalizeHalf = function (n, scale) {
        var c = scale || angles.PI2,
        h = c / 2;
        return utils.mod(n + h, c) - h;
    };

    // the angular distance between two angles
    angles.distance = function (a, b, scale) {
        var m = scale || angles.PI2,
        h = m / 2,
        diff = angles.normalizeHalf(a - b);
        if (diff > h) {
            diff = diff - m;
        }
        return utils.mod( Math.abs(diff), scale);
    };

    // get the angle from one point to another
    angles.getAngleToPoint = function (pt1, pt2, scale) {
        return angles.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x), scale || angles.PI2);
    };

    // get -1, 1, or 0 depending on the the state of two angles
    angles.shortestAngleDirection = function (a1, a2, scale) {
        var z = a1 - a2,
        x = utils.normalizeHalf(z, scale || angles.PI2);
        if (x < 0) {
            return -1; // Left
        }
        if (x > 0) {
            return 1; // Right
        }
        // if a1 === a2 or any other case
        return 0;
    };


}(this['anglesMod'] = {}));