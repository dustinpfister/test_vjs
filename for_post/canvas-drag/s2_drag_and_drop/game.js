
var gameMod = (function () {

    var createCircles = function () {
        var circles = [],
        i = 10,
        x,
        y;
        while (i--) {
            x = i % 3;
            y = Math.floor(i / 3);
            circles.push({
                x: 32 + x * 32,
                y: 32 + y * 32,
                radius: 16
            });
        }
        return circles;
    };

    // create state main method
    var api = function () {
        return {
            circles: createCircles()
        };
    };

    return api;

}
    ());
