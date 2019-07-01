// a high order function example
// that accepts a function as an argument
// and returns a function as well
var frames = function (forFrame) {
    var frame = 0,
    maxFrame = 50;
    forFrame = forFrame || function () {
        console.log(this.per)
    };
    return function () {
        forFrame.call({
            frame: frame,
            maxFrame: maxFrame,
            per: frame / maxFrame
        });
        frame += 1;
        frame %= maxFrame;
    }
};

var box = {
    x: 0,
    y: 30,
    w: 32,
    h: 32
}
var ani = frames(function () {
        box.x = 50 + 100 * this.per;
        console.log(box);
    });

var loop = function () {
    ani();
};
setInterval(loop, 1000);
