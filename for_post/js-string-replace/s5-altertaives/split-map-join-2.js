var replace = function (opt) {
    opt = opt || {};
    opt.source = opt.source || '';
    opt.sourceSep = opt.sourceSep === undefined ? ',' : opt.sourceSep;
    opt.resultSep = opt.resultSep === undefined ? ',' : opt.resultSep;
    opt.what = opt.what || '';
    opt.replace = opt.replace || '';
    console.log();
    return opt.source.split(opt.sourceSep).map(function (el) {
        if (el === opt.what) {
            return opt.replace;
        }
        return el;
    }).join(opt.resultSep);
};

var a = 'foo,bar,bar,foo,bar';

var b = replace({
        source: a,
        what: 'foo',
        resultSep: ''
    });
console.log(b);
// bar,bar,bar,bar,bar
