
var newFilledWithChars = function (count, str) {
    return Array.apply(null, {
        length: count
    }).map(function (e, i) {
        ci = i % str.length;
        return str[ci];
    });
};

var arr = newFilledWithChars(10, 'abc');

console.log(arr.join('')); // 'abcabca'