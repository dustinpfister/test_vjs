
var gameMod = (function () {

    var createCircles = function () {
        var circles = [],
        i = 10;
        while (i--) {
            circles.push({
                x: 0,
                y: 0,
                radius: 5
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
