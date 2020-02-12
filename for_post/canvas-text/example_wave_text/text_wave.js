
var textWave = (function () {
    var makeCharsArray = function (obj) {
        var deltaWidth = (obj.fontSize + obj.spacing),
        halfWidth = obj.str.length * deltaWidth / 2;
        return obj.str.split('').map(function (ch, i) {
            return {
                x: i * deltaWidth - halfWidth + obj.fontSize / 2,
                y: obj.fontSize / 2 * -1,
                ch: ch
            };
        });
    };
    var waveChars = function (obj) {
        var per = obj.frame / obj.maxFrame;
        obj.chars.map(function (c, i) {
            var r = i / obj.chars.length * (Math.PI * 2) + Math.PI * 2 * per;
            c.y = Math.cos(r) * obj.fontSize - obj.fontSize / 2;
            return c;
        });
    };
    return {
        // create a wiggle text object
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
                fps: 60,
                lt: new Date(),
                chars: []
            };
            obj.chars = makeCharsArray(obj);
            return obj
        },
        // update that object
        updateObject: function (obj, now) {
            // now date must be given
            now = now || obj.lt;
            var t = now - obj.lt,
            sec = t / 1000,
            deltaFrame = Math.floor(obj.fps * sec);
            if (deltaFrame >= 1) {
                obj.frame += deltaFrame;
                obj.frame %= obj.maxFrame;
                obj.lt = now;
            }
            waveChars(obj);
        },
        // draw that object
        draw: function (ctx, obj) {
            ctx.save();
            ctx.translate(obj.cx, obj.cy);
            ctx.fillStyle = '#00ffff';
            ctx.font = obj.fontSize + 'px courier';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';
            obj.chars.forEach(function (c) {
                ctx.fillText(c.ch, c.x, c.y);
            });
            ctx.restore();
        }
    };
}
    ());
