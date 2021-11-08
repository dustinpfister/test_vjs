
(function (pinchMod) {

    // set pinch points of a pinch object with the given event object
    var setPinchPoints = function (e, pinch) {
        var pos = utils.getElementRelative(e, e.target, 0);
        var p1 = pinch.points.p1 = {
            x: pos.x,
            y: pos.y
        }
        var pos = utils.getElementRelative(e, e.target, 1);
        var p2 = pinch.points.p2 = {
            x: pos.x,
            y: pos.y
        }
        return pinch.points;
    };

    var EVENTS = {};
    // create for
    EVENTS.createFor = function (eventType, pinch) {
        return EVENTS[eventType];
    };
    // events
    EVENTS.touchstart = function (e) {
        if (e.touches.length >= 2) {
            e.preventDefault();
            var points = setPinchPoints(e, pinch);
            pinch.startDistance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
        }
    };

    EVENTS.touchmove = function (e) {
        if (e.touches.length >= 2) {
            var points = setPinchPoints(e, pinch);
            pinch.distance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
            pinch.distanceDelta = pinch.startDistance - pinch.distance;
        }
    };

    EVENTS.touchend = function (e) {};

    // create a pinch object
    pinchMod.create = function (canvas, opt) {
        opt = opt || {};
        var pinch = {
            active: false,
            startDistance: 0,
            distance: 0,
            distanceDelta: 0,
            points: {
                p1: {
                    x: 0,
                    y: 0
                },
                p2: {
                    x: 0,
                    y: 0
                },
            }
        };

        canvas.addEventListener('touchstart', EVENTS.createFor('touchstart', pinch));
        canvas.addEventListener('touchmove', EVENTS.createFor('touchmove', pinch));
        canvas.addEventListener('touchend', EVENTS.createFor('touchend', pinch));

        /*
        // attach a touch events
        canvas.addEventListener('touchstart', function (e) {
        touchStart(e);
        });
        canvas.addEventListener('touchend', function (e) {
        touchEnd(e);
        });
        canvas.addEventListener('touchmove', function (e) {
        touchMove(e);
        draw.background(ctx, canvas);
        draw.debugPinch(ctx, canvas, pinch);
        });
         */

        return pinch;
    };

}
    (this['pinchMod'] = {}));
