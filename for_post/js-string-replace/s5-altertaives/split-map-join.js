var replace = function (source, sep, what, replace) {
    return source.split(sep).map(function (el) {
        if (el === what) {
            return replace;
        }
        return el;
    }).join(sep);
};

var a = 'foo,bar,bar,foo,bar';
var b = replace(a, ',', 'foo', 'bar');
console.log(b);
// bar,bar,bar,bar,bar
