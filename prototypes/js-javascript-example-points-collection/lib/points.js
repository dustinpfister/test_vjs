var Points = (function () {

    var api = {};

    var ParseMatrix = function (source) {};

    var ParseObjects = function (source) {};

    var ParseArray = function (source) {
        var result = [];
        var i = 0,
        el,
        obj = false,
        len = source.length;
        while (i < len) {
            el = source[i];
            if (!obj) {
                obj = {
                    points: []
                };
            }
            obj.points.push(el);
            i += 1;
            if (i === len) {
                if (obj) {
                    result.push(obj);
                }
            }
        }
        return result;
    };

    api.parse = function (a) {
        if (typeof a === 'object') {
            if (a instanceof Array) {
                if (a[0]instanceof Array) {
                    return ParseMatrix(a);
                }
                if (a[0]instanceof Object) {
                    return ParseObjects(a);
                }
                return ParseArray(a);
            }
        }
    };

    return api;

}
    ());

var a = Points.parse([45, 0, 100, 0, 100, 100]);

console.log(a);
