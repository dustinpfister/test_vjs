
(function (pinchMod) {
    /********* **********
    HELPERS
     ********** *********/
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
    /********* **********
    EVENTS
     ********** *********/
    var EVENTS = {};
    // create for
    EVENTS.createFor = function (eventType, pinch) {
        return EVENTS[eventType];
    };
    // start
    EVENTS.touchstart = function (e) {
        if (e.touches.length >= 2) {
            e.preventDefault();
            var points = setPinchPoints(e, pinch);
            pinch.startDistance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
        }
    };
    // move
    EVENTS.touchmove = function (e) {
        if (e.touches.length >= 2) {
            var points = setPinchPoints(e, pinch);
            pinch.distance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
            pinch.distanceDelta = pinch.startDistance - pinch.distance;

            var multi = pinch.distanceDelta / 32;
            pinch.onPinchActive.call(pinch, pinch, multi);

        }
    };
    // end event
    EVENTS.touchend = function (e) {};
    /********* **********
    PUBLIC METHODS
     ********** *********/
    pinchMod.create = function (canvas, opt) {
        opt = opt || {};
        // the pinch object
        var pinch = {
            active: false,
            startDistance: 0,
            distance: 0,
            distanceDelta: 0,
            multi: 0,
            points: {
                p1: {
                    x: 0,
                    y: 0
                },
                p2: {
                    x: 0,
                    y: 0
                },
            },
            onPinchActive: opt.onPinchActive || function (pinch, multi) {}
        };
        // attach to the given canvas
        canvas.addEventListener('touchstart', EVENTS.createFor('touchstart', pinch));
        canvas.addEventListener('touchmove', EVENTS.createFor('touchmove', pinch));
        canvas.addEventListener('touchend', EVENTS.createFor('touchend', pinch));
        // return the pinch object
        return pinch;
    };
}
    (this['pinchMod'] = {}));
