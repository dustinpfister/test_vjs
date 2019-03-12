var mod = (function () {

    var point = {
        x: 5,
        y: 17
    };

    // plain object api
    return {
        move: function (dx, dy) {
            point.x += dx;
            point.y += dy;
        },
        print: function () {
            console.log('(' + point.x + ',' + point.y + ')')
        }
    }
}
    ());

mod.move(-5, 3);
mod.print(); // '(0,20)'
