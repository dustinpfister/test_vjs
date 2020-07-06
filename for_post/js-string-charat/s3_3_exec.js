var getIndexValues = function (str, regex) {
    var r = new RegExp(regex),
    m,
    arr = [];
    if (r.global) {
        while (m = r.exec(str)) {
            arr.push(m);
        }
    } else {
        m = r.exec(str);
        if (m) {
            arr.push(m);
        }
    }
    return arr;
};

var formated = function (str, regex) {
    return getIndexValues(str, regex).map(function (m) {
        return m + m.index;
    }).join(',')
}

var str = 'so Then this is a only a tEst of String Things';

console.log(formated(str, /[A-Z]/));
// T3
console.log(formated(str, /[A-Z]/g));
// T3,E26,S33,T40
