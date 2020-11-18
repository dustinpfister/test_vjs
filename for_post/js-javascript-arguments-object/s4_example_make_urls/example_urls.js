let makeURLArray = function (base, fn) {
    let arr = [];
    // if typeof fn === object assume an array
    if (typeof fn === 'object') {
        return fn.map((str) => {
            return base + '/' + str;
        });
    }
    // if typeof fn === string then loop over
    // all elements of arguments object except the first
    // one of course
    if (typeof fn === 'string') {
        let len = arguments.length,
        i = 1;
        while (i < len) {
            arr.push(base + '/' + arguments[i]);
            i += 1;
        }
        return arr;
    }
    return arr;
};
console.log(makeURLArray('./img', ['foo.png', 'bar.png', 'baz.png']));
console.log(makeURLArray('./img', 'foo.png', 'bar.png', 'baz.png'));
// both ways of using the method result in:
// [ './img/foo.png', './img/bar.png', './img/baz.png' ]