
var gameMod = (function () {

    // create a pool of circles
    var createCircles = function () {
        var circles = [],
        i = 10,
        x,
        y;
        while (i--) {
            x = i % 3;
            y = Math.floor(i / 3);
            circles.push({
                i: i,
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

    // get something that might be at the given
    // game area position
    api.get = function (game, x, y) {
        // is there a circle there?
        var i = game.circles.length,
        cir;
        while (i--) {
            cir = game.circles[i];
            if (utils.distance(cir.x, cir.y, x, y) <= cir.radius) {
                return cir;
            }
        }
        // nothing there
        return false;
    };

    return api;

}
    ());
