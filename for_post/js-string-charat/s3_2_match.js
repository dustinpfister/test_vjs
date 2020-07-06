var str = 'so Then this is a only a tEst of String Things';

var getIndex = function (str, regex) {
    var m = str.match(regex);
    if (m) {
        return m.index >= 0 ? m.index : -1;
    }
    return -1;
};

// might work for a pattern like this
console.log( getIndex(str, /[A-Z]/) ); 3
// but not with global patterns
console.log( getIndex(str, /[A-Z]/g) ); -1
