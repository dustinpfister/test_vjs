
var clock = {};

// get basic values with the given t value in milliseconds
clock.getBasicValues = function (t) {
    t = t === undefined ? 0 : t;
    t = t < 0 ? 0 : t;
    var sec = t / 1000;
    return {
        t: t,
        sec: sec,
        days: sec / 86400,
    }
};

// get percent done based on days over max days
clock.getPercent = function (days, max) {
    days = days || 0;
    max = max || (3 * Math.pow(10, 4));
    var per = days / max;
    per = per > 1 ? 1 : per;
    per = per < 0 ? 0 : per;
    return per;
}

// get a clock object
clock.get = function (now, start) {
    var c = {};
    c.now = now || new Date(2000, 3, 6, 10, 5);
    c.start = start || new Date(1983, 3, 6, 10, 5);

    // get basic values
    c = Object.assign(c, clock.getBasicValues(c.now - c.start));

    c.per = clock.getPercent(c.days);

    // level
    //c.level = Math.floor(6 * c.per) + 1;


    c.timeText = c.per.toFixed(4);

    return c;
};
