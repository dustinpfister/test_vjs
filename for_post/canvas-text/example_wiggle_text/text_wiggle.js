
var wiggleText = (function () {

    var makeCharsArray = function (obj) {
        return obj.str.split('').map(function (ch, i) {
            return {
                x: i * (obj.fontSize + obj.spacing),
                y: 0,
                ch: ch
            };
        });
    };

    return {
        createObject: function (opt) {
            opt = opt || {};
            var obj = {
                str: opt.str || 'wiggle',
                spacing: opt.spacing === undefined ? 0 : opt.spacing,
                fontSize: opt.fontSize || 10,
                cx: opt.cx === undefined ? 0 : opt.cx,
                cy: opt.cy === undefined ? 0 : opt.cy,
                frame: 0,
                maxFrame: 50,
                lt: new Date(),
                chars: []
            };
            obj.chars = makeCharsArray(obj);
            return obj
        }
    };

}
    ());
