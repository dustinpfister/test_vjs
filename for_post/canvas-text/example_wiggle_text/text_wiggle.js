
var wiggleText = (function () {

    var makeCharsArray = function (obj) {
        var deltaWidth = (obj.fontSize + obj.spacing),
        halfWidth = obj.str.length * deltaWidth / 2;
        return obj.str.split('').map(function (ch, i) {
            return {
                x: i * deltaWidth - halfWidth,
                y: obj.fontSize / 2 * -1,
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
