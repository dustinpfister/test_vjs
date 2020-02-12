
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
                cx: 0,
                cy: 0,
                frame: 0,
                maxFrame: 50,
                lt: new Date()
            };

            obj.chars = makeCharsArray(obj);

            return obj

        }

    };

}
    ());
