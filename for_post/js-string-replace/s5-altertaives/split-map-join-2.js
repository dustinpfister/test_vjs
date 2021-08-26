var replace = function (opt) {
    opt = opt || {};
    opt.source = opt.source || '';
    opt.sourceSep = opt.sourceSep === undefined ? ',' : opt.sourceSep;
    opt.resultSep = opt.resultSep === undefined ? ',' : opt.resultSep;
    opt.what = opt.what || '';
    opt.replace = opt.replace || '';
    return opt.source.split(opt.sourceSep).map(function (el, i, arr) {
        if (typeof opt.what === 'string') {
            if (el === opt.what) {
                return opt.replace;
            }
        }
        if (typeof opt.what === 'function') {
            if (opt.what.call(opt, el, i, arr, opt)) {
                return opt.replace;
            }
        }
        return el;
    }).join(opt.resultSep);
};

// use example 1
var a = 'foo,bar,bar,foo,bar';
var b = replace({
        source: a,
        what: 'foo',
        resultSep: ''
    });
console.log(b);
// barbarbar

// use example 2 with function
var c = 'foo,42,42,42,bar';
var d = replace({
        source: a,
        what: function (el) {
            return parseFloat(el) != 'NaN';
        },
        resultSep: ''
    });
console.log(d);
// barbarbar
