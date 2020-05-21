
var gameMod = (function () {

    var snapToGrid = function (cir) {
        cir.x = Math.floor(cir.x / 32) * 32 + 16;
        cir.y = Math.floor(cir.y / 32) * 32 + 16;
    };

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
                x: 16 + x * 32,
                y: 16 + y * 32,
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

    // attach events for the game object and canvas
    api.attach = function (game, canvas) {
        var grab = false;
        // Event handlers
        var pointerDown = function (game) {
            return function (e) {
                var pos = utils.getCanvasRelative(e),
                cir = gameMod.get(game, pos.x, pos.y);
                grab = cir ? cir : false;
            };
        };
        var pointerMove = function (game) {
            return function (e) {
                var pos = utils.getCanvasRelative(e);
                if (grab) {
                    grab.x = pos.x;
                    grab.y = pos.y;
                }
            };
        };
        var pointerUp = function (game) {
            return function (e) {
                if (grab) {
                    snapToGrid(grab);
                }
                grab = false;
            };
        };
        // attach for mouse and touch
        canvas.addEventListener('mousedown', pointerDown(game));
        canvas.addEventListener('mousemove', pointerMove(game));
        canvas.addEventListener('mouseup', pointerUp(game));
        canvas.addEventListener('touchstart', pointerDown(game));
        canvas.addEventListener('touchmove', pointerMove(game));
        canvas.addEventListener('touchend', pointerUp(game));
    }

    return api;

}
    ());
