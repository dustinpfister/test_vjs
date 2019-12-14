
var clock = {};

clock.get = function (now, start) {
    var c = {};
    c.now = now || new Date(2000, 3, 6, 10, 5);
    c.start = start || new Date(1983, 3, 6, 10, 5);
    // get t value of the given dates
    c.t = c.now - c.start;
    c.sec = c.t / 1000;
    c.days = c.sec / 86400;

    // percent done is between zero and 2.5 billion seconds
    c.per = c.sec / (2.5 * Math.pow(10, 9));
    c.per = c.per > 1 ? 1 : c.per;
    c.per = c.per < 0 ? 0 : c.per;

    // level
    c.level = Math.floor(6 * c.per) + 1;

    c.timeText = c.days.toFixed(6);

    return c;
};
