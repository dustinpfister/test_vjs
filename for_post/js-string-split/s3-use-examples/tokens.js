
var tokens = function (string) {
    return string.toLowerCase().split(' ');
};

var text = 'This is some text',
arr = tokens(text),
wc = arr.length;

console.log(arr); // [ 'this', 'is', 'some', 'text' ]
console.log(wc); // 4