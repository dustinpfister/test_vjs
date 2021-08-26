var replace = (function () {
    // create replacement method for an element
    var createReplacement = function (el, i, arr, opt) {
        // if replace is a string, or number
        if (typeof opt.replace === 'string' || typeof opt.replace === 'number') {
            return opt.replace;
        }
        if (typeof opt.replace === 'function') {
            return opt.replace.call(opt, el, i, arr, opt);
        }
        // fail at replacing el, and just return el
        return el;
    };
    // the returned function to the replace var
    return function (opt) {
        opt = opt || {};
        opt.source = opt.source || '';
        opt.sourceSep = opt.sourceSep === undefined ? ',' : opt.sourceSep;
        opt.resultSep = opt.resultSep === undefined ? ',' : opt.resultSep;
        opt.what = opt.what || '';
        opt.replace = opt.replace || '';
        return opt.source.split(opt.sourceSep).map(function (el, i, arr) {
            if (typeof opt.what === 'string') {
                if (el === opt.what) {
                    return createReplacement(el, i, arr, opt);
                }
            }
            if (typeof opt.what === 'function') {
                if (opt.what.call(opt, el, i, arr, opt)) {
                    return createReplacement(el, i, arr, opt);
                }
            }
            return el;
        }).join(opt.resultSep);
    };
}
    ());
 
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
var c = 'foo,1,2,3,bar';
var d = replace({
        source: c,
        what: function (el) {
            return String(parseFloat(el)) != 'NaN';
        },
        replace: function (el) {
            var n = parseFloat(el);
            return Math.pow(2, n);
        },
        resultSep: '-'
    });
console.log(d);
// foo-2-4-8-bar
